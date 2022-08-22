const Book = require ('../model/book.js');

const getAllBooks = (req,res) => {
    Book.find()
    .then(books => res.status(200).json({ total:books.length ,books: books })) 
    .catch(err => res.status(400).json({ status: 400, error: 'Unable to get books' }))
}

const getBook = (req,res) => {
    Book.findOne({_id: req.params.id})
    .then(book => res.status(200).json({ book })) 
    .catch(err => res.status(400).json({ status: 400, error: 'Unable to get book' }))
}

const deleteBook = (req,res) => {
    Book.findOneAndDelete({_id: req.params.id})
    .then(book => res.status(201).json({ message: 'Removed Book' }))
    .catch(err => res.status(400).json({ status: 400, error: 'Unable to delete' }))
}

const addBook = async (req,res) => {
     const book = new Book({
    title: req.body.title,
    author: req.body.author,
    numberOfPages: req.body.numberOfPages,
    publisher: req.body.publisher,
  });
  const exists = await Book.findOne({ title: req.body.title, })
  if (!exists) {
    book
      .save()
      .then(() => res.json({ success: true }))
      .catch((err) =>
        res.status(400).json({ status: 400, error: err.message })
      );
  } else {
    res.status(400).json({ status: 400, error: 'Book already exists' }); 
  }
}


module.exports = {
    getAllBooks,
    getBook,
    deleteBook,
    addBook
}