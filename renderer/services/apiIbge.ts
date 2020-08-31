import axios from 'axios';
import LogHelper from "../helpers/LogHelper";

const apiIBGE = axios.create({
  baseURL: "https://servicodados.ibge.gov.br/api/v1/"
})

apiIBGE.interceptors.response.use(
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

export default apiIBGE