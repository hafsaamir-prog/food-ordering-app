import fs from 'node:fs/promises';
import express from 'express';
const app=express();

app.use(express.json());
app.use(express.static('public'));

app.use((req,res,next) => {
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Methods','GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers','Content-Type');
  next();
});
app.get('/meals',async(req, res) => {
  try {
    const meals=await fs.readFile('./public/availableMeals.json', 'utf8');
    res.json(JSON.parse(meals));
  } catch {
    res.status(500).json({ message: 'Unable to load meals.' });
  }
});

app.post('/orders',async(req, res) => {
  const orderData=req.body.order;
  const customer=orderData?.customer;

  if (!orderData || !Array.isArray(orderData.items) || orderData.items.length === 0) {
    return res.status(400).json({ message: 'Missing data.' });
  }
  if (
    !customer?.email?.includes('@') ||
    !customer.name?.trim() ||
    !customer.street?.trim() ||
    !customer['postal-code']?.trim() ||
    !customer.city?.trim()
  ) {
    return res.status(400).json({
      message: 'Missing data: Email, name, street, postal code or city is missing.',
    });
  }
  try {
    const newOrder={ ...orderData, id: (Math.random() * 1000).toString() };
    const orders=await fs.readFile('./public/orders.json', 'utf8');
    const allOrders=JSON.parse(orders);
    allOrders.push(newOrder);
    await fs.writeFile('./public/orders.json', JSON.stringify(allOrders, null, 2));
    return res.status(201).json({ message: 'Order created!' });
  } catch {
    return res.status(500).json({ message: 'Unable to save the order.' });
  }
});

app.use((req,res)=>{
  if (req.method==='OPTIONS') return res.sendStatus(200);
  res.status(404).json({ message: 'Not found' });
});



app.listen(3000);