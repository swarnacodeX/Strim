import express from 'express';
import Razorpay from 'razorpay';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();

const router = express.Router();
//CREATING AN ORDER


router.post("/order", async (req, res) => {
  try {
    const instance = new Razorpay({
      key_id:process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
    const options = req.body;
    const order = await instance.orders.create(options);
    if (!order) {
      return res.status(500).send("error creating order");
    }
    res.json(order);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message || String(err) });
  }
});

router.post("/order/validate", async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const sha = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
  sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
  const digest = sha.digest("hex");
  if (digest !== razorpay_signature) {
    return res.status(400).json({ msg: "Transaction is not legit!" });
  }

  res.json({
    msg: "success",
    orderId: razorpay_order_id,
    paymentId: razorpay_payment_id,
  });
});


export default router;
