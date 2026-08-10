import {useContext} from 'react';
import Button from './UI/Button.jsx';
import logoImg from '../assets/logo.jpg';
import CartContext from '../store/CartContext.jsx';

export default function Header() {
  const cartCtx=useContext(CartContext);

  const totalCartItems=cartCtx.items.reduce((totalNumberOfItems,item) => {
    return totalNumberOfItems+item.quantity;
  }, 0);

  return(
    <header id="main-header">
      <div id="title">
        <img src={logoImg}alt="Logo" />
        <h1>YummyTum</h1>
      </div>
      <nav>
        <Button textOnly>Cart({totalCartItems})</Button>
      </nav>
    </header>
  );
}