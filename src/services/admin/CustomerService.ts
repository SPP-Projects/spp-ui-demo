import ApiService from "@/core/services/ApiService";

class CustomerService {
  /**
   * Customers
   */
  getAllCustomers(options) {
    return ApiService.get(
      `/v1/admin/customers?page=${options.current_page}&page_size=${options.page_size}&search_text=${options.search_text}&sort_column=${options.sort.column}&sort_direction=${options.sort.direction}`
    );
  }
  getSingleCustomer(id) {
    return ApiService.get(`/v1/admin/customers/${id}`);
  }
  updateCustomer(payload) {
    return ApiService.patch(`/v1/admin/customers/${payload.id}`, payload);
  }

  /**
   * Customer KYC
   */
  getKYCDetails(id) {
    return ApiService.get(`/v1/admin/customer-kyc-details/${id}`);
  }
  updateKYCDetails(id, payload) {
    console.log("id", id);

    return ApiService.post(
      `/v1/admin/customer-kyc-details/${id}?_method=PATCH`,
      payload
    );
  }

  /**
   * Customer Users
   */
  getCustomerUserOptions(customer_id, user_id) {
    return ApiService.get(
      `/v1/admin/customers/${customer_id}/user/${user_id}/options`
    );
  }
  getCustomerUsers(options) {
    return ApiService.get(
      `/v1/admin/customers/${options.customer_id}/users?page=${options.current_page}&page_size=${options.page_size}&search_text=${options.search_text}&sort_column=${options.sort.column}&sort_direction=${options.sort.direction}`
    );
  }
  getCustomerUser(payload) {
    return ApiService.get(
      `/v1/admin/customers/${payload.customer_id}/users/${payload.user_id}`
    );
  }
  updateCustomerUser(payload) {
    // payload.customer_id,
    //     payload.user_id,
    //     payload.request
    return ApiService.post(
      `/v1/admin/customers/${payload.customer_id}/users/${payload.user_id}?_method=PATCH`,
      payload.request
    );
  }
  addCustomerUser(payload) {
    return ApiService.post(
      `/v1/admin/customers/${payload.customer_id}/users`,
      payload
    );
  }

  /**
   * Customer Permissions
   */
  getCustomerPermissions(customer_id) {
    return ApiService.get(`/v1/admin/customers/${customer_id}/permissions`);
  }
  updateCustomerPermissions(payload) {
    console.log(payload.request);
    console.log(payload.customer_id);
    return ApiService.post(
      `/v1/admin/customers/${payload.customer_id}/permissions`,
      payload.request
    );
  }

  /**
   * Customer Groups
   */
  getCustomerGroups(options) {
    return ApiService.get(
      `/v1/admin/customer-groups?page=${options.current_page}&page_size=${options.page_size}&search_text=${options.search_text}&sort_column=${options.sort.column}&sort_direction=${options.sort.direction}`
    );
  }
  getSingleCustomerGroup(id) {
    return ApiService.get(`/customer-groups/${id}`);
  }
  updateCustomerGroup(payload) {
    return ApiService.patch(`/v1/admin/customer-groups/${payload.id}`, payload);
  }

  /**
   * Customer Types
   */
  getCustomerTypes(options) {
    return ApiService.get(
      `/v1/admin/customer-types?page=${options.current_page}&page_size=${options.page_size}&search_text=${options.search_text}&sort_column=${options.sort.column}&sort_direction=${options.sort.direction}`
    );
  }
  getSingleCustomerType(id) {
    return ApiService.get(`/v1/admin/customer-types/${id}`);
  }
  updateCustomerType(payload) {
    console.log(payload);
    return ApiService.patch(`/v1/admin/customer-types/${payload.id}`, payload);
  }
}

export default new CustomerService();
