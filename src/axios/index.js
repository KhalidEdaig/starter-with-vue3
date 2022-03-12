import axios from "axios";
import router from "@/router";
import store from "@/store";

axios.defaults.baseURL = process.env.VUE_APP_BASE_URL;

axios.interceptors.request.use(
  (config) => {
    if (localStorage.getItem("user")) {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user.access_token;
      if (token) {
        config.headers["Authorization"] = "Bearer " + token;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const authErrorCode = 401;
    const ErrorCodes = [
      {
        code: 500,
        message: "Internal Server Error !",
      },
      {
        code: 400,
        message: "Bad Request !",
      },
      {
        code: 422,
        message: "Unprocessable Entity !",
      },
      {
        code: 403,
        message: "Forbidden !",
      },
    ];
    if (error.response.status === authErrorCode) {
      localStorage.removeItem("user");
      // redirect to Login router
      router.push({ name: "login" }).catch(() => {});
    }
    const errorReceived = error.response.status;
    const foundError = ErrorCodes.find((error) => error.code === errorReceived);
    if (foundError) {
      store.dispatch(
        // dispatch notification
      );
    }
    return Promise.reject(error);
  }
);

export default axios;
