import axios from "axios";

// Prevent multiple logout dispatches at once
let isLoggingOut = false;

export const handleAxiosError = (error, thunkAPI) => {
  console.error("Error in handleAxiosError:", error);
  const timestamp = Date.now();

  // ✅ AXIOS ERRORS
  if (axios.isAxiosError(error)) {
    console.error("Axios Error:", error);

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

    // 🟥 Server responded (4xx / 5xx)
    if (error.response) {
      const { status, data } = error.response;

      // 🔐 Auto logout on token expiry
      if (status === 401 && !isLoggingOut) {
        isLoggingOut = true;
        localStorage.removeItem("token");

        // Delay reset so future logins can logout again
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

    // 🟧 Network error (no response from server)
    if (error.request) {
      return thunkAPI.rejectWithValue({
        ...baseError,
        message: "Network error. Please check your internet connection.",
        errorCode: "NETWORK_ERROR",
      });
    }

    // 🟨 Axios configuration error
    return thunkAPI.rejectWithValue({
      ...baseError,
      message: error.message || "Request configuration error",
      errorCode: "AXIOS_ERROR",
    });
  }

  // 🟥 Non-Axios error (runtime bug)
  return thunkAPI.rejectWithValue({
    message: "Unexpected error occurred",
    statusCode: 0,
    errorCode: "UNEXPECTED_ERROR",
    data: null,
    timestamp,
    path: null,
    method: null,
  });
};
