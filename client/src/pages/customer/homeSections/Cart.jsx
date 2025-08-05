import React, { useState } from "react";
import { Box, Typography, Button, Paper, Grid } from "@mui/material";

export default function Cart() {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Apple", price: 50, quantity: 2 },
    { id: 2, name: "Banana", price: 30, quantity: 3 },
    { id: 3, name: "Orange", price: 40, quantity: 1 },
  ]);

  const removeFromCart = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePayment = async (e) => {
    const response = await fetch("http://localhost:2400/api/payment/order", {
      method: "POST",
      body: JSON.stringify({
        amount:total,
        currency:"INR",
        receipt: "abcd1234",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const order = await response.json();
    console.log(order);
    var options = {
    "key": "rzp_test_gjpmvDQ8VcVju1", // Enter the Key ID generated from the Dashboard
    "amount":total, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    "currency": "INR",
    "name": "Acme Corp", //your business name
    "description": "Test Transaction",
    "image": "https://example.com/your_logo",
    "order_id":order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    "handler":async function (response){
        const body={
            ...response,
        }
    
    const validateRes = await fetch(
          "http://localhost:2400/api/payment/order/validate",
          {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const jsonRes = await validateRes.json();
        console.log(jsonRes);
      },
    "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
        "name": "Gaurav Kumar", //your customer's name
        "email": "gaurav.kumar@example.com", 
        "contact": "9000090000"  //Provide the customer's phone number for better conversion rates 
    },
    "notes": {
        "address": "Razorpay Corporate Office"
    },
    "theme": {
        "color": "#3399cc"
    }
};
var rzp1 = new window.Razorpay(options);
rzp1.on('payment.failed', function (response){
        console.log(response.error.code);
        console.log(response.error.description);
        console.log(response.error.source);
        console.log(response.error.step);
        console.log(response.error.reason);
        console.log(response.error.metadata.order_id);
        console.log(response.error.metadata.payment_id);
});
    rzp1.open();
    e.preventDefault();
  };

  return (
    <Box maxWidth="md" mx="auto" mt={4}>
      <Typography variant="h4" mb={2}>Shopping Cart</Typography>
      <Grid container direction="column" spacing={2}>
        {cartItems.map((item) => (
          <Grid item key={item.id}>
            <Paper sx={{ p: 2, display: "flex", justifyContent: "space-between" }}>
              <Box>
                <Typography>{item.name}</Typography>
                <Typography>₹{item.price} × {item.quantity}</Typography>
              </Box>
              <Button color="error" onClick={() => removeFromCart(item.id)}>Remove</Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
      <Typography variant="h6" mt={4}>Total: ₹{total}</Typography>
      <Button variant="contained" onClick={handlePayment} sx={{ mt: 2 }}>
        Check Out
      </Button>
    </Box>
  );
}
