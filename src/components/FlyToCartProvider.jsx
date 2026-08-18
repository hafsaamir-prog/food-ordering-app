import { useEffect,useState } from 'react';
import {createPortal } from 'react-dom';
import { motion} from 'framer-motion';

export default function FlyToCartProvider() {
  const [flies, setFlies] = useState([]);

  useEffect(() => {
    function onFly(ev) {
      const { id, src, startRect } = ev.detail || {};
      if (!id || !src || !startRect) return;
      const start = { left: startRect.left, top: startRect.top, width: startRect.width, height: startRect.height };
      setFlies((s) => [...s, { id, src, start }]);
    }

    window.addEventListener('fly-to-cart', onFly);
    return () => window.removeEventListener('fly-to-cart', onFly);
  }, []);

  function handleComplete(id) {
    setFlies((s) => s.filter((f) => f.id !== id));
    window.dispatchEvent(new CustomEvent('fly-complete', { detail: { id } }));
  }

  if (typeof document === 'undefined') return null;

  return createPortal(
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9999 }}>
      {flies.map((f) => (
        <FlyImage key={f.id} fly={f} onDone={() => handleComplete(f.id)} />
      ))}
    </div>,
    document.body
  );
}

function FlyImage({ fly, onDone }) {
  const { src, start, id } = fly;
  const cartEl = typeof document !== 'undefined' ? document.getElementById('header-cart-icon') : null;
  const targetRect = cartEl ? cartEl.getBoundingClientRect() : { left: window.innerWidth - 40, top: 20, width: 24, height: 24 };

  const startCenter = { x: start.left + start.width / 2, y: start.top + start.height / 2 };
  const targetCenter = { x: targetRect.left + targetRect.width / 2, y: targetRect.top + targetRect.height / 2 };

  const deltaX = targetCenter.x - startCenter.x;
  const deltaY = targetCenter.y - startCenter.y;

  const style = {
    position: 'absolute',
    left: start.left,
    top: start.top,
    width: start.width,
    height: start.height,
    transform: 'translate(0,0)',
  };

  return (
    <motion.img
      src={src}
      alt="flying"
      initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
      animate={{ x: deltaX, y: deltaY, scale: 0.25, opacity: 0.9 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
      style={style}
      onAnimationComplete={onDone}
    />
  );
}
