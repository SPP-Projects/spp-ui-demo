import { defineStore } from "pinia";
import AccountService from "@/services/customer/AccountService";
import { getError } from "@/helpers/errors";

export const useCustomerAccountStore = defineStore("customerAccountStore", {
  state: () => ({
    accounts: [],
    account: [],
    accountsTotal: null,
    accountValidationForm: [],
    validatedAccount: [],
    lastSelectedAccount: null,

    //shared
    unauthorized: false,
    meta: { total: 0, from: 0, to: 0, last_page: 0 },
    loadingAccountData: false,
    error: null,
  }),
  actions: {
    getAccounts(options) {
      this.loadingAccountData = true;

      AccountService.getAccounts(options)
        .then(({ data }) => {
          this.accounts = data.data;
          this.meta.total = data.total;
          this.meta.from = data.from;
          this.meta.to = data.to;
          this.meta.last_page = data.last_page;
        })
        .catch((error) => {
          if (error.response.status === 403) {
            // unauthorized.
            this.unauthorized = true;
          }

          this.accounts = [];
          this.loadingAccountData = false;
          this.error = getError(error);
        })
        .finally(() => {
          this.loadingAccountData = false;
        });
    },

    getAccount(account_no) {
      return new Promise((resolve, reject) => {
        this.loadingAccountData = true;
        AccountService.getAccount(account_no)
          .then(({ data }) => {
            this.account = data;
            resolve(data);
          })
          .catch((error) => {
            if (error.response.status === 403) {
              // unauthorized.
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

    getAccountsCount(payload) {
      return new Promise((resolve, reject) => {
        this.loadingAccountData = true;
        AccountService.getAccountsCount(payload)
          .then(({ data }) => {
            this.accountsTotal = data;
            resolve(data);
          })
          .catch((error) => {
            if (error.response.status === 403) {
              // unauthorized.
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

    validateAccount(payload) {
      return new Promise((resolve, reject) => {
        this.loadingAccountData = true;

        AccountService.validateAccount(payload)
          .then((response) => {
            this.validatedAccount = response.data;
            resolve(response);
          })
          .catch((error) => {
            if (error.response.status === 403) {
              // unauthorized.
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

    //set account in state for selecting transactions
    setLastSelectedAccount(account_no) {
      this.lastSelectedAccount = account_no;
    },
  },
});
