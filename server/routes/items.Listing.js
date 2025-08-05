// ✅ Correct order
import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import Item from '../models/ItemModel.js'; // ✅ MUST be before using `Item`
import Cart from '../models/CartModel.js';
const router = express.Router();

router.post("/newItem", async (req, res) => {
  try {
    const itemId = uuidv4();
    const newItem = new Item({
      email: req.body.email,
      itemId,
      itemName: req.body.itemName,
      itemAge: req.body.itemAge,
      itemImage: req.body.itemImage,
      itemPrice: req.body.itemPrice,
      itemCategory: req.body.itemCategory,
      itemDescription: req.body.itemDescription,
    });

    await newItem.save();
    res.status(201).json({ message: "Item created successfully", itemId });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error posting item.");
  }
});
router.get("get/Item/:email",async(req,res)=>{
  try {
    const items = await Item.find({ email: req.params.email });
    if (items.length === 0) {
      return res.status(404).json({ message: "No items found for this email" });
    }
    res.status(200).json(items);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching items.");
  }
})

export default router;

router.post("/addToCart",async(req,res)=>{
  const email=req.body.email;
  const itemId=req.body.itemId;
if(email && itemId){
  const CartItem=new Cart({
    email:email,
    itemId:itemId
  })
  await CartItem.save();
  res.status(201).json({ message: "Item added to cart successfully" });
}
})

