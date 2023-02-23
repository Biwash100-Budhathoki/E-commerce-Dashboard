const express = require('express');
const mongoose = require('mongoose');

const app = express();

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/eCommerce', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      socketTimeoutMS: 120000
    });

    const productSchema = new mongoose.Schema({});
    const Product = mongoose.model('Product', productSchema);
    const data = await Product.find({});
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};

connectDB();

app.listen(5000, () => {
  console.log('Server listening on port 5000');
});
