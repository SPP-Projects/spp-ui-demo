import ApiService from "@/core/services/ApiService";

class TransactionBatchService {
  getAllTransactionBatches(options) {
    return ApiService.get(
      `/v1/transaction-batch/records?page=${options.current_page}&page_size=${options.page_size}&search_text=${options.search_text}&sort_column=${options.sort.column}&sort_direction=${options.sort.direction}`
    );
  }

  getTransactionBatch(options) {
    return ApiService.get(
      `/v1/transaction-batch/${options.reference}/items?page=${options.current_page}&page_size=${options.page_size}&search_text=${options.search_text}&sort_column=${options.sort.column}&sort_direction=${options.sort.direction}`
    );
  }

  processTransactionBatch(reference) {
    return ApiService.get(`/v1/transaction-batch/${reference}/process`);
  }

  submitTransactionBatch(payload) {
    return ApiService.post(`/v1/transaction-batch`, payload);
  }
}

export default new TransactionBatchService();
