import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  password: { type: String }, // Not required for OAuth users
  accesstoken: { type: String }, // Optional, depending on provider flow
  role: { type: String, default: 'user' }, // Set default, not required
  secretToken: { type: String }, // Optional
  provider: { type: String }, // e.g., 'google', 'facebook'
  providerId: { type: String } // Unique ID from provider
});

const User = mongoose.model('User', userSchema);
export default User;
