
const express = require("express");
const { addCategory, getAllCategories, deleteCategory, updateCategory } = require("../Controllers/categoryController");
const isAuthUser = require("../middleware/isAuthUser"); // ✅ Import authentication middleware

const route = express.Router();

route.get("/get", getAllCategories);
route.post("/add", isAuthUser, addCategory); // ✅ Requires authentication
route.delete("/delete/:categoryId", isAuthUser, deleteCategory); // ✅ Requires authentication
route.put("/update/:categoryId", isAuthUser, updateCategory); // ✅ Requires authentication

module.exports = route;