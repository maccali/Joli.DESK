interface ErrorObject {
  message: string;
  source?: string;
  lineNumber?: string;
  colNumber?: string;
  status?: string;
}

interface LogObject {
  error: ErrorObject;
  dateTime: string;
}
