import LogHelper from "./LogHelper";

const ErrorHelper = {
  interpreter: (error: ErrorObject) => {
    // LogHelper.record(error);
    if (error.message == "Error: Network Error") {
      return "Erro de conexão verifique se está conectado";
    }
    if (error.status === '500') {
      return "Ocoreu algum erro de comunicação";
    }
    return false;
  },
};

export default ErrorHelper;
