const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express();
const connectDB = require('./db/connect.js');
const port = process.env.PORT || 7575;
require('dotenv').config();

const Order = require('./model/order.js');
const order = require('./model/order.js');
app.use(express.json());

app.use('/api/v1/orders', require('./routes/orders.js'));

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log('connected to mongo: Orders');
    app.listen(port, () => console.log(`Server started on port ${port}`));
  } catch (err) {}
};

start();
