import './App.css';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Cart from './components/Cart.jsx';
import Checkout from './components/Checkout.jsx';
import Header from './components/Header.jsx';
import Meals from './components/Meals.jsx';
import About from './components/About.jsx';
import Products from './components/Products.jsx';
import {CartContextProvider} from './store/CartContext.jsx';
import {UserProgressContextProvider} from './store/UserProgressContext.jsx';

function RootLayout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Cart />
      <Checkout />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Meals /> },
      { path: 'meals', element: <Meals /> },
      { path: 'about', element: <About /> },
      { path: 'products', element: <Products /> },
      { path: 'cart', element: <Cart /> },
      { path: 'checkout', element: <Checkout /> },
      { path: '*', element: <Meals /> },
    ],
  },
]);

function App() {
  return (
    <UserProgressContextProvider>
      <CartContextProvider>
        <RouterProvider router={router} />
      </CartContextProvider>
    </UserProgressContextProvider>
  );
}

export default App;