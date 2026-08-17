import { useContext, useState, useEffect } from 'react';
import Modal from './UI/Modal.jsx';
import CartContext from '../store/CartContext.jsx';
import { currencyFormatter } from '../util/currencyFormatter.js';
import Button from './UI/Button.jsx';
import UserProgressContext from '../store/UserProgressContext.jsx';
import Input from './UI/Input.jsx';

export default function Checkout() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);
  const [formError, setFormError] = useState('');

  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  const isCartEmpty = !cartCtx.items || cartCtx.items.length === 0;

  useEffect(() => {
    if (userProgressCtx.progress === 'checkout') {
      if (isCartEmpty) {
        setFormError('Your cart is empty. Add items before checking out.');
      } else {
        setFormError('');
      }
    } else {
      setFormError('');
    }
  }, [userProgressCtx.progress, isCartEmpty]);

  function handleClose() {
    setFormError('');
    userProgressCtx.hideCheckout();
  }

  function checkoutAction(event) {
    event.preventDefault();
    setFormError('');

    if (isCartEmpty) {
      setFormError('Your cart is empty. Add items before checking out.');
      return;
    }

    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries());

    const name = (customerData.name || '').trim();
    const postalCode = (customerData.postalCode || '').trim();
    const city = (customerData.city || '').trim();

    const nameInput = event.target.querySelector('#name');
    const postalCodeInput = event.target.querySelector('#postal-code');
    const cityInput = event.target.querySelector('#city');

    if (!name || /\d/.test(name)) {
      if (nameInput) {
        nameInput.setCustomValidity('Name must not contain digits.');
        nameInput.reportValidity();
      }
      setFormError('Name must not contain digits.');
      return;
    } else if (nameInput) {
      nameInput.setCustomValidity('');
    }

    if (!postalCode || !/^\d+$/.test(postalCode)) {
      if (postalCodeInput) {
        postalCodeInput.setCustomValidity('Postal code must contain only digits.');
        postalCodeInput.reportValidity();
      }
      setFormError('Postal code must contain only digits.');
      return;
    } else if (postalCodeInput) {
      postalCodeInput.setCustomValidity('');
    }

    if (!city || /\d/.test(city)) {
      if (cityInput) {
        cityInput.setCustomValidity('City must contain only letters, spaces, hyphens or apostrophes.');
        cityInput.reportValidity();
      }
      setFormError('City must contain only letters and spaces.');
      return;
    } else if (cityInput) {
      cityInput.setCustomValidity('');
    }

    const order = {
      customer: customerData,
      items: cartCtx.items,
      total: cartTotal,
    };

    localStorage.setItem('order', JSON.stringify(order));

    cartCtx.clearCart();
    userProgressCtx.hideCheckout();
  }

  return (
    <Modal open={userProgressCtx.progress === 'checkout'} onClose={handleClose}>
      {isCartEmpty ? (
        <div>
          <h2>Checkout</h2>
          <p>Your cart is empty. Add something first before filling out the checkout form.</p>
          <div className="modal-actions">
            <Button type="button" onClick={handleClose}>
              Close
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={checkoutAction} noValidate>
          <h2>Checkout</h2>

          <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>

          {formError && <p style={{ color: '#ff4d4f', margin: '0.25rem 0' }}>{formError}</p>}

          <Input
            label="Full Name"
            type="text"
            id="name"
            name="name"
            required
            pattern="[A-Za-zÀ-ž\s'-]+"
            title="Name must contain only letters, spaces, apostrophes or hyphens"
          />

          <Input
            label="E-Mail Address"
            type="email"
            id="email"
            name="email"
            required
          />

          <Input
            label="Street"
            type="text"
            id="street"
            name="street"
            required
          />

          <div className="control-row">
            <Input
              label="Postal Code"
              type="text"
              id="postal-code"
              name="postalCode"
              required
              pattern="\d+"
              title="Postal code must contain only digits"
            />

            <Input
              label="City"
              type="text"
              id="city"
              name="city"
              required
              pattern="[A-Za-zÀ-ž\s'-]+"
              title="City must contain only letters, spaces, apostrophes or hyphens"
            />
          </div>

          <p className="modal-actions">
            <Button type="button" onClick={handleClose}>
              Close
            </Button>

            <Button type="submit" disabled={isCartEmpty}>
              Submit Order
            </Button>
          </p>
        </form>
      )}
    </Modal>
  );
}