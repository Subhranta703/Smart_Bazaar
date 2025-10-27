// //Config
// // if (process.env.NODE_ENV !== "PRODUCTION") {
// //   require("dotenv").config({ path: "backend/.env" });
// // }
// require('dotenv').config();

// const cloudinary = require("cloudinary");
// const expressFileUpload = require("express-fileupload");
// const express = require("express");
// const app = express();
// const path = require("path");
// const bodyParser = require("body-parser");
// const cookieParser = require("cookie-parser");
// console.log("__dirname:", __dirname);

// console.log("MONGO_URI:", process.env.MONGO_URI);

// const connectDB = require("./Config/connection");

// console.log("MONGO_URI:", process.env.MONGO_URI);

// const userRoutes = require("./routes/userRoute");
// const productRoute = require("./routes/productRoute");
// const categoryRoute = require("./routes/categoryRoute");


// //Body Parser
// app.use(bodyParser.urlencoded({ limit: "200mb", extended: true }));

// //Cookies Parser
// app.use(cookieParser());

// //Database Connect
// connectDB();
// //JSON
// app.use(express.json());

// //Use Express File Upload
// app.use(expressFileUpload());

// //Config Cloudniary
// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.CLOUD_API_KEY,
//   api_secret: process.env.CLOUD_API_SECRET_KEY,
// });

// // app.listen(process.env.PORT, "localhost", () => {
// //   console.log(`Server Running At http://localhost:${process.env.PORT}`);
// // });

// app.listen(process.env.PORT || 8080, "0.0.0.0", () => {
//   console.log(`Server Running At http://localhost:${process.env.PORT || 8080}`);
// });


// //Load Route
// app.use("/api/user", userRoutes);
// app.use("/api/product", productRoute);
// app.use("/api/category", categoryRoute);

// //Access Front End Static Files
// app.use(express.static(path.join(__dirname, "../frontend/build")));

// //Access Front End All URL
// app.get("/*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
// });



//Config
// if (process.env.NODE_ENV !== "PRODUCTION") {
//   require("dotenv").config({ path: "backend/.env" });
// }
// require("dotenv").config({ path: "backend/.env" });

require("dotenv").config({ path: "./backend/.env" }); // ✅ Explicitly specify the file pathconsole.log("Loaded Environment Variables:", process.env);

// const cloudinary = require("cloudinary");
const expressFileUpload = require("express-fileupload");
const express = require("express");
const app = express();
const path = require("path");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const connectDB = require("./Config/connection");
const userRoutes = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");
const categoryRoute = require("./routes/categoryRoute");
 const cloudinary = require("cloudinary").v2;

//Body Parser
app.use(bodyParser.urlencoded({ limit: "200mb", extended: true }));

//Cookies Parser
app.use(cookieParser());

//Database Connect
connectDB();
//JSON
app.use(express.json());

//Use Express File Upload
app.use(expressFileUpload());

console.log("CLOUD_NAME:", process.env.CLOUD_NAME);
console.log("CLOUD_API_KEY:", process.env.CLOUD_API_KEY);
console.log("CLOUD_API_SECRET_KEY:", process.env.CLOUD_API_SECRET);
console.log("MONGO_URI:", process.env.MONGO_URI);

//Config Cloudniary
// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.CLOUD_API_KEY,
//   api_secret: process.env.CLOUD_API_SECRET_KEY,
// });

 
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
  timeout: 120000, // ✅ Increase timeout to 120 seconds
});


app.get("/", (req, res) => {
  res.send("✅ Backend is running successfully!");
});



 const cors = require("cors");
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
})); // Allows requests from any origin

//Load Route
app.use("/api/user", userRoutes);
app.use("/api/product", productRoute);
app.use("/api/category", categoryRoute);
 app.use("/api/admin", productRoute);
//Access Front End Static Files
// app.use(express.static(path.join(__dirname, "../frontend/build")));

 
// ...existing code...
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message || "Internal Server Error" });
});
// ...existing code...
// app.listen(process.env.PORT ||8080, "127.0.0.1", () => {
//   console.log(`Server Running At http://localhost:${process.env.PORT || 8080}`);
// });
app.listen(process.env.PORT || 8080,() => {
  console.log(`Server Running At http://localhost:${process.env.PORT || 8080}`);
});
app.use((req, res, next) => {
  req.setTimeout(120000, () => {
    console.log("⏳ Request timed out!");
    res.status(408).json({ success: false, message: "Request Timeout" });
  });
  next();
});
// //Access Front End All URL
// app.get("/*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
// });
