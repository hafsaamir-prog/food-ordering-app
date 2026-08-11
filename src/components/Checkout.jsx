import {useContext} from 'react';
import Modal from './UI/Modal.jsx';
import CartContext from '../store/CartContext.jsx';
import {currencyFormatter } from '../util/currencyFormatter.js';
import Button from './UI/Button.jsx';
import UserProgressContext from '../store/UserProgressContext.jsx';
import Input from './UI/Input.jsx';

export default function Checkout() {
    const cartCtx= useContext(CartContext);
    const userProgressCtx= useContext(UserProgressContext);

    const cartTotal = cartCtx.items.reduce(
        (totalPrice, item) => totalPrice + item.quantity * item.price,
        0
    );  
    function handleClose() {
        userProgressCtx.hideCheckout();
    }
      function checkoutAction(event) {
    event.preventDefault();

    console.log('SUBMIT BUTTON WORKED!');

    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries());

    const order = {
      customer: customerData,
      items: cartCtx.items,
      total: cartTotal,
    };

    console.log('Order:', order);

    localStorage.setItem('order', JSON.stringify(order));

    cartCtx.clearCart();
    userProgressCtx.hideCheckout();
  }

  return (
    <Modal
      open={userProgressCtx.progress === 'checkout'}
      onClose={handleClose}
    >
      <form onSubmit={checkoutAction}>
        <h2>Checkout</h2>

        <p>
          Total Amount: {currencyFormatter.format(cartTotal)}
        </p>

        <Input
          label="Full Name"
          type="text"
          id="name"
          required
        />

        <Input
          label="E-Mail Address"
          type="email"
          id="email"
          required
        />

        <Input
          label="Street"
          type="text"
          id="street"
          required
        />

        <div className="control-row">
          <Input
            label="Postal Code"
            type="text"
            id="postal-code"
            required
          />

          <Input
            label="City"
            type="text"
            id="city"
            required
          />
        </div>

        <p className="modal-actions">
          <Button type="button" onClick={handleClose}>
            Close
          </Button>

          <Button type="submit">
            Submit Order
          </Button>
        </p>
      </form>
    </Modal>
  );
}
    