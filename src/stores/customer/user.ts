import { defineStore } from "pinia";
import UserService from "@/services/customer/UserService";
import { getError } from "@/helpers/errors";
import { useAuthStore } from "@/stores/auth";
import type { iUser } from "@/models/user";
import type { iCustomerPermissions } from "@/models/customer";

export const useCustomerUserStore = defineStore("customerUserStore", {
  state: () => ({
    authenticatedUser: {} as iUser,
    authenticatedUserDetails: {} as iUser,
    users: [] as iUser[],

    user: {} as iUser,
    usersTotal: {},

    //customerPermissions
    customerPermissions: {} as iCustomerPermissions,

    //shared
    loadingUserData: false,
    loadingAuthenticatedUser: false,
    error: null,
    meta: { total: 0, from: 0, to: 0, last_page: 0 },
    unauthorized: false,
  }),
  actions: {
    getUsers(options) {
      return new Promise((resolve, reject) => {
        this.loadingUserData = true;
        UserService.getUsers(options)
          .then(({ data }) => {
            this.users = data.data;

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

            this.loadingUserData = false;
            this.error = getError(error);
            reject(error);
          })
          .finally(() => {
            this.loadingUserData = false;
          });
      });
    },

    getUser(id) {
      return new Promise((resolve, reject) => {
        this.loadingUserData = true;
        this.loadingAuthenticatedUser = true;
        UserService.getUser(id)
          .then(({ data }) => {
            this.user = data;

            //TODO - MOVE TO CENTRALISED PLACE
            //store detailed data  user = auth user
            const authStore = useAuthStore();
            if (id === authStore.authenticatedUser.id) {
              this.authenticatedUserDetails = data;
              this.loadingAuthenticatedUser = false;
            }

            resolve(data);
          })
          .catch((error) => {
            if (error.response.status === 403) {
              // unauthorized.
              this.unauthorized = true;
            }

            this.loadingUserData = false;
            this.error = getError(error);
            reject(error);
          })
          .finally(() => {
            this.loadingUserData = false;
          });
      });
    },

    getUsersCount(options) {
      return new Promise((resolve, reject) => {
        this.loadingUserData = true;
        UserService.getUsersCount(options)
          .then(({ data }) => {
            this.usersTotal = data;
            resolve(data);
          })
          .catch((error) => {
            if (error.response.status === 403) {
              // unauthorized.
              this.unauthorized = true;
            }

            this.loadingUserData = false;
            this.error = getError(error);
            reject(error);
          })
          .finally(() => {
            this.loadingUserData = false;
          });
      });
    },

    updateUser(payload) {
      return new Promise((resolve, reject) => {
        this.loadingUserData = true;
        UserService.updateUser(payload)
          .then(({ data }) => {
            resolve(data);
          })
          .catch((error) => {
            if (error.response.status === 403) {
              // unauthorized.
              this.unauthorized = true;
            }

            this.loadingUserData = false;
            this.error = getError(error);
            reject(error);
          })
          .finally(() => {
            this.loadingUserData = false;
          });
      });
    },

    addUser(payload) {
      return new Promise((resolve, reject) => {
        this.loadingUserData = true;
        UserService.addUser(payload)
          .then(({ data }) => {
            resolve(data);
          })
          .catch((error) => {
            if (error.response.status === 403) {
              // unauthorized.
              this.unauthorized = true;
            }

            this.loadingUserData = false;
            this.error = getError(error);
            reject(error);
          })
          .finally(() => {
            this.loadingUserData = false;
          });
      });
    },

    getAuthenticatedUser() {
      return new Promise((resolve, reject) => {
        this.loadingUserData = true;
        UserService.getAuthenticatedUser()
          .then(({ data }) => {
            this.authenticatedUser = data;

            //TODO - CONSIDER REFACTORING
            // save customer type id
            localStorage.setItem("customer_type_id", data.customer.id);

            resolve(data);
          })
          .catch((error) => {
            //TODO: if error remove user from localstorage
            // localStorage.removeItem("user");
            //sign out
            if (error.response.status === 403) {
              // unauthorized.
              this.unauthorized = true;
            }

            this.loadingUserData = false;
            this.error = getError(error);
            reject(error);
          })
          .finally(() => {
            this.loadingUserData = false;
          });
      });
    },

    getCustomerPermissions() {
      return new Promise((resolve, reject) => {
        this.loadingUserData = true;
        UserService.getCustomerPermissions()
          .then(({ data }) => {
            this.customerPermissions = data;

            resolve(data);
          })
          .catch((error) => {
            //TODO: if error remove user from localstorage
            // localStorage.removeItem("user");
            //sign out
            if (error.response.status === 403) {
              // unauthorized.
              this.unauthorized = true;
            }

            this.loadingUserData = false;
            this.error = getError(error);
            reject(error);
          })
          .finally(() => {
            this.loadingUserData = false;
          });
      });
    },
  },
});
