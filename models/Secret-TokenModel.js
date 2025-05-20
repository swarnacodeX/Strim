import mongoose from 'mongoose';
const secretTokenSchema= new mongoose.Schema({
    token: {type: String, unique:true, required:true}
})
const SecretToken= mongoose.model('secret-token',secretTokenSchema);
export default SecretToken;