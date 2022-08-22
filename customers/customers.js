const express = require('express');
const app = express();

const connectDB = require('./db/connect.js');
const port = process.env.PORT || 5555;
require('dotenv').config();
app.use(express.json());

app.use('/api/v1/customers', require('./routes/customers.js'));


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
