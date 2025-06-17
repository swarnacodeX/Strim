import express from "express";
import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";
import User from "../models/UserModel.js";
import SecretToken from "../models/Secret-TokenModel.js";
const router = express.Router();

function Hashing(password) {
  const key = crypto.pbkdf2Sync(password, "kejbv8734r2yhfkebf", 100000, 64, "sha512");
  return key.toString('hex');
}

// Login
router.post("/login", async (req, res) => {
  const { email, password ,role,secretToken} = req.body;
  const hashedPassword = Hashing(password);
 
  if(role=="Admin"){
    const secretTokenData=await SecretToken.findOne({token:secretToken});
    if(secretTokenData){
        try {
    const user = await User.findOne({ email, password: hashedPassword });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
     const accesstoken = uuidv4();
    user.accesstoken = accesstoken;
    await user.save();
    res.json({ accesstoken ,firstname:user.firstname,role});
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
    }}
    else{
      try{
        const user=await User.findOne({email,password:hashedPassword});
        if(user){
           const accesstoken = uuidv4();
          user.accesstoken=accesstoken;
          await user.save();
          res.json({accesstoken,firstname:user.firstname,role:user.role});
        }
      }catch(err){
        console.error("Login error:", err);
        res.status(401).json({ error:"User role, invalid email/password" });
      }
    }
  }

);

// Register
// Register
router.post("/register", async (req, res) => {
  const { email, password, firstname, lastname, role, secretToken } = req.body;
  const hashedPassword = Hashing(password);
  const accesstoken = uuidv4();

  try {
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // If role is Admin, validate the secretToken
    if (role === "Admin") {
      const tokenExists = await SecretToken.findOne({ token: secretToken });
      if (!tokenExists) {
        return res.status(403).json({ error: "Invalid secret token for Admin registration" });
      }
    }

    // Proceed with user creation
    const newUser = new User({
      email,
      password: hashedPassword,
      firstname,
      lastname,
      accesstoken,
      role,
    });

    await newUser.save();
    res.json({ accesstoken });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Logout
router.post("/logout", async (req, res) => {
  const { email } = req.body;
  const newToken = uuidv4();

  try {
    await User.updateOne({ email }, { accesstoken: newToken });
    res.send("success");
  } catch (err) {
    console.error("Logout error:", err);
    res.status(500).send("Internal server error");
  }
});

// Profile Data
router.post("/profiledata", async (req, res) => {
  const { token } = req.body;
  try {
    const user = await User.findOne({ accesstoken: token });
    if (!user) {
      return res.status(401).json({ error: "Invalid token" });
    }
    res.json({ email: user.email, firstname: user.firstname, lastname: user.lastname });
  } catch (err) {
    console.error("Profile fetch error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Fetch Data (email by firstname + lastname)
router.post("/fetchdata", async (req, res) => {
  const { firstname, lastname } = req.body;
  try {
    const user = await User.findOne({ firstname, lastname });
    res.json({ email: user?.email || null });
  } catch (err) {
    console.error("Fetch error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update Username (firstname + lastname)
router.post("/updateusername", async (req, res) => {
  const { email, newFirstname, newLastname } = req.body;
  try {
    await User.updateOne({ email }, { firstname: newFirstname, lastname: newLastname });
    res.json({ message: "Name updated successfully" });
  } catch (err) {
    console.error("Update name error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update Email
router.post("/updateemail", async (req, res) => {
  const { oldEmail, newEmail } = req.body;
  try {
    await User.updateOne({ email: oldEmail }, { email: newEmail });
    res.json({ message: "Email updated successfully" });
  } catch (err) {
    console.error("Update email error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
