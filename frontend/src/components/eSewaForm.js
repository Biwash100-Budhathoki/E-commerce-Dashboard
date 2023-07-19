import React, { useState } from "react";
import {Navigate, useNavigate } from "react-router-dom";

const PaymentForm = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Redirect the user to the eSewa login page
      const state = {
        pid: product,
        tAmt: amount,
        amt: amount
      };
      navigate("/payment", { state });
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