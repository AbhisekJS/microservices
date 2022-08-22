const express = require('express');
const app = express();

const connectDB = require('./db/connect.js');
const port = process.env.PORT || 4545;
require('dotenv').config();
app.use(express.json());

app.use('/api/v1/books', require('./routes/books.js'));

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

