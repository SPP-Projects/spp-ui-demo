import { defineStore } from "pinia";
import LanguageService from "@/services/admin/LanguageService";
import { getError } from "@/helpers/errors";

export const useAdminLanguageStore = defineStore("adminLanguageStore", {
  state: () => ({
    //languages
    languages: [],
    language: {},

    //shared
    error: null,
    loadingLanguageData: false,
    unauthorized: false,
    meta: { total: 0, from: 0, to: 0, last_page: 0 },
  }),
  actions: {
    getLanguages(options) {
      return new Promise((resolve, reject) => {
        this.loadingLanguageData = true;
        LanguageService.getLanguages(options)
          .then(({ data }) => {
            this.languages = data.data;
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

            this.loadingLanguageData = false;
            this.error = getError(error);
            reject(error);
          })
          .finally(() => {
            this.loadingLanguageData = false;
          });
      });
    },

    getLanguage(payload) {
      return new Promise((resolve, reject) => {
        //  commit("SET_LOADING", true);
        LanguageService.getLanguage(payload)
          .then(({ data }) => {
            this.language = data;
            resolve(data);
          })
          .catch((err) => {
            // commit("SET_ERROR", getError(err));
            reject(err);
          })
          .finally(() => {
            this.loadingLanguageData = false;
          });
      });
    },

    addLanguage(payload) {
      return new Promise((resolve, reject) => {
        //   commit("SET_LOADING", true);
        LanguageService.addLanguage(payload)
          .then((response) => {
            // commit("ADD_GENERAL_SETTING", response);
            resolve(response);
          })
          .catch((err) => {
            //  commit("SET_ERROR", getError(err));
            reject(err);
          })
          .finally(() => {
            this.loadingLanguageData = false;
          });
      });
    },

    updateLanguage(payload) {
      return new Promise((resolve, reject) => {
        LanguageService.updateLanguage(payload)
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
