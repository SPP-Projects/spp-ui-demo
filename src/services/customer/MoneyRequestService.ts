import ApiService from "@/core/services/ApiService";
class MoneyRequestService {
  getAllMoneyRequests(options) {
    return ApiService.get(
      `/v1/money-requests/records?page=${options.current_page}&page_size=${options.page_size}&search_text=${options.search_text}&sort_column=${options.sort.column}&sort_direction=${options.sort.direction}`
    );
  }

  getMoneyRequestByReference(ref) {
    return ApiService.get(`/v1/money-requests/${ref}`);
  }

  addMoneyRequest(payload) {
    return ApiService.post(`/v1/money-requests/add`, payload);
  }

  updateMoneyRequest(options, reference) {
    return ApiService.post(`/v1/money-requests/${reference}`, options);
  }

  payMoneyRequest(options, reference) {
    return ApiService.post(`/v1/money-requests/${reference}/pay`, options);
  }
}
export default new MoneyRequestService();
