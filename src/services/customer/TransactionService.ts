import ApiService from "@/core/services/ApiService";

class TransactionService {
  getAllTransactions(options) {
    const url_account_section = options.account ? `/${options.account}` : ``;

    console.log(options.date);
    return ApiService.get(
      `/v1/transactions` +
        url_account_section +
        `?page=${options.current_page}&page_size=${options.page_size}&amount_or_reference=${options.amount_or_reference}&sort_column=${options.sort.column}&sort_direction=${options.sort.direction}&type_code=${options.type_code}&status_id=${options.status_id}&date=${options.date}&account_no=${options.account_no}`
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

  //TODO - MOVE TO COMMON PLACE
  getInstitutions(data) {
    return ApiService.post("/v1/institutions", data);
  }
}

export default new TransactionService();
