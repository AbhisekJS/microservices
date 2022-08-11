const express = require('express');
const app = express();

const connectDB = require('./db/connect.js');
const port = process.env.PORT || 4545;
require('dotenv').config();
app.use(express.json());

// import the model

const Book = require('./model/book.js');

app.get('/books', async (req, res) => {
  try{
    const books = await Book.find({})
    res.status(200).json({ total:books.length ,books: books })
  }catch(err){
    res.status(400).json({ status: 400, error: 'Book already exists' }); 
  }
});

app.get('/books/:id', async (req, res) => {
  try{
    const books = await Book.findOne({_id: req.params.id})
    res.status(200).json({ books })
  }catch(err){
    res.status(400).json({ status: 400, error: 'Book already exists' }); 
  }
});

app.delete('/books/:id', async (req, res) => {
  try{
    const books = await Book.findOneAndDelete({_id: req.params.id})
    res.status(201).json({ message: 'Removed Book' })
  }catch(err){
    res.status(400).json({ status: 400, error: 'Unable to delete' }); 
  }
});

app.post('/books', async (req, res) => {
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
});

const start = async () => {
  try {
    connectDB(
          process.env.MONGO_URI
      );
    app.listen(port, () =>
      console.log(`Server is running... Connected to DB on PORT: ${port}`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();

