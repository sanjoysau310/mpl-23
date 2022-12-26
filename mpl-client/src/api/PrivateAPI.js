import axios from "axios";
const PrivateAPI = axios.create({
  baseURL: "http://localhost:8080/api",
});

PrivateAPI.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    config.headers = {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    };
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

export default PrivateAPI;
