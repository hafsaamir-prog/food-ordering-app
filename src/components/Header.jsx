import { useContext, useEffect, useRef, useState } from 'react';
import Button from './UI/Button.jsx';
import logoImg from '../assets/logo.jpg';
import CartContext from '../store/CartContext.jsx';
import UserProgressContext from '../store/UserProgressContext.jsx';

export default function Header() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const [cartBump, setCartBump] = useState(false);

  const previousCartItems = useRef(0);

  const totalCartItems = cartCtx.items.reduce(
    (totalNumberOfItems, item) => {
      return totalNumberOfItems + item.quantity;
    },
    0
  );

  useEffect(() => {
    if (totalCartItems > previousCartItems.current) {
      setCartBump(true);

      const timer = setTimeout(() => {
        setCartBump(false);
      }, 500);

      previousCartItems.current = totalCartItems;

      return () => clearTimeout(timer);
    }

    previousCartItems.current = totalCartItems;
  }, [totalCartItems]);

  function handleShowCart() {
    userProgressCtx.showCart();
  }

  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="Logo" />
        <h1>YummyTum</h1>
      </div>

      <nav>
        <Button
          textOnly
          onClick={handleShowCart}
          className={cartBump ? 'cart-bump' : ''}
        >
          <span className="cart-icon" aria-hidden="true">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              width="20"
              height="20"
            >
              <path d="M7 4h-2l-1 2h2l3.6 7.59-1.35 2.45C8.89 16.37 9.5 17 10.29 17h7.45v-2H10.9l.03-.01L12.1 14h5.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49L20.5 4H7z" />
              <circle cx="10.5" cy="20.5" r="1.5" />
              <circle cx="17.5" cy="20.5" r="1.5" />
            </svg>
          </span>
          <span className="cart-text">Cart ({totalCartItems})</span>
        </Button>
      </nav>
    </header>
  );
}