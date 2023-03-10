import { defineStore } from "pinia";
import NotificationService from "@/services/admin/NotificationService";
import { getError } from "@/helpers/errors";

import type {
  iNotificationActivityOption,
  iNotificationSettingOption,
  iNotificationTemplateOption,
} from "@/models/notification";

export const useAdminNotificationStore = defineStore("adminNotificationStore", {
  state: () => ({
    //notifications
    notifications: [],
    notification: {},

    //types
    notificationTypes: [],
    notificationType: {},

    //activities
    notificationActivities: [],

    //activitiesOptions
    notificationActivityOptions: {} as iNotificationActivityOption,

    //notification activity groups
    notificationActivityGroups: [],

    //templates
    notificationTemplates: [],

    //template options
    notificationTemplateOptions: {} as iNotificationTemplateOption,

    //groups
    notificationGroups: [],
    notificationGroup: {},

    //option
    notificationOptions: {} as iNotificationSettingOption,

    //shared
    error: null,
    loadingNotificationData: false,
    unauthorized: false,
    meta: { total: 0, from: 0, to: 0, last_page: 0 },
  }),
  actions: {
    /**
     * Notifications
     */
    getNotifications(options) {
      return new Promise((resolve, reject) => {
        this.loadingNotificationData = true;
        NotificationService.getAllNotifications(options)
          .then(({ data }) => {
            this.notifications = data.data;
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

            this.loadingNotificationData = false;
            this.error = getError(error);
            reject(error);
          })
          .finally(() => {
            this.loadingNotificationData = false;
          });
      });
    },
    getNotification(id) {
      return new Promise((resolve, reject) => {
        this.loadingNotificationData = true;
        NotificationService.getSingleNotification(id)
          .then(({ data }) => {
            //    commit("SET_NOTIFICATION", data.data);
            resolve(data);
          })
          .catch((error) => {
            if (error.response.status === 403) {
              this.unauthorized = true;
            }
            this.loadingNotificationData = false;
            this.error = getError(error);
            reject(error);
          })
          .finally(() => {
            this.loadingNotificationData = false;
          });
      });
    },
    addNotification(payload) {
      return new Promise((resolve, reject) => {
        this.loadingNotificationData = true;
        NotificationService.addNotification(payload)
          .then((response) => {
            //      commit("SET_NEW_NOTIFICATION", response);
            resolve(response);
          })
          .catch((error) => {
            if (error.response.status === 403) {
              this.unauthorized = true;
            }

            this.loadingNotificationData = false;
            this.error = getError(error);
            reject(error);
          })
          .finally(() => {
            this.loadingNotificationData = false;
          });
      });
    },
    updateNotification(payload) {
      return new Promise((resolve, reject) => {
        this.loadingNotificationData = true;
        NotificationService.updateNotification(payload)
          .then(({ data }) => {
            resolve(data);
          })
          .catch((err) => {
            reject(err);
          })
          .finally(() => {
            this.loadingNotificationData = false;
          });
      });
    },
    getNotificationOptions() {
      return new Promise((resolve, reject) => {
        this.loadingNotificationData = true;
        NotificationService.getNotificationOptions()
          .then(({ data }) => {
            this.notificationOptions = data;
            console.log(data);
            resolve(data);
          })
          .catch((err) => {
            //  commit("SET_ERROR", getError(err));
            reject(err);
          })
          .finally(() => {
            this.loadingNotificationData = false;
          });
      });
    },

    /**
     * Notification Activities
     */
    getNotificationActivities(options) {
      return new Promise((resolve, reject) => {
        this.loadingNotificationData = true;
        NotificationService.getNotificationActivities(options)
          .then(({ data }) => {
            this.notificationActivities = data.data;
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
            this.loadingNotificationData = false;
          });
      });
    },
    addNotificationActivity(payload) {
      return new Promise((resolve, reject) => {
        this.loadingNotificationData = true;
        NotificationService.addNotificationActivity(payload)
          .then((response) => {
            resolve(response);
          })
          .catch((err) => {
            //     commit("SET_ERROR", getError(err));
            reject(err);
          })
          .finally(() => {
            this.loadingNotificationData = false;
          });
      });
    },
    updateNotificationActivity(payload) {
      return new Promise((resolve, reject) => {
        this.loadingNotificationData = true;
        NotificationService.updateNotificationActivity(payload)
          .then(({ data }) => {
            resolve(data);
          })
          .catch((err) => {
            reject(err);
          })
          .finally();
      });
    },
    getNotificationActivityOptions() {
      return new Promise((resolve, reject) => {
        this.loadingNotificationData = true;
        NotificationService.getNotificationActivityOptions()
          .then(({ data }) => {
            console.log(data);
            this.notificationActivityOptions = data;
            resolve(data);
          })
          .catch((err) => {
            //    commit("SET_ERROR", getError(err));
            reject(err);
          })
          .finally(() => {
            this.loadingNotificationData = false;
          });
      });
    },

    /**
     * Notification Templates
     */
    getNotificationTemplates(options) {
      return new Promise((resolve, reject) => {
        this.loadingNotificationData = true;
        NotificationService.getNotificationTemplates(options)
          .then(({ data }) => {
            this.notificationTemplates = data.data;

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

            this.loadingNotificationData = false;
            this.error = getError(error);
            reject(error);
          })
          .finally(() => {
            this.loadingNotificationData = false;
          });
      });
    },
    addNotificationTemplate(payload) {
      return new Promise((resolve, reject) => {
        this.loadingNotificationData = true;
        NotificationService.addNotificationTemplate(payload)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            if (error.response.status === 403) {
              this.unauthorized = true;
            }

            this.loadingNotificationData = false;
            this.error = getError(error);
            reject(error);
          })
          .finally(() => {
            this.loadingNotificationData = false;
          });
      });
    },
    updateNotificationTemplate(payload) {
      return new Promise((resolve, reject) => {
        NotificationService.updateNotificationTemplate(payload)
          .then(({ data }) => {
            resolve(data);
          })
          .catch((error) => {
            if (error.response.status === 403) {
              this.unauthorized = true;
            }

            this.loadingNotificationData = false;
            this.error = getError(error);
            reject(error);
          })
          .finally(() => {
            this.loadingNotificationData = false;
          });
      });
    },
    getNotificationTemplateOptions() {
      return new Promise((resolve, reject) => {
        this.loadingNotificationData = true;
        NotificationService.getNotificationTemplateOptions()
          .then(({ data }) => {
            this.notificationTemplateOptions = data;
            console.log(data);
            resolve(data);
          })
          .catch((error) => {
            if (error.response.status === 403) {
              this.unauthorized = true;
            }

            this.loadingNotificationData = false;
            this.error = getError(error);
            reject(error);
          })
          .finally(() => {
            this.loadingNotificationData = false;
          });
      });
    },

    /**
     * Notification Activity Groups
     */
    getNotificationActivityGroups(options) {
      return new Promise((resolve, reject) => {
        this.loadingNotificationData = true;
        NotificationService.getNotificationActivityGroups(options)
          .then(({ data }) => {
            this.notificationActivityGroups = data.data;
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

            this.loadingNotificationData = false;
            this.error = getError(error);
            reject(error);
          })
          .finally(() => {
            this.loadingNotificationData = false;
          });
      });
    },
    getNotificationActivityGroup(id) {
      return new Promise((resolve, reject) => {
        this.loadingNotificationData = true;
        NotificationService.getNotificationActivityGroup(id)
          .then(({ data }) => {
            resolve(data);
          })
          .catch((error) => {
            if (error.response.status === 403) {
              this.unauthorized = true;
            }

            this.loadingNotificationData = false;
            this.error = getError(error);
            reject(error);
          })
          .finally(() => {
            this.loadingNotificationData = false;
          });
      });
    },
    updateNotificationActivityGroup(payload) {
      return new Promise((resolve, reject) => {
        this.loadingNotificationData = true;
        NotificationService.updateNotificationActivityGroup(payload)
          .then(({ data }) => {
            this.loadingNotificationData = false;
            resolve(data);
          })
          .catch((error) => {
            if (error.response.status === 403) {
              this.unauthorized = true;
            }

            this.loadingNotificationData = false;
            this.error = getError(error);
            reject(error);
          })
          .finally(() => {
            this.loadingNotificationData = false;
          });
      });
    },
  },

  getters: {},
});
