import { defineStore } from "pinia";
import { getError } from "@/helpers/errors";
import AccountService from "@/services/admin/AccountService";

export const useAdminAccountStore = defineStore("adminAccountStore", {
  state: () => ({
    //accounts
    accounts: [],
    account: {},

    //options
    accountOptions: [],
    accountoption: {},

    //types
    accountTypes: [],
    accountType: {},

    //groups
    accountGroups: [],
    accountGroup: {},

    //limits
    accountLimits: [],
    accountLimit: {},
    accountLimitOptions: [],

    //shared
    loadingAccountData: false,
    error: null,
    unauthorized: false,
    meta: { total: 0, from: 0, to: 0, last_page: 0 },
  }),
  actions: {
    /**
     * Accounts
     */
    getAccounts(options) {
      return new Promise((resolve, reject) => {
        this.loadingAccountData = true;
        AccountService.getAllAccounts(options)
          .then(({ data }) => {
            this.accounts = data.data;
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

            this.loadingAccountData = false;
            this.error = getError(error);
            reject(error);
          })
          .finally(() => {
            this.loadingAccountData = false;
          });
      });
    },
    getSingleAccount({ commit }, id) {
      return new Promise((resolve, reject) => {
        commit("SET_LOADING", true);
        AccountService.getSingleAccount(id)
          .then(({ data }) => {
            commit("SET_ACCOUNT", data.data);
            resolve(data);
          })
          .catch((error) => {
            if (error.response.status === 403) {
              this.unauthorized = true;
            }

            this.loadingAccountData = false;
            this.error = getError(error);
            reject(error);
          })
          .finally(() => {
            this.loadingAccountData = false;
          });
      });
    },
    getAccountOptions() {
      return new Promise((resolve, reject) => {
        this.loadingAccountData = true;
        AccountService.getAccountOptions()
          .then(({ data }) => {
            this.accountOptions = data;
            console.log(data);
            resolve(data);
          })
          .catch((error) => {
            if (error.response.status === 403) {
              this.unauthorized = true;
            }

            this.loadingAccountData = false;
            this.error = getError(error);
            reject(error);
          })
          .finally(() => {
            this.loadingAccountData = false;
          });
      });
    },
    addAccount(payload) {
      return new Promise((resolve, reject) => {
        this.loadingAccountData = true;
        AccountService.addAccount(payload)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            if (error.response.status === 403) {
              this.unauthorized = true;
            }

            this.loadingAccountData = false;
            this.error = getError(error);
            reject(error);
          })
          .finally(() => {
            this.loadingAccountData = false;
          });
      });
    },
    updateAccount(payload) {
      return new Promise((resolve, reject) => {
        this.loadingAccountData = true;
        AccountService.updateAccount(payload)
          .then(({ data }) => {
            resolve(data);
          })
          .catch((error) => {
            if (error.response.status === 403) {
              this.unauthorized = true;
            }

            this.loadingAccountData = false;
            this.error = getError(error);
            reject(error);
          })
          .finally(() => {
            this.loadingAccountData = false;
          });
      });
    },

    /**
     * Account Types
     */
    getAccountTypes(options) {
      return new Promise((resolve, reject) => {
        this.loadingAccountData = true;
        AccountService.getAccountTypes(options)
          .then(({ data }) => {
            this.accountTypes = data.data;

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

            this.loadingAccountData = false;
            this.error = getError(error);
            reject(error);
          })
          .finally(() => {
            this.loadingAccountData = false;
          });
      });
    },

    getSingleAccountType(id) {
      return new Promise((resolve, reject) => {
        this.loadingAccountData = true;
        AccountService.getSingleAccountType(id)
          .then(({ data }) => {
            this.accountType = data.data;
            resolve(data);
          })
          .catch((error) => {
            if (error.response.status === 403) {
              this.unauthorized = true;
            }

            this.loadingAccountData = false;
            this.error = getError(error);
            reject(error);
          })
          .finally(() => {
            this.loadingAccountData = false;
          });
      });
    },

    updateAccountType(options) {
      return new Promise((resolve, reject) => {
        this.loadingAccountData = true;
        AccountService.updateAccountType(options)
          .then(({ data }) => {
            resolve(data);
          })
          .catch((error) => {
            if (error.response.status === 403) {
              this.unauthorized = true;
            }

            this.loadingAccountData = false;
            this.error = getError(error);
            reject(error);
          })
          .finally(() => {
            this.loadingAccountData = false;
          });
      });
    },

    addAccountType(options) {
      return new Promise((resolve, reject) => {
        this.loadingAccountData = true;
        AccountService.addAccountType(options)
          .then(({ data }) => {
            this.accountType = data;
            resolve(data);
          })
          .catch((error) => {
            if (error.response.status === 403) {
              this.unauthorized = true;
            }

            this.loadingAccountData = false;
            this.error = getError(error);
            reject(error);
          })
          .finally(() => {
            this.loadingAccountData = false;
          });
      });
    },

    /**
     * Account groups
     */

    getAccountGroups(options) {
      return new Promise((resolve, reject) => {
        this.loadingAccountData = true;
        AccountService.getAccountGroups(options)
          .then(({ data }) => {
            this.accountGroups = data.data;
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

            this.loadingAccountData = false;
            this.error = getError(error);
            reject(error);
          })
          .finally(() => {
            this.loadingAccountData = false;
          });
      });
    },

    getSingleAccountGroup({ commit }, id) {
      return new Promise((resolve, reject) => {
        commit("SET_LOADING", true);
        AccountService.getSingleAccountGroup(id)
          .then(({ data }) => {
            commit("SET_ACCOUNT_GROUP", data.data);
            resolve(data);
          })
          .catch((err) => {
            commit("SET_ERROR", getError(err));
            reject(err);
          })
          .finally(() => commit("SET_LOADING", false));
      });
    },

    updateAccountGroup(options) {
      return new Promise((resolve, reject) => {
        AccountService.updateAccountGroup(options)
          .then(({ data }) => {
            resolve(data);
          })
          .catch((err) => {
            reject(err);
          })
          .finally();
      });
    },

    addAccountGroup(options) {
      return new Promise((resolve, reject) => {
        //  commit("SET_LOADING", true);
        AccountService.addAccountGroup(options)
          .then(({ data }) => {
            //     commit("ADD_ACCOUNT_GROUP", data);
            resolve(data);
          })
          .catch((err) => {
            reject(err);
          })
          .finally(() => {
            this.loadingAccountData = false;
          });
      });
    },

    /**
     * Account Limits
     */

    getAccountLimits(options) {
      return new Promise((resolve, reject) => {
        this.loadingAccountData = true;
        AccountService.getAccountLimits(options)
          .then(({ data }) => {
            this.accountLimits = data.data;
            console.log(data.data);
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

            this.loadingAccountData = false;
            this.error = getError(error);
            reject(error);
          })
          .finally(() => {
            this.loadingAccountData = false;
          });
      });
    },

    getSingleAccountLimit(id) {
      return new Promise((resolve, reject) => {
        this.loadingAccountData = true;
        AccountService.getSingleAccountLimit(id)
          .then(({ data }) => {
            this.accountLimit = data.data;
            resolve(data);
          })
          .catch((error) => {
            if (error.response.status === 403) {
              this.unauthorized = true;
            }

            this.loadingAccountData = false;
            this.error = getError(error);
            reject(error);
          })
          .finally(() => {
            this.loadingAccountData = false;
          });
      });
    },

    getAccountLimitOptions() {
      return new Promise((resolve, reject) => {
        this.loadingAccountData = true;
        AccountService.getAccountLimitOptions()
          .then(({ data }) => {
            this.accountLimitOptions = data;
            resolve(data);
          })
          .catch((error) => {
            if (error.response.status === 403) {
              this.unauthorized = true;
            }

            this.loadingAccountData = false;
            this.error = getError(error);
            reject(error);
          })
          .finally(() => {
            this.loadingAccountData = false;
          });
      });
    },

    addAccountLimit(payload) {
      return new Promise((resolve, reject) => {
        this.loadingAccountData = true;
        AccountService.addAccountLimit(payload)
          .then((response) => {
            this.accountLimit = response;
            resolve(response);
          })
          .catch((error) => {
            if (error.response.status === 403) {
              this.unauthorized = true;
            }

            this.loadingAccountData = false;
            this.error = getError(error);
            reject(error);
          })
          .finally(() => {
            this.loadingAccountData = false;
          });
      });
    },

    updateAccountLimit(payload) {
      return new Promise((resolve, reject) => {
        this.loadingAccountData = true;
        AccountService.updateAccountLimit(payload)
          .then(({ data }) => {
            resolve(data);
          })
          .catch((error) => {
            if (error.response.status === 403) {
              this.unauthorized = true;
            }

            this.loadingAccountData = false;
            this.error = getError(error);
            reject(error);
          })
          .finally(() => {
            this.loadingAccountData = false;
          });
      });
    },
  },
  getters: {
    // loading: (state) => state.loading,
    // error: (state) => state.error,
    // accounts: (state) => state.accounts,
    // account: (state) => state.account,
    // accountTypes: (state) => state.accountTypes,
    // accountType: (state) => state.accountType,
    // accountGroups: (state) => state.accountGroups,
    // accountGroup: (state) => state.accountGroup,
    // accountlimits: (state) => state.accountlimits,
    // accountlimit: (state) => state.accountlimit,
    // getAccountLimitOptions: (state) => state.accountlimitOptions,
  },
});
