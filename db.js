// db.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const mongoURL = process.env.MONGO_URL || "mongodb+srv://shubhangandas7366:dYd19NO6qADXoAq9@users.jghi6s7.mongodb.net/auth?retryWrites=true&w=majority";

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURL);
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1); // optional: stop the server on failure
  }
};

export default connectDB;
