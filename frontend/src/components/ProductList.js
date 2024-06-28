import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { Navigate, useNavigate } from "react-router-dom";
import { set } from "mongoose";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [cartId, setCartId] = useState(""); // State to store cart ID

  const navigate = useNavigate();

  useEffect(() => {
    getProducts();
    if (!cartId) {
      setCartId(uuidv4()); // Generate a unique ID for the cart
    }
  }, []);

  const getProducts = async () => {
    let result = await fetch("http://127.0.0.1:5000/products", {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    setProducts(result);
  };

  const addToCart = (product) => {
    const updatedCartItems = [...cartItems, product];
    setCartItems(updatedCartItems);
    
    product.number = product.number - 1;
    calculateTotalAmount(updatedCartItems);
  };

  const removeFromCart = (itemIndex, item) => {
    const updatedCartItems = [...cartItems];
    // console.log('Items',updatedCartItems);
    updatedCartItems.splice(itemIndex, 1);
    item.number = item.number + 1;
    setCartItems(updatedCartItems);
    calculateTotalAmount(updatedCartItems);
  };

  const clearCart = () => {
    setCartItems([]);
    setTotalAmount(0);
  };

  const calculateTotalAmount = (cartItems) => {
    let total = 0;
    cartItems.forEach((item) => {
      total += parseFloat(item.price);
    });
    setTotalAmount(total);
  };

  const searchHandle = async (event) => {
    let key = event.target.value;
    if (key) {
      let result = await fetch(`http://127.0.0.1:5000/search/${key}`, {
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      result = await result.json();
      if (result) {
        setProducts(result);
      }
    } else {
      getProducts();
    }
  };

  const handlePayment = () => {
    navigate("/pay", {
      state: {
        pid: cartId,
        tAmt: totalAmount,
        amt: totalAmount,
        items: cartItems,
      },
    });
  };

  return (
    <div className="product-list">
      <h3>Product List</h3>
      <input
        type="text"
        placeholder="Search Product"
        className="search-product-box"
        onChange={searchHandle}
      />
      <ul>
        <li>S. No</li>
        <li>Name</li>
        <li>Price</li>
        <li>Category</li>
        <li>No. of Products</li>
        <li>Operation</li>
      </ul>

      {products.length > 0 ? (
        products.map((item, index) => (
          <ul key={item._id}>
            <li>{index + 1}</li>
            <li>{item.name}</li>
            <li>Rs. {item.price}</li>
            <li>{item.category}</li>
            <li>{item.number}</li>
            <li>
              <button onClick={() => addToCart(item)}>Add to Cart</button>
              <Link to={`/update/${item._id}`}>Update</Link>
            </li>
          </ul>
        ))
      ) : (
        <h1>No Results Found</h1>
      )}

      <div className="cart-items">
        <h3>Cart Items</h3>
        {cartItems.length > 0 ? (
          <ul>
            {cartItems.map((item, index) => (
              <li key={index}>
                {item.name}{" "}
                <button onClick={() => removeFromCart(index, item)}>Remove</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No items in the cart.</p>
        )}
        <button onClick={clearCart}>Clear Cart</button>
      </div>

      <div className="total-amount">
        <h3>Total Amount: ${totalAmount}</h3>
        <button onClick={handlePayment}>Pay</button>
      </div>
    </div>
  );
};

export default ProductList;
