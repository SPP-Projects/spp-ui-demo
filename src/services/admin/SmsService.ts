import ApiService from "@/core/services/ApiService";

class SmsService {
  /**
   * Sender ID
   */
  getSenderIDs(options) {
    return ApiService.get(
      `/v1/admin/sms/sender-ids?page=${options.current_page}&page_size=${options.page_size}&search_text=${options.search_text}&sort_column=${options.sort.column}&sort_direction=${options.sort.direction}`
    );
  }
  addSenderID(payload) {
    return ApiService.post(`/v1/admin/sms/sender-ids`, payload);
  }
  updateSenderID(payload) {
    return ApiService.patch(`/v1/admin/sms/sender-ids/${payload.id}`, payload);
  }

  /**
   * SMS
   */
  getSMSMessages(options) {
    return ApiService.get(
      `/v1/admin/sms/reports?page=${options.current_page}&page_size=${options.page_size}&search_text=${options.search_text}&sort_column=${options.sort.column}&sort_direction=${options.sort.direction}`
    );
  }
}
export default new SmsService();
