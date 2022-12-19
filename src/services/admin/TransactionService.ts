import ApiService from "@/core/services/ApiService";

class TransactionService {
  /**
   * Transactions
   */
  getAllTransactions(options) {
    return ApiService.get(
      `/v1/admin/transactions?page=${options.current_page}&page_size=${options.page_size}&search_text=${options.search_text}&sort_column=${options.sort.column}&sort_direction=${options.sort.direction}`
    );
  }
  getSingleTransaction(id) {
    return ApiService.get(`/v1/admin/transactions/${id}`);
  }

  /**
   * Transaction Types
   */
  getTransactionTypes(options) {
    return ApiService.get(
      `/v1/admin/transaction-types?page=${options.current_page}&page_size=${options.page_size}&search_text=${options.search_text}&sort_column=${options.sort.column}&sort_direction=${options.sort.direction}`
    );
  }
  updateTransactionType(options) {
    return ApiService.patch(
      `/v1/admin/transaction-types/${options.id}`,
      options
    );
  }
  addTransactionType(options) {
    return ApiService.post(`/v1/admin/transaction-types`, options);
  }

  /**
   * Transaction Charges
   */
  getAllTransactionalCharges(options) {
    return ApiService.get(
      `/v1/admin/transaction-charge-settings?page=${options.current_page}&page_size=${options.page_size}&search_text=${options.search_text}&sort_column=${options.sort.column}&sort_direction=${options.sort.direction}`
    );
  }
  getSingleTransactionCharge(id) {
    return ApiService.get(`/v1/admin/transaction-charge-settings/${id}`);
  }
  addTransactionCharge(options) {
    return ApiService.post(`/v1/admin/transaction-charge-settings`, options);
  }
  updateTransactionCharge(options) {
    return ApiService.patch(
      `/v1/admin/transaction-charge-settings/${options.id}`,
      options
    );
  }
  getTransactionChargeOptions() {
    return ApiService.get(`/v1/admin/transaction-charge-settings/options`);
  }

  /**
   * Transaction Charges
   */
  updateTransactionChargeCommissionSplits(payload) {
    return ApiService.patch(
      `/v1/admin/transaction-commission-settings/${payload.charge_setting_id}`,
      payload
    );
  }

  /**
   * TransactionTypeAccountsMapping
   */
  getTransactionTypeAccountsMappings(options) {
    return ApiService.get(
      `/v1/admin/transaction-type-accounts-maps?page=${options.current_page}&page_size=${options.page_size}&search_text=${options.search_text}&sort_column=${options.sort.column}&sort_direction=${options.sort.direction}`
    );
  }

  getTransactionTypeAccountsMapping(id) {
    return ApiService.get(`/v1/admin/transaction-type-accounts-maps/${id}`);
  }

  addTransactionTypeAccountsMapping(payload) {
    return ApiService.post(`/v1/admin/transaction-type-accounts-maps`, payload);
  }

  updateTransactionTypeAccountsMapping(options) {
    return ApiService.patch(
      `/v1/admin/transaction-type-accounts-maps/${options.id}`,
      options
    );
  }

  /**
   * Transaction Charge Settings
   */
  getTransactionChargeSettings(options) {
    return ApiService.get(
      `/v1/admin/transaction-charge-settings?page=${options.current_page}&page_size=${options.page_size}&search_text=${options.search_text}&sort_column=${options.sort.column}&sort_direction=${options.sort.direction}`
    );
  }
  getTransactionChargeSetting(id) {
    return ApiService.get(`/v1/admin/transaction-charge-settings/${id}`);
  }
  addTransactionChargeSetting(payload) {
    return ApiService.post(`/v1/admin/transaction-charge-settings`, payload);
  }
  getTransactionChargeSettingOptions() {
    return ApiService.get(`/v1/admin/transaction-charge-settings/options`);
  }
  updateTransactionChargeSetting(payload) {
    return ApiService.patch(
      `/v1/admin/transaction-charge-settings/${payload.id}`,
      payload
    );
  }
  deleteTransactionChargeSetting(setting_id) {
    return ApiService.delete(
      `/v1/admin/transaction-charge-settings/${setting_id}`
    );
  }

  /**
   * Transaction Commission Settings
   */
  getTransactionCommissionSettings(options) {
    return ApiService.get(
      `/v1/admin/transaction-commission-settings?page=${options.current_page}&page_size=${options.page_size}&search_text=${options.search_text}&sort_column=${options.sort.column}&sort_direction=${options.sort.direction}`
    );
  }
  getTransactionCommissionSetting(id) {
    return ApiService.get(`/v1/admin/transaction-commission-settings/${id}`);
  }
  addTransactionCommissionSetting(payload) {
    return ApiService.post(
      `/v1/admin/transaction-commission-settings`,
      payload
    );
  }

  updateTransactionCommissionSetting(payload) {
    return ApiService.patch(
      `/v1/admin/transaction-commission-settings/${payload.id}`,
      payload
    );
  }
  deleteTransactionCommissionSetting(setting_id) {
    return ApiService.delete(
      `/v1/admin/transaction-commission-settings/${setting_id}`
    );
  }
}

export default new TransactionService();
