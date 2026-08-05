import {
  ADD_PRODUCT_FAIL,
  ADD_PRODUCT_REQUEST,
  ADD_PRODUCT_SUCCESS,
  CLEAR_ERRORS,
  DELETE_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  GET_ALL_PRODUCTS_FAIL,
  GET_ALL_PRODUCTS_REQUEST,
  GET_ALL_PRODUCTS_SUCCESS,
  GET_SINGLE_PRODUCT_FAIL,
  GET_SINGLE_PRODUCT_REQUEST,
  GET_SINGLE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
} from "../Constants/productConstants";

import api from "../../api";

export const AddProductsAction = (productData) => async (dispatch) => {
  try {
    dispatch({ type: ADD_PRODUCT_REQUEST });

    const token = localStorage.getItem("authToken"); // ✅ Ensure token is retrieved

    const { data } = await api.post(`/product/add`, productData, {
      withCredentials: true, // ✅ Ensures cookies are sent
      headers: { Authorization: `Bearer ${token}` } // ✅ Sends authentication token
    });

    dispatch({ type: ADD_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    console.error("❌ Error Adding Product:", error.response?.data?.message || "Unauthorized!");
    dispatch({ type: ADD_PRODUCT_FAIL, error: error.response?.data?.message || "Unauthorized!" });
  }
};

//Get All Products
export const getAllProductsAction =
  (price = "0-1000", filterCategory, keyword = "") =>
  async (dispatch) => {
    try {
      dispatch({ type: GET_ALL_PRODUCTS_REQUEST });
      let UrlLink;
      if (keyword !== "") {
        UrlLink = `/product/getAllProducts?keyword=${keyword}`;
      } else if (filterCategory && price) {
        const gte = price.split("-")[0];
        const lte = price.split("-")[1];
        UrlLink = `/product/getAllProducts?category=${filterCategory}&gte=${gte}&lte=${lte}`;
      } else {
        UrlLink = "/product/getAllProducts";
      }
      const { data } = await api.get(UrlLink);
      dispatch({ type: GET_ALL_PRODUCTS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: GET_ALL_PRODUCTS_FAIL,
        error: error.response.data.message,
      });
    }
  };




export const deleteProductAction = (productId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PRODUCT_REQUEST });

    const token = localStorage.getItem("authToken");
    console.log("🔍 Sending Token:", token); // ✅ Debugging log

    const { data } = await api.delete(`/product/delete/${productId}`, {
      headers: { Authorization: `Bearer ${token}` }, // ✅ Sends authentication token
      withCredentials: true, // ✅ Ensures cookies are sent
    });

    dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    console.error("❌ Error Deleting Product:", error.response?.data?.message || "Unauthorized!");
    dispatch({ type: DELETE_PRODUCT_FAIL, error: error.response?.data?.message || "Unauthorized!" });
  }
};

export const getSingleProductAction = (productId) => async (dispatch) => {
  try {
    dispatch({ type: GET_SINGLE_PRODUCT_REQUEST });
    const { data } = await api.get(
      `/product/getSingleProduct/${productId}`
    );
    dispatch({ type: GET_SINGLE_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_PRODUCT_FAIL,
      error: error.response.data.message,
    });
  }
};


export const updateProductAction = (productId, updateFormData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PRODUCT_REQUEST });

    const token = localStorage.getItem("authToken");
    console.log("🔍 Sending Token:", token); // ✅ Debugging log

    const { data } = await api.put(
      `/product/update/${productId}`,
      updateFormData,
      {
        headers: { Authorization: `Bearer ${token}` }, // ✅ Sends authentication token
        withCredentials: true, // ✅ Ensures cookies are sent
      }
    );

    dispatch({ type: UPDATE_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    console.error("❌ Error Updating Product:", error.response?.data?.message || "Unauthorized!");
    dispatch({ type: UPDATE_PRODUCT_FAIL, error: error.response?.data?.message || "Unauthorized!" });
  }
};

export const clearError = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
