import {useEffect,useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { currencyFormatter }from '../util/currencyFormatter.js';
import Button from './UI/Button.jsx';
import { addItem} from '../store/redux/cartSlice';
import { selectCartItems} from '../store/redux/selectors';

export default function MealDetail() {
  const { id} = useParams();
  const [meal,setMeal]= useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate=useNavigate();
  const dispatch= useDispatch();
  const cartItems =useSelector(selectCartItems);

  useEffect(() => {
    let mounted =true;
    async function fetchMeal() {
      try {
        const res = await fetch('http://localhost:3000/meals');
        if (!res.ok) throw new Error('Failed to load meals');
        const data = await res.json();
        if (!mounted) return;
        const found = data.find((item) => String(item.id) === String(id));
        if (!found) throw new Error('Meal not found');
        setMeal(found);
      } catch (err) {
        setError(err.message || 'Failed to load meal');
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchMeal();
    return () => {
      mounted = false;
    };
  }, [id]);

  if (loading) return <p style={{ padding: '1rem' }}>Loading…</p>;
  if (error) return (
    <section style={{ padding: '1rem' }}>
      <p>{error}</p>
      <Button textOnly onClick={() => navigate(-1)}>Back</Button>
    </section>
  );

  return (
    <section style={{ padding: '1rem' }}>
      <Button textOnly onClick={() => navigate(-1)}>Back</Button>
      <h2>{meal.name}</h2>
      <img src={`/${meal.image}`} alt={meal.name} 
        style={{ width: '100%', maxWidth: 600, display: 'block', margin: '1rem 0' }} />
      <p style={{ fontWeight: 'bold' }}>{currencyFormatter.format(meal.price)}</p>
      <p style={{ color: '#bdb8ae' }}>{meal.description}</p>
      <div style={{ marginTop: '1rem' }}>
        <Button onClick={() => dispatch(addItem({ ...meal, quantity: 1 }))} 
            className={cartItems.some(it => String(it.id) === String(id) && it.quantity > 0) ? 'added' : ''}>
          {cartItems.some(it => String(it.id) === String(id) && it.quantity > 0) ? '✓ Added!' : 'Add to Cart'}
        </Button>
      </div>
    </section>
  );
} 
