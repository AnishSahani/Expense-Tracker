const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// Register User
exports.registerUser = async (req, res) => {
   
  try {
    const { fullName, email, password, profileImageUrl } = req.body || {};

    // Log incoming request for debugging
    //  console.log("Incoming req.body:", req.body);

    // Validation: Check for missing or empty fields
    if (!fullName?.trim() || !email?.trim() || !password?.trim()) {
      return res
        .status(400)
        .json({ message: "Full name, email, and password are required." });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use." });
    }

    // Create new user
    const user = await User.create({
      fullName: fullName.trim(),
      email: email.trim(),
      password,
      profileImageUrl: profileImageUrl?.trim() || "",
    });

     console.log("Saved hashed password:", user.password);

    // Send response with token
    res.status(201).json({
      id: user._id,
      user,
      token: generateToken(user._id),
    });
  } catch (err) {
    console.error("Registration Error:", err.message);
    res.status(500).json({
      message: "Error registering user",
      error: err.message,
    });
  }
};


exports.loginUser = async (req,res) =>{
  const {email,password} = req.body;

  if(!email || !password){
    return res.status(400).json({message: "All fields are required"});
  }
  try{
    const user =await User.findOne({email});
    if(!user || !(await user.comparePassword(password))){
      return res.status(400).json({message:"Invalid credentials"});
    }

    res.status(200).json({
      id:user._id,
      user,
      token:generateToken(user._id)
    });
  }catch (err) {
    res
    .status(500)
    .json({
      message: "Error registering user",
      error: err.message,
    });
  }
};

exports.getUserInfo = async (req,res) =>{
  try{
    const user = await User.findById(req.user.id).select("-password");

    if(!user){
      return res.status(404).json({message:"User not found"});
    }
    res.status(200).json(user);
  }
  catch(err){
    res.
    status(500)
    .json({message:"Error registering user", error:err.message});
  }
};