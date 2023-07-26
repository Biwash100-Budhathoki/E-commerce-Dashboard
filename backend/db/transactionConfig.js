
const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  transactionId: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  // Add other relevant fields as per your requirements
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
