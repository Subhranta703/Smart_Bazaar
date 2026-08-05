import api from "../../api";
import {
  CLEAR_ERRORS,
  DELETE_REVIEWS_REQUEST,
  DELETE_REVIEWS_REVIEWS_FAIL,
  DELETE_REVIEWS_REVIEWS_SUCCESS,
  GET_ALL_ADMIN_REVIEWS_FAIL,
  GET_ALL_ADMIN_REVIEWS_REQUEST,
  GET_ALL_ADMIN_REVIEWS_SUCCESS,
  GET_ALL_REVIEWS_FAIL,
  GET_ALL_REVIEWS_REQUEST,
  GET_ALL_REVIEWS_SUCCESS,
} from "../Constants/reviewsConstants";

export const getAllReviewsAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_REVIEWS_REQUEST });
    const { data } = await api.get("/user/get/reviews");
    
    console.log("✅ Reviews API Response:", data); // Debugging log
    console.log("📢 ...Dispatching Reviews to Redux:", data.reviews); // Ensure correct key usage

    dispatch({ type: GET_ALL_REVIEWS_SUCCESS, payload: data }); // ✅ Send full response
  } catch (error) {
    console.error("❌ Error fetching reviews:", error);
    dispatch({ type: GET_ALL_REVIEWS_FAIL, payload: error.response?.data?.message || "Failed to fetch reviews" });
  }
};

export const getAllAdminReviewsAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_ADMIN_REVIEWS_REQUEST });
    const { data } = await api.get("/user/get/reviews");
    dispatch({ type: GET_ALL_ADMIN_REVIEWS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_ADMIN_REVIEWS_FAIL,
      error: error.response.data.message,
    });
  }
};

export const deleteReviewsAction = (reviewId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_REVIEWS_REQUEST });
    const { data } = await api.delete(`/user/admin/review/${reviewId}`);
    dispatch({ type: DELETE_REVIEWS_REVIEWS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELETE_REVIEWS_REVIEWS_FAIL,
      error: error.response.data.message,
    });
  }
};

export const clearError = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
