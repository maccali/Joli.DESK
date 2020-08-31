import axios, { AxiosInstance } from "axios";
import LogHelper from "../helpers/LogHelper";
import Auth from "../helpers/Auth";

const api: AxiosInstance = axios.create({
  baseURL: process.env.API_URL,
});

api.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    var errorObject: ErrorObject = {
      message: error.message,
    };
    LogHelper.record(errorObject);
    return Promise.reject(error);
  }
);

const authKeys = Auth.getToken();

if (authKeys !== false) {
  const { token } = authKeys;
  api.defaults.headers.common = { Authorization: `bearer ${token}` };
}

export default api;
