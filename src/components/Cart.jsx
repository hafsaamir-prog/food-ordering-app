import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from './UI/Button.jsx';
import { currencyFormatter } from '../util/currencyFormatter.js';
import CartItem from './CartItem.jsx';
import { selectCartItems } from '../store/redux/selectors';
import { addItem, removeItem, clearCart } from '../store/redux/cartSlice';

export default function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const cartTotal = cartItems.reduce((totalPrice, item) => totalPrice + (item.quantity || 0) * (item.price || 0), 0);
  const navigate = useNavigate();

  function handleCloseCart() {
    navigate(-1);
  }

  function handleGoToCheckout() {
    navigate('/checkout');
  }

  return (
    <section className="cart" style={{ padding: '1rem' }}>
      <h2>Your Cart</h2>
      <ul>
        {cartItems.map((item) => (
          <CartItem
            key={item.id}
            name={item.name}
            quantity={item.quantity}
            price={item.price}
            onIncrease={() => dispatch(addItem({ ...item, quantity: 1 }))}
            onDecrease={() => dispatch(removeItem(item.id))}
          />
        ))}
      </ul>
      <p className="cart-total">
        Total : <strong>{currencyFormatter.format(cartTotal)}</strong>
      </p>
      <p className="modal-actions">
        <Button textOnly onClick={handleCloseCart}>
          Back
        </Button>
        <Button onClick={handleGoToCheckout}>Go to Checkout</Button>
      </p>
    </section>
  );
}