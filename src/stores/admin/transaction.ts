import { defineStore } from "pinia";
import TransactionService from "@/services/admin/TransactionService";
import { getError } from "@/helpers/errors";

export const useAdminTransactionStore = defineStore("adminTransactionStore", {
  state: () => ({
    //transactions
    transactions: [],
    transaction: {},

    //transaction types
    transactionTypes: [],
    transactionType: {},
    transaction_charges: [],
    charge: {},

    //transaction groups
    transactionGroups: [],

    //transaction mapping
    transactionTypeAccountMappings: [],
    transactionTypeAccountMapping: {},

    //transaction options
    transactionOptions: [],

    //transaction charnges
    transactionChargeSettings: [],
    transactionChargeSetting: {},
    transactionChargeSettingOptions: [],

    //transaction commissions
    transactionCommissionSettings: [],
    transactionCommissionSetting: {},

    //shared
    loadingMappingData: false,
    error: null,
    unauthorized: false,
    loadingTransactionData: false,
    meta: { total: 0, from: 0, to: 0, last_page: 0 },
  }),
  actions: {
    getTransactions(options) {
      return new Promise((resolve, reject) => {
        this.loadingTransactionData = true;
        TransactionService.getAllTransactions(options)
          .then(({ data }) => {
            this.transactions = data.data;

            this.meta.total = data.total;
            this.meta.from = data.from;
            this.meta.to = data.to;
            this.meta.last_page = data.last_page;
            resolve(data);
          })
          .catch((error) => {
            if (error.response.status === 403) {
              // unauthorized.
              this.unauthorized = true;
            }

            this.transactions = [];
            this.loadingTransactionData = false;
            this.error = getError(error);
            reject(error);
          })
          .finally(() => {
            this.loadingTransactionData = false;
          });
      });
    },

    getSingleTransaction({ commit }, id) {
      return new Promise((resolve, reject) => {
        commit("SET_LOADING", true);
        TransactionService.getSingleTransaction(id)
          .then((response) => {
            commit("SET_TRANSACTION", response.data.data);

            commit("SET_LOADING", false);
            resolve(response);
          })
          .catch((err) => {
            commit("SET_LOADING", false);
            commit("SET_ERROR", getError(err));
            reject(err);
          });
      });
    },

    /********** TRANSACTION TYPES  ********/
    getTransactionTypes(options) {
      return new Promise((resolve, reject) => {
        this.loadingTransactionData = true;
        TransactionService.getTransactionTypes(options)
          .then(({ data }) => {
            this.transactionTypes = data.data;
            console.log(data.data);
            this.meta.total = data.total;
            this.meta.from = data.from;
            this.meta.to = data.to;
            this.meta.last_page = data.last_page;
            resolve(data);
          })
          .catch((error) => {
            if (error.response.status === 403) {
              // unauthorized.
              this.unauthorized = true;
            }

            this.loadingTransactionData = false;
            this.error = getError(error);
            reject(error);
          })
          .finally(() => {
            this.loadingTransactionData = false;
          });
      });
    },

    // eslint-disable-next-line no-unused-vars
    updateTransactionType({ commit }, options) {
      return new Promise((resolve, reject) => {
        TransactionService.updateTransactionType(options)
          .then(({ data }) => {
            resolve(data);
          })
          .catch((err) => {
            reject(err);
          })
          .finally();
      });
    },

    // eslint-disable-next-line no-unused-vars
    addTransactionType({ commit }, options) {
      return new Promise((resolve, reject) => {
        TransactionService.addTransactionType(options)
          .then(({ data }) => {
            resolve(data);
          })
          .catch((err) => {
            reject(err);
          })
          .finally();
      });
    },

    /************ TRANSACTIONAL CHARGES *******/
    getTransactionCharges({ commit }, options) {
      return new Promise((resolve, reject) => {
        commit("SET_LOADING", true);
        TransactionService.getAllTransactionalCharges(options)
          .then(({ data }) => {
            commit("SET_TRANSACTIONS_CHARGES", data.data);
            resolve(data);
          })
          .catch((err) => {
            commit("SET_ERROR", getError(err));
            reject(err);
          })
          .finally(() => commit("SET_LOADING", false));
      });
    },

    getSingleTransactionCharge({ commit }, id) {
      return new Promise((resolve, reject) => {
        commit("SET_LOADING", true);
        TransactionService.getSingleTransactionCharge(id)
          .then((response) => {
            commit("SET_TRANSACTION_CHARGE", response.data.data);

            commit("SET_LOADING", false);
            resolve(response);
          })
          .catch((err) => {
            commit("SET_LOADING", false);
            commit("SET_ERROR", getError(err));
            reject(err);
          });
      });
    },

    addTransactionCharge({ commit }, payload) {
      return new Promise((resolve, reject) => {
        commit("SET_LOADING", true);
        TransactionService.addTransactionCharge(payload)
          .then((response) => {
            commit("ADD_TRANSACTION_CHARGES", response);
            resolve(response);
          })
          .catch((err) => {
            commit("SET_ERROR", getError(err));
            reject(err);
          })
          .finally(() => commit("SET_LOADING", false));
      });
    },

    // eslint-disable-next-line no-unused-vars
    updateTransactionCharge({ commit }, payload) {
      return new Promise((resolve, reject) => {
        TransactionService.updateTransactionCharge(payload)
          .then(({ data }) => {
            resolve(data);
          })
          .catch((err) => {
            reject(err);
          })
          .finally();
      });
    },

    // eslint-disable-next-line no-unused-vars
    updateTransactionChargeCommissionSplits({ commit }, payload) {
      return new Promise((resolve, reject) => {
        TransactionService.updateTransactionChargeCommissionSplits(payload)
          .then(({ data }) => {
            resolve(data);
          })
          .catch((err) => {
            reject(err);
          })
          .finally();
      });
    },

    getTransactionChargeOptions() {
      return new Promise((resolve, reject) => {
        TransactionService.getTransactionChargeOptions()
          .then(({ data }) => {
            this.transactionOptions = data;
            console.log(data);
            resolve(data);
          })
          .catch((err) => {
            reject(err);
          })
          .finally();
      });
    },

    /**
     * TransactionTypeAccountsMapping
     */
    getTransactionTypeAccountsMappings(options) {
      return new Promise((resolve, reject) => {
        this.loadingMappingData = true;
        TransactionService.getTransactionTypeAccountsMappings(options)
          .then(({ data }) => {
            this.transactionTypeAccountMappings = data.data;

            this.meta.total = data.total;
            this.meta.from = data.from;
            this.meta.to = data.to;
            this.meta.last_page = data.last_page;
            resolve(data);
          })
          .catch((error) => {
            if (error.response.status === 403) {
              this.unauthorized = true;
            }

            this.loadingMappingData = false;
            this.error = getError(error);
            reject(error);
          })
          .finally(() => {
            this.loadingMappingData = false;
          });
      });
    },
    getTransactionTypeAccountsMapping(id) {
      return new Promise((resolve, reject) => {
        this.loadingMappingData = true;
        TransactionService.getTransactionTypeAccountsMapping(id)
          .then(({ data }) => {
            this.transactionTypeAccountMapping = data;
            resolve(data);
          })
          .catch((error) => {
            if (error.response.status === 403) {
              this.unauthorized = true;
            }

            this.loadingMappingData = false;
            this.error = getError(error);
            reject(error);
          })
          .finally(() => {
            this.loadingMappingData = false;
          });
      });
    },
    addTransactionTypeAccountsMapping(payload) {
      return new Promise((resolve, reject) => {
        this.loadingMappingData = true;
        TransactionService.addTransactionTypeAccountsMapping(payload)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            if (error.response.status === 403) {
              this.unauthorized = true;
            }

            this.loadingMappingData = false;
            this.error = getError(error);
            reject(error);
          })
          .finally(() => {
            this.loadingMappingData = false;
          });
      });
    },
    updateTransactionTypeAccountsMapping(payload) {
      return new Promise((resolve, reject) => {
        TransactionService.updateTransactionTypeAccountsMapping(payload)
          .then(({ data }) => {
            this.transactionTypeAccountMapping = data;
            resolve(data);
          })
          .catch((error) => {
            if (error.response.status === 403) {
              this.unauthorized = true;
            }
            this.loadingMappingData = false;
            this.error = getError(error);
            reject(error);
          })
          .finally();
      });
    },

    /**
     * Transaction Charge Settings
     */
    getTransactionChargeSettings(options) {
      return new Promise((resolve, reject) => {
        this.loadingTransactionData = true;
        TransactionService.getTransactionChargeSettings(options)
          .then(({ data }) => {
            this.transactionChargeSettings = data.data;
            this.meta.total = data.total;
            this.meta.from = data.from;
            this.meta.to = data.to;
            this.meta.last_page = data.last_page;
            resolve(data);
          })
          .catch((error) => {
            if (error.response.status === 403) {
              // unauthorized.
              this.unauthorized = true;
            }

            this.loadingTransactionData = false;
            this.error = getError(error);
            reject(error);
          })
          .finally(() => {
            this.loadingTransactionData = false;
          });
      });
    },
    getTransactionChargeSetting(options) {
      return new Promise((resolve, reject) => {
        this.loadingTransactionData = true;
        TransactionService.getTransactionChargeSetting(options)
          .then(({ data }) => {
            this.transactionChargeSetting = data.data;

            resolve(data);
          })
          .catch((error) => {
            if (error.response.status === 403) {
              // unauthorized.
              this.unauthorized = true;
            }

            this.loadingTransactionData = false;
            this.error = getError(error);
            reject(error);
          })
          .finally(() => {
            this.loadingTransactionData = false;
          });
      });
    },
    getTransactionChargeSettingOptions() {
      return new Promise((resolve, reject) => {
        // commit("SET_LOADING", true);
        TransactionService.getTransactionChargeSettingOptions()
          .then(({ data }) => {
            this.transactionChargeSettingOptions = data;
            resolve(data);
          })
          .catch((error) => {
            if (error.response.status === 403) {
              // unauthorized.
              this.unauthorized = true;
            }

            this.loadingTransactionData = false;
            this.error = getError(error);
            reject(error);
          })
          .finally(() => {
            this.loadingTransactionData = false;
          });
      });
    },
    addTransactionChargeSetting(payload) {
      return new Promise((resolve, reject) => {
        this.loadingTransactionData = true;
        TransactionService.addTransactionChargeSetting(payload)
          .then((response) => {
            //    commit("ADD_KYC_SETTING", response);
            //    commit("SET_LOADING", false);
            resolve(response);
          })
          .catch((error) => {
            if (error.response.status === 403) {
              // unauthorized.
              this.unauthorized = true;
            }

            this.loadingTransactionData = false;
            this.error = getError(error);
            reject(error);
          })
          .finally(() => {
            this.loadingTransactionData = false;
          });
      });
    },
    updateTransactionChargeSetting(payload) {
      return new Promise((resolve, reject) => {
        //    commit("SET_LOADING", true);
        TransactionService.updateTransactionChargeSetting(payload)
          .then((response) => {
            //     commit("SET_LOADING", false);
            resolve(response);
          })
          .catch((error) => {
            if (error.response.status === 403) {
              // unauthorized.
              this.unauthorized = true;
            }

            this.loadingTransactionData = false;
            this.error = getError(error);
            reject(error);
          })
          .finally(() => {
            this.loadingTransactionData = false;
          });
      });
    },
    deleteTransactionChargeSetting(payload) {
      return new Promise((resolve, reject) => {
        //   commit("SET_LOADING", true);
        TransactionService.deleteTransactionChargeSetting(payload)
          .then((response) => {
            //      commit("SET_LOADING", false);
            resolve(response);
          })
          .catch((error) => {
            if (error.response.status === 403) {
              // unauthorized.
              this.unauthorized = true;
            }

            this.loadingTransactionData = false;
            this.error = getError(error);
            reject(error);
          })
          .finally(() => {
            this.loadingTransactionData = false;
          });
      });
    },

    /**
     * Transaction Commission Settings
     */
    getTransactionCommissionSettings(options) {
      return new Promise((resolve, reject) => {
        this.loadingTransactionData = true;
        TransactionService.getTransactionCommissionSettings(options)
          .then(({ data }) => {
            this.transactionCommissionSettings = data.data;
            this.meta.total = data.total;
            this.meta.from = data.from;
            this.meta.to = data.to;
            this.meta.last_page = data.last_page;
            resolve(data);
          })
          .catch((error) => {
            if (error.response.status === 403) {
              // unauthorized.
              this.unauthorized = true;
            }

            this.loadingTransactionData = false;
            this.error = getError(error);
            reject(error);
          })
          .finally(() => {
            this.loadingTransactionData = false;
          });
      });
    },
    getTransactionCommissionSetting(options) {
      return new Promise((resolve, reject) => {
        this.loadingTransactionData = true;
        TransactionService.getTransactionCommissionSetting(options)
          .then(({ data }) => {
            this.transactionCommissionSetting = data.data;

            resolve(data);
          })
          .catch((error) => {
            if (error.response.status === 403) {
              // unauthorized.
              this.unauthorized = true;
            }

            this.loadingTransactionData = false;
            this.error = getError(error);
            reject(error);
          })
          .finally(() => {
            this.loadingTransactionData = false;
          });
      });
    },

    addTransactionCommissionSetting(payload) {
      return new Promise((resolve, reject) => {
        this.loadingTransactionData = true;
        TransactionService.addTransactionCommissionSetting(payload)
          .then((response) => {
            //    commit("ADD_KYC_SETTING", response);
            //    commit("SET_LOADING", false);
            resolve(response);
          })
          .catch((error) => {
            if (error.response.status === 403) {
              // unauthorized.
              this.unauthorized = true;
            }

            this.loadingTransactionData = false;
            this.error = getError(error);
            reject(error);
          })
          .finally(() => {
            this.loadingTransactionData = false;
          });
      });
    },
    updateTransactionCommissionSetting(payload) {
      return new Promise((resolve, reject) => {
        //    commit("SET_LOADING", true);
        TransactionService.updateTransactionCommissionSetting(payload)
          .then((response) => {
            //     commit("SET_LOADING", false);
            resolve(response);
          })
          .catch((error) => {
            if (error.response.status === 403) {
              // unauthorized.
              this.unauthorized = true;
            }

            this.loadingTransactionData = false;
            this.error = getError(error);
            reject(error);
          })
          .finally(() => {
            this.loadingTransactionData = false;
          });
      });
    },
    deleteTransactionCommissionSetting(payload) {
      return new Promise((resolve, reject) => {
        //   commit("SET_LOADING", true);
        TransactionService.deleteTransactionCommissionSetting(payload)
          .then((response) => {
            //      commit("SET_LOADING", false);
            resolve(response);
          })
          .catch((error) => {
            if (error.response.status === 403) {
              // unauthorized.
              this.unauthorized = true;
            }

            this.loadingTransactionData = false;
            this.error = getError(error);
            reject(error);
          })
          .finally(() => {
            this.loadingTransactionData = false;
          });
      });
    },
  },
  getters: {
    // loading: (state) => state.loading,
    // error: (state) => state.error,
    // transactions: (state) => state.transactions,
    // transaction: (state) => state.transaction,
    // transactionType: (state) => state.transactionType,
    // transactionTypes: (state) => state.transactionTypes,
  },
});
