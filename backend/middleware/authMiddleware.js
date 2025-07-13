const jwt=require('jsonwebtoken');
const User=require('../models/User');

const protect = async (req, res, next) => {
   // let token = req.headers.authorization?.split(" ")[1];
   // if(!token) return res.status(401).json({message: "Not authorized, no token"});

   // try{
   //  const decoded =jwt.verify(token,process.env.JWT_SECRET);
   //  req.user =  await User.findById(decoded.id).select('-password');
   // }catch(err){
   //  res.status(401).json({message: "Not authorized, token failed"});
   // }

    const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    try {
      const token = authHeader.split(" ")[1];
      // console.log("✅ Token received:", token);

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // console.log("✅ Decoded user ID:", decoded.id);

      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        console.log("❌ User not found for decoded ID");
        return res.status(401).json({ message: "User not found" });
      }

      next();
    } catch (err) {
      console.log("❌ Token verification failed:", err.message);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    console.log("❌ No authorization header or wrong format");
    return res.status(401).json({ message: "No token provided" });
  }
};

module.exports = protect;
