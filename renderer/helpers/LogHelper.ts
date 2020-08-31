import { string } from "yup";

const LOGS = "Logs";

interface LogObject {
  error: ErrorObject;
  dateTime: string;
}

const LogHelper = {
  getRecords: () => {
    return localStorage.getItem(`${LOGS}`);
  },

  setRecords: (records: Array<LogObject>) => {
    localStorage.setItem(`${LOGS}`, JSON.stringify(records));
  },

  record: (error: ErrorObject) => {
    var errorObject = {
      error,
      dateTime: new Date().toISOString(),
    };

    var records = LogHelper.getRecords();

    if (!records) {
      LogHelper.setRecords([]);
      var records = LogHelper.getRecords();
    }

    var recordsJson = JSON.parse(records);
    recordsJson.push(errorObject);
    LogHelper.setRecords(recordsJson);
  },
};

export default LogHelper;
