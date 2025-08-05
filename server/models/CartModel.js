import mongoose from 'mongoose';
const CartSchema=new mongoose.Schema({
    email:{type:String, required:true},
    ItemId:{type:String,required:true}
})
const Cart=mongoose.model('Cart',CartSchema);
export default Cart;