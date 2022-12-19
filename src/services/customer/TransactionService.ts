import ApiService from "@/core/services/ApiService";

class TransactionService {
  getAllTransactions(options) {
    const url_account_section = options.account ? `/${options.account}` : ``;
    return ApiService.get(
      `/v1/transactions` +
        url_account_section +
        `?page=${options.current_page}&page_size=${options.page_size}&search_text=${options.search_text}&sort_column=${options.sort.column}&sort_direction=${options.sort.direction}`
    );
  }

  getTransactionByReference(ref) {
    return ApiService.get(`/v1/transaction/${ref}`);
  }

  getTransactionStatuses() {
    return ApiService.get(`/v1/transaction/statuses`);
  }

  getTransactionsValue(payload) {
    return ApiService.post(`/v1/transactions/value`, payload);
  }

  getTransactionsCount(payload) {
    return ApiService.post(`/v1/transactions/count`, payload);
  }

  submitTransaction(payload) {
    return ApiService.post(`/v1/transaction/submit`, payload);
  }

  validateTransaction(payload) {
    return ApiService.post(`/v1/transaction/validate`, payload);
  }
}

export default new TransactionService();
