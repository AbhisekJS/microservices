const Orders = require('../model/order.js');
const axios = require('axios');

const getAllOrders = async (req, res) => {
    try {
        const orders = await Orders.find();
        res.status(200).json({ total: orders.length, orders: orders });
    } catch (err) {
        res.status(400).json({ status: 400, error: 'Unable to get orders' });
    }
}

const getOrder = async (req, res) => {
  
    Orders
    .findOne({ _id: req.params.id })
    .then((order) =>{
        if(order){
        axios
          .get(
            `http://localhost:5555/api/v1/customers/${order.customerId}`
          )
          .then((response) => {
            // res.send(response.data)
            const orderObject = {
              customerName: response.data.customer.name,
              bookTitle: '',
            };
        
            axios
              .get(`http://localhost:4545/api/v1/books/${order.bookId}`)
              .then((response) => {
                orderObject.bookTitle = response.data.book.title;
                res.json(orderObject);
              })
              .catch((err) => {
                res
                  .status(400)
                  .json({ status: 400, error: 'Unable to get book' });
              });
          });
    }
    }
    )
}

const deleteOrder = async (req, res) => {
    try {
        await Orders.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true });
    } catch (err) {
        res.status(400).json({ status: 400, error: 'Unable to delete order' });
    }
}

const createOrder = async (req, res) => {
    const order = new Orders({
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
}

module.exports={
    getAllOrders,
    getOrder,
    deleteOrder,
    createOrder
}