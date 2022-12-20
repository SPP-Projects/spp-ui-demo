import { defineStore } from "pinia";
import InstitutionService from "@/services/admin/InstitutionService";
import { getError } from "@/helpers/errors";
import type { Institution, InstitutionType } from "@/models/institution";
import { ref } from "vue";

export const useAdminInstitutionStore = defineStore("adminInstitutionStore", {
  state: () => ({
    //institutions
    institutions: [],
    institution: {},

    //types
    institutionTypes: [] as InstitutionType[],
    institutionType: {},
    //shared
    error: null,
    loadingInstitutionData: false,
    unauthorized: false,
    meta: { total: 0, from: 0, to: 0, last_page: 0 },
  }),
  actions: {
    getInstitutions(options) {
      return new Promise((resolve, reject) => {
        this.loadingInstitutionData = true;
        InstitutionService.getInstitutions(options)
          .then(({ data }) => {
            this.institutions = data.data;
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

            this.loadingInstitutionData = false;
            this.error = getError(error);
            reject(error);
          })
          .finally(() => {
            this.loadingInstitutionData = false;
          });
      });
    },

    getInstitution(payload) {
      return new Promise((resolve, reject) => {
        //  commit("SET_LOADING", true);
        InstitutionService.getInstitution(payload)
          .then(({ data }) => {
            this.institution = data;
            resolve(data);
          })
          .catch((err) => {
            // commit("SET_ERROR", getError(err));
            reject(err);
          })
          .finally(() => {
            this.loadingInstitutionData = false;
          });
      });
    },

    addInstitution(payload) {
      return new Promise((resolve, reject) => {
        //   commit("SET_LOADING", true);
        InstitutionService.addInstitution(payload)
          .then((response) => {
            // commit("ADD_GENERAL_SETTING", response);
            resolve(response);
          })
          .catch((err) => {
            //  commit("SET_ERROR", getError(err));
            reject(err);
          })
          .finally(() => {
            this.loadingInstitutionData = false;
          });
      });
    },

    updateInstitution(payload) {
      return new Promise((resolve, reject) => {
        InstitutionService.updateInstitution(payload)
          .then(({ data }) => {
            resolve(data);
          })
          .catch((err) => {
            reject(err);
          })
          .finally();
      });
    },

    getInstitutionTypes(options) {
      return new Promise((resolve, reject) => {
        //     commit("SET_LOADING", true);
        InstitutionService.getInstitutionTypes(options)
          .then(({ data }) => {
            this.institutionTypes = data.data;
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
          .finally();
      });
    },
    getInstitutionType(options) {
      return new Promise((resolve, reject) => {
        //     commit("SET_LOADING", true);
        InstitutionService.getInstitutionType(options)
          .then(({ data }) => {
            this.institutionType = data.data;

            resolve(data);
          })
          .catch((err) => {
            //    commit("SET_ERROR", getError(err));
            reject(err);
          })
          .finally();
      });
    },
    addInstitutionType(options) {
      return new Promise((resolve, reject) => {
        //  commit("SET_LOADING", true);
        InstitutionService.addInstitutionType(options)
          .then(({ data }) => {
            //   commit("ADD_SETTING_TYPES", data);
            resolve(data);
          })
          .catch((err) => {
            reject(err);
          })
          .finally();
      });
    },

    updateInstitutionType(options) {
      return new Promise((resolve, reject) => {
        InstitutionService.updateInstitutionType(options)
          .then(({ data }) => {
            resolve(data);
          })
          .catch((err) => {
            reject(err);
          })
          .finally();
      });
    },
  },
  getters: {},
});
