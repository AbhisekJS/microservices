const express = require('express');

const router = express.Router();

const {
  getAllCustomers,
  getCustomer,
  deleteCustomer,
  addCustomer,
} = require('../controllers/controllersCustomers.js');

router.route('/').get(getAllCustomers).post(addCustomer);
router.route('/:id').get(getCustomer).delete(deleteCustomer);


module.exports = router;
