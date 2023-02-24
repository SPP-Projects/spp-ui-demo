import ApiService from "@/core/services/ApiService";

class RemittanceService {
  getRemittances(options) {
    const url_account_section = options.account ? `/${options.account}` : ``;

    return ApiService.get(
      `/v1/transactions` +
        url_account_section +
        `?page=${options.current_page}&page_size=${options.page_size}&amount_or_reference=${options.amount_or_reference}` +
        `&sort_column=${options.sort.column}&sort_direction=${options.sort.direction}&type_code=${options.type_code}` +
        `&status_id=${options.status_id}&date=${options.date}&account_no=${options.account_no}`
    );
  }
  getRemittance(ref) {
    return ApiService.get(`http://localhost/api/remittance/transaction/${ref}`);
  }
  validateRemittance(payload) {
    return ApiService.post(`/v1/transaction/validate`, payload);
  }
  confirmRemittance(payload) {
    return ApiService.post(`/v1/transaction/submit`, payload);
  }
  getExchangeRates() {
    return ApiService.get(`/v1/exchange-rates`);
  }
  getExchangeRate(payload) {
    return ApiService.get(
      `/v1/exchange-rate/?base_currency_code=${payload.base_currency_code}&quote_currency_code=${payload.quote_currency_code}`
    );
  }
}

export default new RemittanceService();
