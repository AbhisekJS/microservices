const express = require('express');
const app = express();

const connectDB = require('./db/connect.js');
const port = process.env.PORT || 5555;
require('dotenv').config();
app.use(express.json());

// import the model
const Customer = require('./model/customer.js');

app.get('/customers',(req,res) => {
    try{
    Customer.find()
    .then(customers => res.status(200).json({ total:customers.length ,customers: customers })) 
    }catch(err){
        res.status(400).json({ status: 400, error: 'Unable to get customers' }); 
    }
    
})

app.get('/customers/:id',(req,res) => {
    try{
    Customer.findOne({_id: req.params.id})
    .then(customer => res.status(200).json({ customer })) 
    }
    catch(err){
        res.status(400).json({ status: 400, error: 'Unable to get customer' });
    }
} )


app.post('/customers',(req,res)=>{
    const customer = new Customer({
        name: req.body.name,
        age: req.body.age,
        address: req.body.address,
    });
    
        customer
            .save()
            .then(() => res.json({ success: true }))
            .catch((err) =>
                res.status(400).json({ status: 400, error: err.message })
            );
    
})


app.delete('/customers/:id',(req,res)=>{
    try{
    Customer.findOneAndDelete({_id: req.params.id})
    .then(customer => res.status(201).json({ message: 'Removed Customer' })) 
    }
    catch(err){
        res.status(400).json({ status: 400, error: 'Unable to delete' }); 
    }
}
)

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log('connected to mongo: Customers');
    app.listen(port, () => console.log(`Server started on port ${port}`));
  } catch (err) {
    console.log(err);
  }
};

start();
