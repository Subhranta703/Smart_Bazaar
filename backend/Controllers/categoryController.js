const categoryModel = require("../models/categoryModel");
 const cloudinary = require("cloudinary");
 
const sendError = require("../utils/sendError");



const addCategory = async (req, res) => {
  try {
    const { categoryName, categoryImage } = req.body;

    const isCategoryExist = await categoryModel.findOne({ categoryName });
    if (isCategoryExist) {
      return sendError(res, 400, "Category Already Exist..!!");
    }

    let imageUrl = categoryImage;

    // If not a URL, upload to Cloudinary
    if (!categoryImage.startsWith("http")) {
      const result = await cloudinary.v2.uploader.upload(categoryImage, {
        folder: "category",
      });
      imageUrl = result.secure_url;
    }

    const newCategory = await categoryModel.create({
      categoryName,
      categoryImage: imageUrl,
    });

    res.status(201).json({
      success: true,
      category: newCategory,
      message: "Category Added Successfully!",
    });
  } catch (error) {
    console.error(error);
    sendError(res, 400, error.message || "Something went wrong");
  }
};



const getAllCategories = async (req, res) => {
  console.log("getAllCategories called");
  try {
    const categories = await categoryModel.find();
    res.status(200).json({
      success: true,
      Categories: categories,
      CategoriesCount: categories.length,
      message: "Add Categories Get Successfully..!!"
    });
  } catch (error) {
    console.error("Error in getAllCategories:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

 


//delete category
const deleteCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    if (categoryId) {
      const isCategoryExist = await categoryModel.findById(categoryId);
      if (isCategoryExist) {
        const DeletedCategory = await categoryModel.findByIdAndDelete(
          categoryId
        );
        res.status(200).json({
          success: true,
          message: "Category Delete SuccessFully..!!",
          DeletedCategory,
        });
      } else {
        sendError(res, 400, "Category Not Found");
      }
    } else {
      sendError(res, 400, "Category Id Not Found");
    }
  } catch (error) {
    sendError(res, 400, "Something Went's Wrong..!!");
  }
};

const updateCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    if (!categoryId) {
      return sendError(res, 400, "Category Id Required..!!");
    }

    const category = await categoryModel.findById(categoryId);
    if (!category) {
      return sendError(res, 404, "Category Not Found");
    }

    const { categoryName, categoryImage } = req.body;

    // ✅ Update name if provided
    if (categoryName) {
      category.categoryName = categoryName;
    }

    // ✅ Update image only if a new one is sent
    if (categoryImage && !categoryImage.startsWith("http")) {
      const result = await cloudinary.v2.uploader.upload(categoryImage, {
        folder: "category",
      });
      category.categoryImage = result.secure_url;
    }

    await category.save();

    res.status(200).json({
      success: true,
      message: "Category Updated Successfully!",
      updatedCategory: category,
    });
  } catch (error) {
    console.error(error);
    sendError(res, 500, "Something Went Wrong..!!");
  }
};

module.exports = {
  addCategory,
  getAllCategories,
  deleteCategory,
  updateCategory,
};
