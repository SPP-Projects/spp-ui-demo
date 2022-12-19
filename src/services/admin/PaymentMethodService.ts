import ApiService from "@/core/services/ApiService";

class PaymentMethodService {
  getPaymentMethods(options) {
    return ApiService.get(
      `/v1/admin/payment-methods?page=${options.current_page}&page_size=${options.page_size}&search_text=${options.search_text}&sort_column=${options.sort.column}&sort_direction=${options.sort.direction}`
    );
  }

  getPaymentMethod(id) {
    return ApiService.get(`/v1/admin/payment-methods/${id}`);
  }

  addPaymentMethod(payload) {
    return ApiService.post(`/v1/admin/payment-methods`, payload);
  }

  updatePaymentMethod(options) {
    return ApiService.patch(`/v1/admin/payment-methods/${options.id}`, options);
  }
}

export default new PaymentMethodService();
