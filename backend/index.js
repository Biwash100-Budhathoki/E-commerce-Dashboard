const express = require('express');
const mongoose = require('mongoose');

const app = express();
const connectDB = async ()=>{
mongoose.set('strictQuery', true);

mongoose.connect('mongodb://localhost:8000/eCommerce');
    const productSchema = new mongoose.Schema({});
    const Product = mongoose.model('Product', productSchema);
    const data = await Product.find({});
    console.warn(data);
}
connectDB();
app.listen(5000)
