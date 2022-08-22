const express = require('express');
const router = express.Router();

const {
    getAllBooks,
    getBook,
    deleteBook,
    addBook
} = require('../controllers/controllerBooks.js');

router.get('/', getAllBooks);
router.get('/:id', getBook);
router.post('/', addBook);
router.delete('/:id', deleteBook);

module.exports = router;