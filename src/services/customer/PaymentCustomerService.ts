import ApiService from "@/core/services/ApiService";

class PaymentCustomerService {
  getPaymentCustomers(options) {
    return ApiService.get(
      `/v1/payment-customers` +
        `?page=${options.current_page}&page_size=${options.page_size}&search_text=${options.search_text}` +
        `&sort_column=${options.sort.column}&sort_direction=${options.sort.direction}`
    );
  }

  getPaymentCustomer(options) {
    return ApiService.get(
      `/v1/payment-customers/${options.id}` +
        `?page=${options.current_page}&page_size=${options.page_size}&search_text=${options.search_text}` +
        `&sort_column=${options.sort.column}&sort_direction=${options.sort.direction}`
    );
  }

  updatePaymentCustomer(payload) {
    return ApiService.post(`/v1/payment-customers/${payload.id}`, payload);
  }
}

export default new PaymentCustomerService();
