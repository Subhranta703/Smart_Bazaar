import {
  ADD_CATEGORY_FAIL,
  ADD_CATEGORY_REQUEST,
  ADD_CATEGORY_SUCCESS,
  CLEAR_ERRORS,
  DELETE_CATEGORY_FAIL,
  DELETE_CATEGORY_REQUEST,
  DELETE_CATEGORY_SUCCESS,
  GET_CATEGORY_FAIL,
  GET_CATEGORY_REQUEST,
  GET_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_FAIL,
  UPDATE_CATEGORY_REQUEST,
  UPDATE_CATEGORY_SUCCESS,
} from "../Constants/categoryConstants";
import api from "../../api";

export const addCategoryAction = (categoryData) => async (dispatch) => {
  try {
    dispatch({ type: ADD_CATEGORY_REQUEST });
    const token = localStorage.getItem("authToken"); // ✅ Ensure token is retrieved

    const { data } = await api.post("/category/add", categoryData, {
      withCredentials: true, // ✅ Ensures cookies are sent
      headers: { Authorization: `Bearer ${token}` } // ✅ Sends authentication token
    });

    dispatch({ type: ADD_CATEGORY_SUCCESS, payload: data });
  } catch (error) {
    // console.log(error);
        console.error("❌ Error Adding category:", error.response?.data?.message || "Unauthorized!");

    dispatch({ type: ADD_CATEGORY_FAIL, error: error.response.data.message });
  }
};



export const getAllCategoryAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_CATEGORY_REQUEST });
    const { data } = await api.get("/category/get");
    
    console.log("✅ Categories API Response:", data); // Debugging log
    console.log("📢 Dispatching Categories to Redux:", data.Categories);

dispatch({ type: GET_CATEGORY_SUCCESS, payload: data });  } catch (error) {
    console.error("❌ Error fetching categories:", error);
    dispatch({ type: GET_CATEGORY_FAIL, payload: error.response?.data?.message || "Failed to fetch categories" });
  }
};




export const deleteCategoryAction = (categoryId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_CATEGORY_REQUEST });

    const token = localStorage.getItem("authToken"); // ✅ Ensure token is retrieved
    console.log("🔍 Sending Token:", token); // ✅ Debugging log

    const { data } = await api.delete(`/category/delete/${categoryId}`, {
      headers: { Authorization: `Bearer ${token}` },
       withCredentials: true, // ✅ Sends authentication token
    });

    dispatch({ type: DELETE_CATEGORY_SUCCESS, payload: data });
  } catch (error) {
    console.error("❌ Error Deleting Category:", error.response?.data?.message || "Internal Server Error!");
    dispatch({ type: DELETE_CATEGORY_FAIL, error: error.response?.data?.message || "Internal Server Error!" });
  }
};


export const updateCategoryAction = (categoryId, updateFormData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_CATEGORY_REQUEST });

    const token = localStorage.getItem("authToken"); // ✅ Ensure token is retrieved
    console.log("🔍 Sending Token:", token); // ✅ Debugging log

    const { data } = await api.put(`/category/update/${categoryId}`, updateFormData, {
      headers: { Authorization: `Bearer ${token}` }, // ✅ Sends authentication token
    });

    dispatch({ type: UPDATE_CATEGORY_SUCCESS, payload: data });
  } catch (error) {
    console.error("❌ Error Updating Category:", error.response?.data?.message || "Internal Server Error!");
    dispatch({ type: UPDATE_CATEGORY_FAIL, error: error.response?.data?.message || "Internal Server Error!" });
  }
};

export const clearError = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
