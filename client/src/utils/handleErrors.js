import axios from "axios";
import { serverOffline, serverOnline } from "../redux/features/network/network.slice";
import {useDispatch} from "react-redux"

let isLoggingOut = false;

export const handleAxiosError = (error, thunkAPI) => {
  const dispatch = useDispatch();
  console.log("Axios error:", error);
  const timestamp = Date.now();

  if (axios.isAxiosError(error)) {
    const config = error.config || {};

    const baseError = {
      message: "Something went wrong",
      statusCode: 0,
      errorCode: "UNKNOWN_ERROR",
      data: null,
      timestamp,
      path: config.url || null,
      method: config.method?.toUpperCase() || null,
    };

    if (error.response) {
      const { status, data } = error.response;

      if (status === 401 && !isLoggingOut) {
        isLoggingOut = true;
        localStorage.removeItem("token");

        setTimeout(() => {
          isLoggingOut = false;
        }, 1000);

        thunkAPI.dispatch({ type: "auth/logout" });
      }

      return thunkAPI.rejectWithValue({
        ...baseError,
        message: data?.error || data?.message || "Server error",
        statusCode: status,
        errorCode: data?.errorCode || "SERVER_ERROR",
        data: data || null,
      });
    }

    if (error.request) {
      thunkAPI.dispatch(serverOffline());

      return thunkAPI.rejectWithValue({
        ...baseError,
        message: "Network error. Please check your internet connection.",
        errorCode: "NETWORK_ERROR",
      });
    }

    return thunkAPI.rejectWithValue({
      ...baseError,
      message: error.message || "Axios configuration error",
      errorCode: "AXIOS_ERROR",
    });
  }

  return thunkAPI.rejectWithValue({
    message: "Unexpected error occurred",
    statusCode: 0,
    errorCode: "UNEXPECTED_ERROR",
    timestamp,
  });
};