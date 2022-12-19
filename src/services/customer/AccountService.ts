import ApiService from "@/core/services/ApiService";

class AccountService {
  getAccounts(options) {
    return ApiService.get(
      `/v1/accounts?page=${options.current_page}&page_size=${options.page_size}&search_text=${options.search_text}&sort_column=${options.sort.column}&sort_direction=${options.sort.direction}`
    );
  }
  getAccount(account_no) {
    return ApiService.get(`/v1/account/${account_no}`);
  }
  getAccountsCount(data) {
    return ApiService.post(`/v1/accounts/count`, data);
  }
  validateAccount(data) {
    return ApiService.post("/v1/account/validate", data);
  }
}

export default new AccountService();
