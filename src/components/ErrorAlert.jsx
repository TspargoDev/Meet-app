import Alert from "./Alert";

class ErrorAlert extends Alert {
  constructor(props) {
    super(props);
    this.color = "red"; // base Alert uses this.color in getStyle()
  }
}

export default ErrorAlert;