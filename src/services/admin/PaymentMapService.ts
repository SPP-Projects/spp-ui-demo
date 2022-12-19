import ApiService from "@/core/services/ApiService";

class PaymentMapService {
  //TODO - MOVE TO PAYMENT METHODS?
  getAllPaymentMap(options) {
    return ApiService.get(
      `/v1/admin/institution-payment-method-maps?page=${options.current_page}&page_size=${options.page_size}&search_text=${options.search_text}&sort_column=${options.sort.column}&sort_direction=${options.sort.direction}`
    );
  }

  getSinglePaymnetMap(id) {
    return ApiService.get(`/v1/admin/institution-payment-method-maps/${id}`);
  }

  getPaymnetMapOptions() {
    return ApiService.get(`/v1/admin/institution-payment-method-maps/options`);
  }

  addPaymentMap(payload) {
    return ApiService.post(
      `/v1/admin/institution-payment-method-maps`,
      payload
    );
  }

  updatePaymentMap(options) {
    return ApiService.patch(
      `/v1/admin/institution-payment-method-maps/${options.id}`,
      options
    );
  }
}

export default new PaymentMapService();
