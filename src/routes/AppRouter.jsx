import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Meals from '../components/Meals.jsx';
import Cart from '../components/Cart.jsx';
import Checkout from '../components/Checkout.jsx';

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Meals />} />
      <Route path="/meals" element={<Meals />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="*" element={<Meals />} />
    </Routes>
  );
}
