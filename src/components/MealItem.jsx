import { useContext, useState } from 'react';
import { currencyFormatter } from '../util/currencyFormatter.js';
import Button from './UI/Button.jsx';
import CartContext from '../store/CartContext.jsx';

export default function MealItem({ meal }) {
  const cartCtx = useContext(CartContext);

  const [isAdded, setIsAdded] = useState(false);

  function handleAddMealToCart() {
    cartCtx.addItem(meal);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 700);
  }

  return (
    <li className="meal-item">
      <article>
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
          <Button
            onClick={handleAddMealToCart}
            className={isAdded ? 'added' : ''}
          >
            {isAdded ? '✓ Added!' : 'Add to Cart'}
          </Button>
        </p>
      </article>
    </li>
  );
}