export default class ErrorCode {
  
  constructor({ userMsg, cause }) {
    this.userMsg = userMsg;
    this.cause = cause;
  }
}
