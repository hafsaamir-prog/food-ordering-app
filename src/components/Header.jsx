import { useEffect,useRef,useState} from 'react';
import {useNavigate } from 'react-router-dom';
import {useSelector } from 'react-redux';
import {selectCartItems } from '../store/redux/selectors';
import Button from './UI/Button.jsx';
import logoImg from '../assets/logo.jpg';


export default function Header() {
  const cartItems = useSelector(selectCartItems);

  const [cartBump, setCartBump] = useState(false);

  const previousCartItems = useRef(0);
  const navigate = useNavigate();

  const totalCartItems = cartItems.reduce((total, item) => total + (item.quantity || 0), 0);

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
    navigate('/cart');
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
            <i id="header-cart-icon" className="fa-solid fa-cart-shopping" aria-hidden="true" />
          </span>
          <span className="cart-text">Cart ({totalCartItems})</span>
        </Button>
      </nav>
    </header>
  );
}