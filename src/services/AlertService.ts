import Message from "vue-m-message";

export class AlertService {
  /**
   * Multiple Errors Alert
   * @param error
   */
  static displayMultipleErrorsAlert(error) {
    const response = error.response.data;

    if (response.errors) {
      const errors = response.errors;
      for (const key in errors) {
        AlertService.callMessageBox("error", errors[key][0]);
      }
    } else if (response.error) {
      AlertService.callMessageBox("error", response.error);
    } else if (error.message) {
      AlertService.callMessageBox("error", error.message);
    } else if (error.response.error) {
      AlertService.callMessageBox("error", error.response.error);
    } else {
      AlertService.callMessageBox("error", error);
    }
  }

  /**
   * Single Error Alert
   * @param error
   */
  static displayErrorAlert(error) {
    AlertService.callMessageBox("error", error);
  }

  /**
   * Success Message Alerts
   * @param message
   */
  static displaySuccessAlert(message) {
    AlertService.callMessageBox("success", message);
  }

  /**
   * Message Box
   * @param alertType
   * @param alertMessage
   * @private
   */
  private static callMessageBox(alertType, alertMessage) {
    Message({
      message: alertMessage,
      position: "bottom-right",
      type: alertType,
      duration: 5000,
      zIndex: 99999,
    });
  }
}
