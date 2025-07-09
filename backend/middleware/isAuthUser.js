const sendError = require("../utils/sendError");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

// const isAuthUser = async (req, res, next) => {
//   try {
//     //Get Token From Cookies
//     if (req.cookies.token) {
//       //Verify Token
//       const { userId } = jwt.verify(
//         req.cookies.token,
//         process.env.JWT_SECRET_KEY
//       );
//       //Get User From Token
//       req.user = await userModel.findById(userId).select("-password");
//       next();
//     } else {
//       sendError(res, 400, "");
//     }
//   } catch (error) {
//     sendError(res, 400, "Token Not Found..!!");
//   }
// };

// module.exports = isAuthUser;



const isAuthUser = async (req, res, next) => {
  try {
    console.log("🔍 Checking Cookies:", req.cookies); // Debugging log

    if (req.cookies.token) {
      console.log("🔍 Token Found:", req.cookies.token); // Debugging log
      
      // Verify Token
      const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET_KEY);

      console.log("✅ Token Verified, UserID:", decoded.userId); // Debugging log

      // Get User From Token
      req.user = await userModel.findById(decoded.userId).select("-password");

      if (!req.user) {
        console.log(" No user found for given token");
        return sendError(res, 401, "Unauthorized: User not found!");
      }

      next();
    } else {
      console.log("❌ No token found in cookies");
      sendError(res, 401, "Unauthorized: No token provided!");
    }
  } catch (error) {
    console.error("❌ Token Verification Error:", error.message);
    sendError(res, 401, "Invalid or expired token!");
  }
};

module.exports = isAuthUser;