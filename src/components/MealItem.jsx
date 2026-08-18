import { useDispatch, useSelector } from 'react-redux';
import { currencyFormatter } from '../util/currencyFormatter.js';
import Button from './UI/Button.jsx';
import { addItem } from '../store/redux/cartSlice';
import { selectCartItems } from '../store/redux/selectors';
import { useNavigate } from 'react-router-dom';

export default function MealItem({ meal }) {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const navigate = useNavigate();

  function handleAddMealToCart(e) {
    // prevent the parent click (which navigates to details)
    if (e && e.stopPropagation) e.stopPropagation();
    dispatch(addItem({ ...meal, quantity: 1 }));
  }

  const isAdded = cartItems.some((it) => it.id === meal.id && it.quantity > 0);

  return (
    <li className="meal-item">
      <article onClick={() => navigate(`/meals/${meal.id}`)} style={{ cursor: 'pointer' }}>
        <img src={`/${meal.image}`} alt={meal.name} />

        <div>
          <h3>{meal.name}</h3>

          <p className="meal-item-price">
            {currencyFormatter.format(meal.price)}
          </p>

          <p className="meal-item-description">
            {meal.description}
          </p>
        </div>

        <p className="meal-item-actions">
          <Button onClick={handleAddMealToCart} className={isAdded ? 'added' : ''}>
            {isAdded ? '✓ Added!' : 'Add to Cart'}
          </Button>
        </p>
      </article>
    </li>
  );
}