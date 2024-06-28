import React, { useState, useEffect } from "react";
import {Navigate, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";


const PaymentForm = () => {
  const navigate = useNavigate();
  const location = useLocation(); // To access the passed state
  const [product, setProduct] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    if (location.state) {
      setProduct(location.state.pid);
      setAmount(location.state.tAmt);
    }
  }, [location.state]);

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