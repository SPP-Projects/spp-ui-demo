import ApiService from "@/core/services/ApiService";

class AccountService {
  /**
   * Accounts
   */
  getAllAccounts(options) {
    return ApiService.get(
      `/v1/admin/accounts?page=${options.current_page}&page_size=${options.page_size}&search_text=${options.search_text}&sort_column=${options.sort.column}&sort_direction=${options.sort.direction}`
    );
  }
  getSingleAccount(id) {
    return ApiService.get(`/v1/admin/accounts/${id}`);
  }
  getAccountOptions() {
    return ApiService.get(`/v1/admin/accounts/options`);
  }
  updateAccount(options) {
    return ApiService.patch(`/v1/admin/accounts/${options.id}`, options);
  }
  addAccount(options) {
    return ApiService.post(`/v1/admin/accounts`, options);
  }

  /**
   * Account Groups
   */
  getAccountGroups(options) {
    return ApiService.get(
      `/v1/admin/account-groups?page=${options.current_page}&page_size=${options.page_size}&search_text=${options.search_text}&sort_column=${options.sort.column}&sort_direction=${options.sort.direction}`
    );
  }
  getSingleAccountGroup(id) {
    return ApiService.get(`/v1/admin/account-groups/${id}`);
  }
  updateAccountGroup(options) {
    return ApiService.patch(`/v1/admin/account-groups/${options.id}`, options);
  }
  addAccountGroup(options) {
    return ApiService.post(`/v1/admin/account-groups`, options);
  }

  /**
   * Account Types
   */
  getAccountTypes(options) {
    return ApiService.get(
      `/v1/admin/account-types?page=${options.current_page}&page_size=${options.page_size}&search_text=${options.search_text}&sort_column=${options.sort.column}&sort_direction=${options.sort.direction}`
    );
  }
  getSingleAccountType(id) {
    return ApiService.get(`/v1/admin/account-types/${id}`);
  }
  updateAccountType(options) {
    return ApiService.patch(`/v1/admin/account-types/${options.id}`, options);
  }
  addAccountType(options) {
    console.log(options);
    return ApiService.post(`/v1/admin/account-types`, options);
  }

  /**
   * Account Limits
   */
  getAccountLimits(options) {
    return ApiService.get(
      `/v1/admin/account-limits?page=${options.current_page}&page_size=${options.page_size}&search_text=${options.search_text}&sort_column=${options.sort.column}&sort_direction=${options.sort.direction}`
    );
  }
  getSingleAccountLimit(id) {
    return ApiService.get(`/v1/account-limits/${id}`);
  }
  updateAccountLimit(options) {
    return ApiService.patch(`/v1/admin/account-limits/${options.id}`, options);
  }
  addAccountLimit(options) {
    return ApiService.post(`/v1/admin/account-limits`, options);
  }
  getAccountLimitOptions() {
    return ApiService.get(`/v1/admin/account-limits/options`);
  }
}

export default new AccountService();
