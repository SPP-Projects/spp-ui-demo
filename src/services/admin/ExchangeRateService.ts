import ApiService from "@/core/services/ApiService";

class ExchangeRateService {
  getExchangeRates(options) {
    return ApiService.get(
      `/v1/admin/exchange-rates?page=${options.current_page}&page_size=${options.page_size}&search_text=${options.search_text}&sort_column=${options.sort.column}&sort_direction=${options.sort.direction}`
    );
  }

  getExchangeRate(id) {
    return ApiService.get(`/v1/admin/exchange-rates/${id}`);
  }

  addExchangeRate(payload) {
    return ApiService.post(`/v1/admin/exchange-rates`, payload);
  }

  updateExchangeRate(options) {
    return ApiService.patch(`/v1/admin/exchange-rates/${options.id}`, options);
  }
}

export default new ExchangeRateService();
