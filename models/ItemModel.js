import mongoose from 'mongoose';

const itemSchema=new mongoose.Schema({
email:{type: String,required:true},
itemId:{type: String,required:true},
itemName:{type: String,required:true},
itemImage:{type: String,required:true},
itemPrice:{type: String,required:true},
itemCategory:{type: String,required:true},
itemDescription:{type: String,required:true},
});

const Item= mongoose.model('Item',itemSchema);
export default Item;