import axios from "axios";

const axiosClient = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 55000,
});

axiosClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (error) => {
    let {
      response = {
        status: false,
        statusText: "Kết nối chậm, vui lòng thử lại sau!",
      },
    } = error;
    if (response) {
      const { status } = response;
      if (status === 404) {
        console.log("Not found");
        response.status = null;
        response.statusText = null;
        response.data = null;
        response["dataNotFound"] = {};
        error.code = null;
        error.message = null;
      }
    }
    if (error.message === "Network Error") {
      error.message = "Lỗi mạng";
    }
    let returnValue = {
      status: response.status || error.code,
      statusText: response.statusText || error.message,
      data: response.data,
    };
    if (response.dataNotFound) {
      returnValue["dataNotFound"] = {};
    }
    return Promise.reject(returnValue);
  }
);

export default axiosClient;
