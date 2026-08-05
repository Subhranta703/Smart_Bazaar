import api from "../../api";
import {
  GET_ALL_ORDERS_ADMIN_FAIL,
  GET_ALL_ORDERS_ADMIN_REQUEST,
  GET_ALL_ORDERS_ADMIN_SUCCESS,
  GET_USER_ORDERS_DETAILS_FAIL,
  GET_USER_ORDERS_DETAILS_REQUEST,
  GET_USER_ORDERS_DETAILS_SUCCESS,
  GET_USER_ORDERS_FAIL,
  GET_USER_ORDERS_REQUEST,
  GET_USER_ORDERS_SUCCESS,
  UPDATE_ORDER_ADMIN_FAIL,
  UPDATE_ORDER_ADMIN_REQUEST,
  UPDATE_ORDER_ADMIN_SUCCESS,
} from "../Constants/orderConstants";



export const getUsersOrdersAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_USER_ORDERS_REQUEST });

    const token = localStorage.getItem("authToken"); // ✅ Ensure token is retrieved

    const { data } = await api.get("/user/my/orders", {
      withCredentials: true,
      headers: { Authorization: `Bearer ${token}` } // ✅ Sends authentication token
    });

    dispatch({ type: GET_USER_ORDERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_USER_ORDERS_FAIL,
      error: error.response?.data?.message || "Unauthorized!",
    });
  }
};

export const getUsersOrderDetailsAction = (orderId) => async (dispatch) => {
  try {
    dispatch({ type: GET_USER_ORDERS_DETAILS_REQUEST });
    const { data } = await api.get(`/user/my/order/${orderId}`);
    dispatch({ type: GET_USER_ORDERS_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_USER_ORDERS_DETAILS_FAIL,
      error: error.response.data.message,
    });
    // console.log(error);
  }
};


export const getAllOrdersAdminAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_ORDERS_ADMIN_REQUEST });

    const token = localStorage.getItem("authToken"); // ✅ Ensure token is retrieved

    const { data } = await api.get("/user/admin/orders", {
      withCredentials: true,
      headers: { Authorization: `Bearer ${token}` }
    });

    dispatch({ type: GET_ALL_ORDERS_ADMIN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_ORDERS_ADMIN_FAIL,
      error: error.response?.data?.message || "Unauthorized!",
    });
  }
};


export const updateOrdersAdminAction =
  (orderId, oStatus) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_ORDER_ADMIN_REQUEST });
      const { data } = await api.put(`/user/update/order/${orderId}`, {
        oStatus,
      });
      dispatch({ type: UPDATE_ORDER_ADMIN_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: UPDATE_ORDER_ADMIN_FAIL,
        error: error.data.response.message,
      });
    }
  };
