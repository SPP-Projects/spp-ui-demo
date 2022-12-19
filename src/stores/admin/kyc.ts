import { defineStore } from "pinia";
import KycService from "@/services/admin/KycService";
import { getError } from "@/helpers/errors";

export const useAdminKycStore = defineStore("adminKycStore", {
  state: () => ({
    //kyc setting
    kycSettings: [],
    kycSetting: {},

    //kyc requirement option
    kycRequirementOptions: [],

    //setting option
    kycSettingOptions: [],

    //kyc account
    accountTypeKycSettings: [],

    //AccountTypeKycRequirementOptions
    accountTypeKycRequirementOptions: [],

    //shared
    error: null,
    loadingKycData: false,
    unauthorized: false,
    meta: { total: 0, from: 0, to: 0, last_page: 0 },
  }),
  actions: {
    // General KYC Requirements
    getKycSettings(options) {
      return new Promise((resolve, reject) => {
        this.loadingKycData = true;
        KycService.getAllKYCSettings(options)
          .then(({ data }) => {
            this.kycSettings = data.data;
            this.meta.total = data.total;
            this.meta.from = data.from;
            this.meta.to = data.to;
            this.meta.last_page = data.last_page;
            resolve(data);
            resolve(data);
          })
          .catch((error) => {
            if (error.response.status === 403) {
              this.unauthorized = true;
            }

            this.loadingKycData = false;
            this.error = getError(error);
            reject(error);
          })
          .finally(() => {
            this.loadingKycData = false;
          });
      });
    },
    getKYCSetting(id) {
      return new Promise((resolve, reject) => {
        this.loadingKycData = true;
        KycService.getKYCSetting(id)
          .then((response) => {
            this.kycSetting = response.data.data;
            resolve(response);
          })
          .catch((error) => {
            if (error.response.status === 403) {
              this.unauthorized = true;
            }

            this.loadingKycData = false;
            this.error = getError(error);
            reject(error);
          })
          .finally(() => {
            this.loadingKycData = false;
          });
      });
    },
    getRequirementOptions() {
      return new Promise((resolve, reject) => {
        this.loadingKycData = true;
        KycService.getRequirementOptions()
          .then((response) => {
            this.kycRequirementOptions = response.data;

            resolve(response.data);
          })
          .catch((error) => {
            if (error.response.status === 403) {
              this.unauthorized = true;
            }

            this.loadingKycData = false;
            this.error = getError(error);
            reject(error);
          })
          .finally(() => {
            this.loadingKycData = false;
          });
      });
    },
    addKycSetting(payload) {
      return new Promise((resolve, reject) => {
        this.loadingKycData = true;
        KycService.addKYCSetting(payload)
          .then((response) => {
            //  commit("ADD_KYC_SETTING", response);

            resolve(response);
          })
          .catch((error) => {
            if (error.response.status === 403) {
              this.unauthorized = true;
            }

            this.loadingKycData = false;
            this.error = getError(error);
            reject(error);
          })
          .finally(() => {
            this.loadingKycData = false;
          });
      });
    },
    updateKycSetting(payload) {
      return new Promise((resolve, reject) => {
        this.loadingKycData = true;
        KycService.editKYCSetting(payload)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            if (error.response.status === 403) {
              this.unauthorized = true;
            }

            this.loadingKycData = false;
            this.error = getError(error);
            reject(error);
          })
          .finally(() => {
            this.loadingKycData = false;
          });
      });
    },

    // Account Type KYC Requirements
    getAccountTypeKycSettings(options) {
      return new Promise((resolve, reject) => {
        this.loadingKycData = true;
        KycService.getAccountTypeKYCSettings(options)
          .then(({ data }) => {
            this.accountTypeKycSettings = data.data;
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

            this.loadingKycData = false;
            this.error = getError(error);
            reject(error);
          })
          .finally(() => {
            this.loadingKycData = false;
          });
      });
    },
    getAccountTypeKycRequirementOptions() {
      return new Promise((resolve, reject) => {
        //     commit("SET_LOADING", true);
        KycService.getAccountTypeKYCRequirementOptions()
          .then((response) => {
            this.accountTypeKycRequirementOptions = response.data;
            resolve(response.data);
          })
          .catch((error) => {
            if (error.response.status === 403) {
              this.unauthorized = true;
            }

            this.loadingKycData = false;
            this.error = getError(error);
            reject(error);
          })
          .finally(() => {
            this.loadingKycData = false;
          });
      });
    },
    addAccountTypeKycSetting(payload) {
      return new Promise((resolve, reject) => {
        // commit("SET_LOADING", true);
        KycService.addAccountTypeKYCSetting(payload)
          .then((response) => {
            //       commit("ADD_KYC_SETTING", response);
            //      commit("SET_LOADING", false);
            resolve(response);
          })
          .catch((error) => {
            if (error.response.status === 403) {
              this.unauthorized = true;
            }

            this.loadingKycData = false;
            this.error = getError(error);
            reject(error);
          })
          .finally(() => {
            this.loadingKycData = false;
          });
      });
    },
    updateAccountTypeKycSetting(payload) {
      console.log(payload);
      return new Promise((resolve, reject) => {
        //     commit("SET_LOADING", true);
        KycService.updateAccountTypeKYCSetting(payload)
          .then((response) => {
            //       commit("SET_LOADING", false);
            resolve(response);
          })
          .catch((error) => {
            if (error.response.status === 403) {
              this.unauthorized = true;
            }

            this.loadingKycData = false;
            this.error = getError(error);
            reject(error);
          })
          .finally(() => {
            this.loadingKycData = false;
          });
      });
    },
    deleteAccountTypeKycSetting(setting_id) {
      return new Promise((resolve, reject) => {
        //   commit("SET_LOADING", true);
        KycService.deleteAccountTypeKYCSetting(setting_id)
          .then((response) => {
            //      commit("SET_LOADING", false);
            resolve(response);
          })
          .catch((error) => {
            if (error.response.status === 403) {
              this.unauthorized = true;
            }

            this.loadingKycData = false;
            this.error = getError(error);
            reject(error);
          })
          .finally(() => {
            this.loadingKycData = false;
          });
      });
    },

    // Customer Type KYC Requirements
    getCustomerTypeKYCSettings({ commit }, options) {
      return new Promise((resolve, reject) => {
        commit("SET_LOADING", true);
        KycService.getCustomerTypeKYCSettings(options)
          .then(({ data }) => {
            commit("SET_KYC_SETTINGS", data.data);
            resolve(data);
          })
          .catch((err) => {
            commit("SET_ERROR", getError(err));
            reject(err);
          })
          .finally(() => commit("SET_LOADING", false));
      });
    },
    getCustomerTypeKYCRequirementOptions({ commit }, id) {
      return new Promise((resolve, reject) => {
        commit("SET_LOADING", true);
        KycService.getCustomerTypeKYCRequirementOptions()
          .then((response) => {
            commit("SET_KYC_SETTING_OPTION", response.data.groups);
            commit("SET_LOADING", false);
            resolve(response.data);
          })
          .catch((err) => {
            commit("SET_LOADING", false);
            commit("SET_ERROR", getError(err));
            reject(err);
          });
      });
    },
    addCustomerTypeKYCSetting({ commit }, payload) {
      return new Promise((resolve, reject) => {
        commit("SET_LOADING", true);
        KycService.addCustomerTypeKYCSetting(payload)
          .then((response) => {
            commit("ADD_KYC_SETTING", response);
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
    updateCustomerTypeKYCSetting({ commit }, payload) {
      return new Promise((resolve, reject) => {
        commit("SET_LOADING", true);
        KycService.updateCustomerTypeKYCSetting(payload)
          .then((response) => {
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
    deleteCustomerTypeKYCSetting({ commit }, setting_id) {
      return new Promise((resolve, reject) => {
        commit("SET_LOADING", true);
        KycService.deleteCustomerTypeKYCSetting(setting_id)
          .then((response) => {
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
  },
  getters: {
    // loading: (state) => state.loading,
    // error: (state) => state.error,
    // KYCSettings: (state) => state.KYCSettings,
    // KYCSetting: (state) => state.KYCSetting,
    // KYCSettingOption: (state) => state.KYCSettingOption,
  },
});
