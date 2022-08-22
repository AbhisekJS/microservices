const express = require('express')
const router = express.Router()

const {
    getAllOrders,
    getOrder,
    deleteOrder,
    createOrder
} = require('../controllers/controllersOrders.js')


router.route('/:id').get(getOrder).delete(deleteOrder)
router.route('/').get(getAllOrders).post(createOrder)

module.exports = router;