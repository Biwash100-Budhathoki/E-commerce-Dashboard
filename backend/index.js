const express = require("express");
const cors = require("cors");
require('./db/config');
const User = require("./db/User");
const Product = require("./db/Product");

const Jwt = require("jsonwebtoken");
const jwtKey = 'biwash10';
const app = express();

const axios = require("axios");


app.use(express.json());
app.use(cors());

app.post("/register", async (req, resp) => {
  let user = new User(req.body);
  console.log(user);
  let result = await user.save();
  result = result.toObject();
  delete result.password;
  Jwt.sign({ result }, jwtKey, { expiresIn: '6h' }, (err, token) => {
    if (err) {
      resp.send({ result: "Something went wrong.. Please try again later!" })
    }
    resp.send({ result, auth: token });
  })
})

app.post("/login", async (req, resp) => {
 // console.log(req.body);
  if (req.body.password && req.body.email) {
    let user = await User.findOne(req.body).select("-password");
    if (user) {
      Jwt.sign({ user }, jwtKey, { expiresIn: '6h' }, (err, token) => {
        if (err) {
          resp.send({ result: "Something went wrong.. Please try again later!" })
        }
        resp.send({ user, auth: token });
      })
    }
    else {
      resp.send({ result: 'No User Found' })
    }
  }
  else {
    resp.send({ result: 'No User Found' })
  }
})

app.post("/add-product",verifyToken, async (req, resp) => {
  let product = new Product(req.body);
  let result = await product.save();
  console.warn(req.body);
  resp.send(result);

})
// app.get("/add-product", async (req, resp)=>{
//   let result = await Product.find();
//   console.warn(result);
//   resp.send(result);
// })

app.get("/products",verifyToken, async (req, resp) => {
  let products = await Product.find();
  if (products.length > 0) {
    resp.send(products);
  }
  else {
    resp.send({ result: "No Products found" });
  }

})

app.delete("/product/:id",verifyToken, async (req, resp) => {
  const result = await Product.deleteOne({ _id: req.params.id })
  resp.send(result);

})

app.get("/product/:id",verifyToken, async (req, resp) => {
  const result = await Product.findOne({ _id: req.params.id });
  if (result) {
    resp.send(result);
  }
  else {
    resp.send({ result: "No Record Found. " });
  }
})

app.put("/product/:id",verifyToken, async (req, resp) => {
  let result = await Product.updateOne(
    { _id: req.params.id },
    {
      $set: req.body
    }
  )
  resp.send(result);
});

app.get("/search/:key", verifyToken, async (req, resp) => {
  let result = await Product.find({
    "$or": [
      { name: { $regex: req.params.key } },
      { company: { $regex: req.params.key } },
      { category: { $regex: req.params.key } }

    ]  //name in collection is matched to key parameter passed in url
  });
  resp.send(result);

});

function verifyToken(req, resp, next) {
  let token = req.headers['authorization'];
  if (token) {
    token = token.split(' ')[1];
    Jwt.verify(token, jwtKey, (err, valid) => {
      if (err) {
        resp.status(401).send({ result: 'Please provide valid token' });

      } else {
        next();
      }
    })

  } else {
    resp.status(403).send({ result: 'Please add token with header' });
  }


};
  
// Handle payment initiation
app.post("/payment/initiate", async (req, res) => {
  try {
    // Perform necessary calculations and validations

    // Make a request to eSewa to initiate the payment
    const response = await axios.post(
      "https://uat.esewa.com.np/epay/main",
      {
        amt: req.body.amount,
        tAmt: req.body.amount,
        pid: "TEST_PRODUCT",
        scd: "EPAYTEST",
        su: "http://localhost:5000/success",
        fu: "http://localhost:5000/failure",
      }
    );

    // Extract the redirect URL from the response and send it to the client
    const redirectUrl = response.request.res.responseUrl;
    res.json({ redirectUrl });
  } catch (error) {
    console.log("Error initiating payment:", error);
    res.status(500).json({ error: "Payment initiation failed" });
  }
});


app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
