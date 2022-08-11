const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express();
const axios = require('axios');
const connectDB = require('./db/connect.js');
const port = process.env.PORT || 7575;
require('dotenv').config();

const Order = require('./model/order.js');
const order = require('./model/order.js');
app.use(express.json());
app.get('/orders', (req, res) => {
  try {
    Order.find().then((orders) =>
      res.status(200).json({ total: orders.length, orders: orders })
    );
  } catch (err) {
    res.status(400).json({ status: 400, error: 'Unable to get orders' });
  }
});

app.get('/orders/:id', (req, res) => {
  order
    .findOne({ _id: req.params.id })
    .then((order) =>{
        if(order){
        axios.get(`http://localhost:5555/customers/${order.customerId}`)
        .then(response => {
            // res.send(response.data)
            const orderObject = {
              customerName: response.data.customer.name,
              bookTitle:'',
            };

            axios.get(`http://localhost:4545/books/${order.bookId}`).then(response => {
                orderObject.bookTitle = response.data.books.title;
                res.json(orderObject);
            }).catch(err => {
                res.status(400).json({ status: 400, error: 'Unable to get book' });
            })
        })
    }
    }
    )
    .catch((err) =>
      res.status(400).json({ status: 400, error: 'Unable to get order' })
    );
});

app.post('/orders', (req, res) => {
  const order = new Order({
    customerId: mongoose.Types.ObjectId(req.body.customerId),
    bookId: mongoose.Types.ObjectId(req.body.bookId),
    initialDate: req.body.initialDate,
    deliveryDate: req.body.deliveryDate,
  });

  order
    .save()
    .then(() => res.json({ success: true }))
    .catch((err) => {
      res.status(400).json({ status: 400, error: err.message });
    });
});

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log('connected to mongo: Orders');
    app.listen(port, () => console.log(`Server started on port ${port}`));
  } catch (err) {}
};

start();
