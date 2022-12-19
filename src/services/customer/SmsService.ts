import ApiService from "@/core/services/ApiService";

class SmsService {
  getSMSReports(options) {
    return ApiService.get(
      `/v1/sms/reports?page=${options.current_page}&page_size=${options.page_size}&search_text=${options.search_text}&sort_column=${options.sort.column}&sort_direction=${options.sort.direction}`
    );
  }

  getSenderIDs(options) {
    return ApiService.get(
      `/v1/sms/sender-ids?page=${options.current_page}&page_size=${options.page_size}&search_text=${options.search_text}&sort_column=${options.sort.column}&sort_direction=${options.sort.direction}`
    );
  }

  addSenderID(payload) {
    return ApiService.post(`/v1/sms/sender-ids`, payload);
  }
}

export default new SmsService();
