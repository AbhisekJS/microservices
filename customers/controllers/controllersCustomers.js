const Customer = require('../model/customer.js');

const getAllCustomers = async(req,res)=>{
    try{
        const customers = await Customer.find();
        res.status(200).json({ total:customers.length ,customers: customers });
    }catch(err){
        res.status(400).json({ status: 400, error: 'Unable to get customers' });
    }
}

const getCustomer = async(req,res)=>{
    try{
        const customer = await Customer.findOne({_id: req.params.id});
        res.status(200).json({ customer });
    }catch(err){
        res.status(400).json({ status: 400, error: 'Unable to get customer' });
    }
}

const deleteCustomer = async(req,res)=>{
    try{
        const customer = await Customer.findOneAndDelete({_id: req.params.id});
        res.status(201).json({ message: 'Removed Customer' });
    }catch(err){
        res.status(400).json({ status: 400, error: 'Unable to delete' });
    }
}

const addCustomer = async(req,res)=>{
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
    
}

module.exports = {
    getAllCustomers,
    getCustomer,
    deleteCustomer,
    addCustomer
}