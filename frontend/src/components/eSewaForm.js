import React, { useState } from "react";
import axios from "axios";

const PaymentForm = () => {
  const [product, setProduct] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a request to your Node.js server to initiate the payment
      const response = await axios.post("/payment/initiate", {
        product,
        amount,
      });

      // Redirect the user to the eSewa login page
      window.location.href = response.data.redirectUrl;
    } catch (error) {
      console.log("Error initiating payment:", error);
    }
  };

  return (
    <div>
      <h2>Payment Form</h2>
      <form onSubmit={handleSubmit}>
        <label>Product:</label>
        <input
          type="text"
          value={product}
          onChange={(e) => setProduct(e.target.value)}
        />
        <br />
        <label>Amount:</label>
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <br />
        <button type="submit">Pay with eSewa</button>
      </form>
    </div>
  );
};

export default PaymentForm;
