import { defineStore } from "pinia";
import SettingsService from "@/services/admin/SettingsService";
import { getError } from "@/helpers/errors";
import type { iSettingOption } from "@/models/setting";

export const useAdminSettingStore = defineStore("adminSettingStore", {
  state: () => ({
    //general settings
    generalSettings: [],

    //groups
    settingsGroups: [],

    //types
    settingsTypes: [],

    //option
    generalSettingsOptions: {} as iSettingOption,

    settings: [],
    setting: {},
    setting_groups: [],
    setting_types: [],
    loading: false,
    error: null,
    setting_options: [],

    //shared
    loadingSettingsData: false,
    unauthorized: false,
    meta: { total: 0, from: 0, to: 0, last_page: 0 },
  }),
  actions: {
    getGeneralSettings(options) {
      return new Promise((resolve, reject) => {
        this.loadingSettingsData = true;
        SettingsService.getAllGeneralSettings(options)
          .then(({ data }) => {
            this.generalSettings = data.data;
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

            this.loadingSettingsData = false;
            this.error = getError(error);
            reject(error);
          })
          .finally(() => {
            this.loadingSettingsData = false;
          });
      });
    },

    getGeneralSettingOptions() {
      return new Promise((resolve, reject) => {
        this.loadingSettingsData = true;
        SettingsService.getSettingOptions()
          .then(({ data }) => {
            console.log(data.groups);
            this.generalSettingsOptions = data;
            resolve(data);
          })
          .catch((err) => {
            // commit("SET_ERROR", getError(err));
            reject(err);
          })
          .finally(() => {
            this.loadingSettingsData = false;
          });
      });
    },

    addGeneralSettings(payload) {
      return new Promise((resolve, reject) => {
        this.loadingSettingsData = true;
        SettingsService.addGeneralSettings(payload)
          .then((response) => {
            // commit("ADD_GENERAL_SETTING", response);
            resolve(response);
          })
          .catch((err) => {
            //  commit("SET_ERROR", getError(err));
            reject(err);
          })
          .finally(() => {
            this.loadingSettingsData = false;
          });
      });
    },

    updateGeneralSettings(payload) {
      return new Promise((resolve, reject) => {
        SettingsService.updateGeneralSettings(payload)
          .then(({ data }) => {
            resolve(data);
          })
          .catch((err) => {
            reject(err);
          })
          .finally(() => {
            this.loadingSettingsData = false;
          });
      });
    },

    /******* MANAGE SETTING GROUPS ***/
    getSettingsGroups(options) {
      return new Promise((resolve, reject) => {
        this.loadingSettingsData = true;
        SettingsService.getSettingGroups(options)
          .then(({ data }) => {
            this.settingsGroups = data.data;
            this.meta.total = data.total;
            this.meta.from = data.from;
            this.meta.to = data.to;
            this.meta.last_page = data.last_page;
            resolve(data);
          })
          .catch((err) => {
            //  commit("SET_ERROR", getError(err));
            reject(err);
          })
          .finally(() => {
            this.loadingSettingsData = false;
          });
      });
    },

    addSettingsGroup(options) {
      return new Promise((resolve, reject) => {
        this.loadingSettingsData = true;
        SettingsService.addSettingGroups(options)
          .then(({ data }) => {
            //    commit("ADD_SETTING_GROUP", data);
            resolve(data);
          })
          .catch((err) => {
            reject(err);
          })
          .finally(() => {
            this.loadingSettingsData = false;
          });
      });
    },

    updateSettingsGroup(options) {
      this.loadingSettingsData = true;
      return new Promise((resolve, reject) => {
        SettingsService.updateSettingGroups(options)
          .then(({ data }) => {
            resolve(data);
          })
          .catch((err) => {
            reject(err);
          })
          .finally(() => {
            this.loadingSettingsData = false;
          });
      });
    },

    /******* MANAGE SETTING TYPES ***/

    getSettingsTypes(options) {
      return new Promise((resolve, reject) => {
        this.loadingSettingsData = true;
        SettingsService.getSettingTypes(options)
          .then(({ data }) => {
            this.settingsTypes = data.data;
            this.meta.total = data.total;
            this.meta.from = data.from;
            this.meta.to = data.to;
            this.meta.last_page = data.last_page;
            resolve(data);
          })
          .catch((err) => {
            //    commit("SET_ERROR", getError(err));
            reject(err);
          })
          .finally(() => {
            this.loadingSettingsData = false;
          });
      });
    },

    addSettingsType(options) {
      return new Promise((resolve, reject) => {
        this.loadingSettingsData = true;
        SettingsService.addSettingTypes(options)
          .then(({ data }) => {
            //   commit("ADD_SETTING_TYPES", data);
            resolve(data);
          })
          .catch((err) => {
            reject(err);
          })
          .finally(() => {
            this.loadingSettingsData = false;
          });
      });
    },

    updateSettingsType(options) {
      this.loadingSettingsData = true;
      return new Promise((resolve, reject) => {
        SettingsService.updateSettingTypes(options)
          .then(({ data }) => {
            resolve(data);
          })
          .catch((err) => {
            reject(err);
          })
          .finally(() => {
            this.loadingSettingsData = false;
          });
      });
    },
  },
  getters: {},
});
