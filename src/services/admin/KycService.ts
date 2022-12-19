import ApiService from "@/core/services/ApiService";

class KycService {
  /**
   * KYC Requirements
   */
  getAllKYCSettings(options) {
    return ApiService.get(
      `/v1/admin/kyc-requirements?page=${options.current_page}&page_size=${options.page_size}&search_text=${options.search_text}&sort_column=${options.sort.column}&sort_direction=${options.sort.direction}`
    );
  }
  getKYCSetting(id) {
    return ApiService.get(`/v1/admin/kyc-requirements/${id}`);
  }
  addKYCSetting(payload) {
    return ApiService.post(`/v1/admin/kyc-requirements`, payload);
  }
  getRequirementOptions() {
    return ApiService.get(`/v1/admin/kyc-requirements/options`);
  }
  editKYCSetting(payload) {
    return ApiService.patch(
      `/v1/admin/kyc-requirements/${payload.id}`,
      payload
    );
  }

  //TODO - MOVE TO ACCOUNT?
  /**
   * Account KYC Requirements
   */
  getAccountTypeKYCSettings(options) {
    return ApiService.get(
      `/v1/admin/account-kyc-requirements?page=${options.current_page}&page_size=${options.page_size}&search_text=${options.search_text}&sort_column=${options.sort.column}&sort_direction=${options.sort.direction}`
    );
  }
  getAccountTypeKYCRequirementOptions() {
    return ApiService.get(`/v1/admin/account-kyc-requirements/options`);
  }
  addAccountTypeKYCSetting(payload) {
    return ApiService.post(`/v1/admin/account-kyc-requirements`, payload);
  }
  updateAccountTypeKYCSetting(payload) {
    return ApiService.patch(
      `/v1/admin/account-kyc-requirements/${payload.id}`,
      payload
    );
  }
  deleteAccountTypeKYCSetting(setting_id) {
    return ApiService.delete(
      `/v1/admin/account-kyc-requirements/${setting_id}`
    );
  }

  //TODO - MOVE TO customer?
  /**
   * Customer KYC Requirements
   */
  getCustomerTypeKYCSettings(options) {
    return ApiService.get(
      `/v1/admin/customer-kyc-requirements?page=${options.current_page}&page_size=${options.page_size}&search_text=${options.search_text}&sort_column=${options.sort.column}&sort_direction=${options.sort.direction}`
    );
  }
  addCustomerTypeKYCSetting(payload) {
    return ApiService.post(`/v1/admin/customer-kyc-requirements`, payload);
  }
  getCustomerTypeKYCRequirementOptions() {
    return ApiService.get(`/v1/admin/customer-kyc-requirements/options`);
  }
  updateCustomerTypeKYCSetting(payload) {
    return ApiService.patch(
      `/v1/admin/customer-kyc-requirements/${payload.id}`,
      payload
    );
  }
  deleteCustomerTypeKYCSetting(setting_id) {
    return ApiService.delete(
      `/v1/admin/customer-kyc-requirements/${setting_id}`
    );
  }
}

export default new KycService();
