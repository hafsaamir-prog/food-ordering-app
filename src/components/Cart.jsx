import {useContext} from 'react';
import Modal from './UI/Modal.jsx';
import CartContext from '../store/CartContext.jsx';
import Button from './UI/Button.jsx';
import UserProgressContext from '../store/UserProgressContext.jsx';
import {currencyFormatter } from '../util/currencyFormatter.js';
import CartItem from './CartItem.jsx';

export default function Cart() {
  const cartCtx= useContext(CartContext);
  const userProgressCtx= useContext(UserProgressContext);

  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) =>totalPrice + item.quantity * item.price,
    0
  );

  function handleCloseCart() {
    userProgressCtx.hideCart();
  }

  function handleGoToCheckout() {
    userProgressCtx.showCheckout();
  }
  return (
    <Modal
      className="cart"
      open={userProgressCtx.progress ==='cart'}
      onClose={
        userProgressCtx.progress === 'cart' ? handleCloseCart : null
      }
    >
      <h2>Your Cart</h2>
      <ul>
        {cartCtx.items.map((item) => (
          <CartItem
            key={item.id}
            name={item.name}
            quantity={item.quantity}
            price={item.price}
            onIncrease={() => cartCtx.addItem(item)}
            onDecrease={() => cartCtx.removeItem(item.id)}
          />

        ))}
      </ul>
      <p className="cart-total">
        Total : <strong>{currencyFormatter.format(cartTotal)}</strong></p>
      <p className="modal-actions">
        <Button textOnly onClick={handleCloseCart}>
          Close
        </Button>
          <Button onClick={handleGoToCheckout}>Go to Checkout</Button>
      </p>
    </Modal>
  );
}