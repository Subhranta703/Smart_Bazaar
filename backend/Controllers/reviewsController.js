const reviewsModel = require("../models/reviewsModel");
const sendError = require("../utils/sendError");


const addReviews = async (req, res) => {
  try {
    console.log("🔍 Incoming Review Data:", req.body); // Debugging log
    console.log("🔍 Checking req.user:", req.user); // Debugging log

    if (!req.user) {
      console.log("❌ Authentication failed: No user found");
      return res.status(401).json({ success: false, message: "Unauthorized: No user found!" });
    }

    const { comment, ratings } = req.body;

    if (!comment || !ratings) {
      console.log("❌ Missing required fields");
      return res.status(400).json({ success: false, message: "Comment and ratings are required!" });
    }

    const isReviewsExist = await reviewsModel.findOne({ user: req.user._id });

    if (isReviewsExist) {
      console.log("🔄 Updating existing review...");
      isReviewsExist.comment = comment;
      isReviewsExist.ratings = ratings;
      await isReviewsExist.save();
      return res.status(200).json({ success: true, message: "Review Updated!" });
    }

    console.log("✨ Creating new review...");
    const newReview = await reviewsModel.create({ user: req.user._id, comment, ratings });

    res.status(201).json({ success: true, message: "Review Added!", review: newReview });
  } catch (error) {
    console.error("❌ Error adding review:", error.message);
    res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
  }
};

const getAllReviews = async (req, res) => {
  try {
    // const reviews = await reviewsModel
    //   .find({ ratings: { $gte: 3 } })
    //   .sort({ _id: -1 })
    //   .populate("user");


    const reviews = await reviewsModel.find().sort({ _id: -1 }).populate("user");
    res.status(200).json({
      success: true,
      reviews,
    });
  } catch (error) {
    sendError(res, 400, "Somethings Went To Wrong..!!");
  }
};

//get all reviews fro admin
const AdminGetAllReviews = async (req, res) => {
  try {
    const reviews = await reviewsModel
      .find()
      .sort({ _id: -1 })
      .populate("user");
    res.status(200).json({
      success: true,
      reviews,
    });
  } catch (error) {
    sendError(res, 400, "Somethings Went To Wrong..!!");
  }
};

//Delete Product
const deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    if (reviewId) {
      const review = await reviewsModel.findById(reviewId);
      if (review) {
        const deletedReview = await reviewsModel.findByIdAndDelete(reviewId);
        res.status(200).json({
          success: true,
          message: "Review Delete SuccessFully..!!",
        });
      } else {
        sendError(res, 400, "Review Not Found");
      }
    } else {
      sendError(res, 400, "Review Id Not Found");
    }
  } catch (error) {
    console.log(error.message);
    sendError(res, 400, "Somethings Went's Wrong..!!");
  }
};

module.exports = {
  addReviews,
  getAllReviews,
 
  deleteReview,
  AdminGetAllReviews,
};
