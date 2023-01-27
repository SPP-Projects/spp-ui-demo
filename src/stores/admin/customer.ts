import { defineStore } from "pinia";
import CustomerService from "@/services/admin/CustomerService";
import { getError } from "@/helpers/errors";
import type { iCustomer, iCustomerPermissionList } from "@/models/customer";

export const useAdminCustomerStore = defineStore("adminCustomerStore", {
  state: () => ({
    //customers
    customers: [],
    customer: {} as iCustomer,

    //customerUsers
    customerUsers: [],
    customerUser: {},

    //types
    customerTypes: [],
    customerType: {},

    //groups
    customerGroups: [],
    customerGroup: {},

    //permissions
    customerPermissionList: {} as iCustomerPermissionList,
    customerPermission: {},

    //shared
    loadingCustomerData: false,
    loadingCustomerInfo: false,
    error: null,
    unauthorized: false,
    meta: { total: 0, from: 0, to: 0, last_page: 0 },
  }),
  actions: {
    /**
     * Customers
     */
    getCustomers(options) {
      return new Promise((resolve, reject) => {
        this.loadingCustomerData = true;
        CustomerService.getAllCustomers(options)
          .then(({ data }) => {
            console.log(data.data);
            this.customers = data.data;
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

            this.loadingCustomerData = false;
            this.error = getError(error);
            reject(error);
          })
          .finally(() => {
            this.loadingCustomerData = false;
          });
      });
    },
    getCustomer(id) {
      return new Promise((resolve, reject) => {
        this.loadingCustomerInfo = true;
        CustomerService.getSingleCustomer(id)
          .then((response) => {
            this.customer = response.data;
            console.log(this.customer);
            resolve(response.data);
          })
          .catch((error) => {
            if (error.response.status === 403) {
              this.unauthorized = true;
            }
            this.customer = null;
            this.loadingCustomerInfo = false;
            this.error = getError(error);
            reject(error);
          })
          .finally(() => {
            this.loadingCustomerInfo = false;
          });
      });
    },
    updateCustomer(payload) {
      return new Promise((resolve, reject) => {
        this.loadingCustomerInfo = true;
        CustomerService.updateCustomer(payload)
          .then(({ data }) => {
            this.loadingCustomerData = false;
            resolve(data);
          })
          .catch((error) => {
            if (error.response.status === 403) {
              this.unauthorized = true;
            }

            this.loadingCustomerInfo = false;
            this.error = getError(error);
            reject(error);
          })
          .finally(() => {
            this.loadingCustomerInfo = false;
          });
      });
    },

    /**
     * Customer Types
     */
    getCustomerTypes(options) {
      return new Promise((resolve, reject) => {
        this.loadingCustomerData = true;
        CustomerService.getCustomerTypes(options)
          .then(({ data }) => {
            this.customerTypes = data.data;
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

            this.loadingCustomerData = false;
            this.error = getError(error);
            reject(error);
          })
          .finally(() => {
            this.loadingCustomerData = false;
          });
      });
    },
    getSingleCustomerType(id) {
      return new Promise((resolve, reject) => {
        this.loadingCustomerData = true;
        CustomerService.getSingleCustomerType(id)
          .then(({ data }) => {
            this.customerType = data.data;
            resolve(data);
          })
          .catch((error) => {
            if (error.response.status === 403) {
              this.unauthorized = true;
            }

            this.loadingCustomerData = false;
            this.error = getError(error);
            reject(error);
          })
          .finally(() => {
            this.loadingCustomerData = false;
          });
      });
    },
    updateCustomerType(payload) {
      return new Promise((resolve, reject) => {
        this.loadingCustomerData = true;
        CustomerService.updateCustomerType(payload)
          .then(({ data }) => {
            this.loadingCustomerData = false;
            resolve(data);
          })
          .catch((error) => {
            if (error.response.status === 403) {
              this.unauthorized = true;
            }

            this.loadingCustomerData = false;
            this.error = getError(error);
            reject(error);
          })
          .finally(() => {
            this.loadingCustomerData = false;
          });
      });
    },

    /**
     * Customer Groups
     */
    getCustomerGroups(options) {
      return new Promise((resolve, reject) => {
        this.loadingCustomerData = true;
        CustomerService.getCustomerGroups(options)
          .then(({ data }) => {
            this.customerGroups = data.data;
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

            this.loadingCustomerData = false;
            this.error = getError(error);
            reject(error);
          })
          .finally(() => {
            this.loadingCustomerData = false;
          });
      });
    },
    getSingleCustomerGroup({ commit }, id) {
      return new Promise((resolve, reject) => {
        this.loadingCustomerData = true;
        CustomerService.getSingleCustomerGroup(id)
          .then(({ data }) => {
            commit("SET_CUSTOMER_TYPE", data.data);
            commit("SET_LOADING", false);
            resolve(data);
          })
          .catch((error) => {
            if (error.response.status === 403) {
              this.unauthorized = true;
            }

            this.loadingCustomerData = false;
            this.error = getError(error);
            reject(error);
          })
          .finally(() => {
            this.loadingCustomerData = false;
          });
      });
    },
    updateCustomerGroup(payload) {
      return new Promise((resolve, reject) => {
        this.loadingCustomerData = true;
        CustomerService.updateCustomerGroup(payload)
          .then(({ data }) => {
            this.loadingCustomerData = false;
            resolve(data);
          })
          .catch((error) => {
            if (error.response.status === 403) {
              this.unauthorized = true;
            }

            this.loadingCustomerData = false;
            this.error = getError(error);
            reject(error);
          })
          .finally(() => {
            this.loadingCustomerData = false;
          });
      });
    },

    /**
     * Customer KYC
     */
    getCustomerKYC(payload) {
      return new Promise((resolve, reject) => {
        //   commit("SET_LOADING", true);
        CustomerService.getKYCDetails(payload)
          .then(({ data }) => {
            resolve(data);
          })
          .catch((err) => {
            //    commit("SET_ERROR", getError(err));
            reject(err);
          })
          .finally(() => {
            //     commit("SET_LOADING", false);
          });
      });
    },
    updateCustomerKYC(payload) {
      return new Promise((resolve, reject) => {
        //  commit("SET_LOADING", true);
        //    CustomerService.updateKYCDetails(payload.get("customer_id"), payload)
        CustomerService.updateKYCDetails(payload.get("customer_id"), payload)
          .then((response) => {
            resolve(response);
          })
          .catch((err) => {
            //    commit("SET_ERROR", getError(err));
            reject(err);
          })
          .finally(() => {
            //     commit("SET_LOADING", false);
          });
      });
    },

    /**
     * Customer Users
     */
    getCustomerUsers(payload) {
      return new Promise((resolve, reject) => {
        this.loadingCustomerData = true;
        CustomerService.getCustomerUsers(payload)
          .then(({ data }) => {
            this.customerUsers = data.data;
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

            this.loadingCustomerData = false;
            this.error = getError(error);
            reject(error);
          })
          .finally(() => {
            this.loadingCustomerData = false;
          });
      });
    },
    getCustomerUser(payload) {
      return new Promise((resolve, reject) => {
        // commit("SET_LOADING", true);
        CustomerService.getCustomerUser(payload)
          .then(({ data }) => {
            this.customerUser = data;
            resolve(data);
          })
          .catch((error) => {
            if (error.response.status === 403) {
              this.unauthorized = true;
            }

            this.loadingCustomerData = false;
            this.error = getError(error);
            reject(error);
          })
          .finally(() => {
            this.loadingCustomerData = false;
          });
      });
    },
    getCustomerUserOptions({ commit }, payload) {
      return new Promise((resolve, reject) => {
        commit("SET_LOADING", true);
        CustomerService.getCustomerUserOptions(
          payload.customer_id,
          payload.user_id
        )
          .then(({ data }) => {
            commit("SET_LOADING", false);
            resolve(data);
          })
          .catch((err) => {
            commit("SET_LOADING", false);
            commit("SET_ERROR", getError(err));
            reject(err);
          });
      });
    },
    updateCustomerUser(payload) {
      return new Promise((resolve, reject) => {
        //   commit("SET_LOADING", true);
        CustomerService.updateCustomerUser(payload)
          .then(({ data }) => {
            //         commit("SET_LOADING", false);
            resolve(data);
          })
          .catch((error) => {
            if (error.response.status === 403) {
              this.unauthorized = true;
            }

            this.loadingCustomerData = false;
            this.error = getError(error);
            reject(error);
          })
          .finally(() => {
            this.loadingCustomerData = false;
          });
      });
    },
    addCustomerUser(payload) {
      return new Promise((resolve, reject) => {
        // commit("SET_LOADING", true);
        //  CustomerService.addCustomerUser(payload.customer_id, payload.request)
        CustomerService.addCustomerUser(payload)
          .then(({ data }) => {
            //     commit("SET_LOADING", false);
            resolve(data);
          })
          .catch((error) => {
            if (error.response.status === 403) {
              this.unauthorized = true;
            }

            this.loadingCustomerData = false;
            this.error = getError(error);
            reject(error);
          })
          .finally(() => {
            this.loadingCustomerData = false;
          });
      });
    },

    /**
     * Customer Permissions
     */
    getCustomerPermissionsList(customer_id) {
      return new Promise((resolve, reject) => {
        this.loadingCustomerData = true;
        CustomerService.getCustomerPermissions(customer_id)
          .then(({ data }) => {
            // this.customerPermissions = data.customer_permissions;
            // this.adminPermissions = data.customer_permissions;
            // this.enabledPermissions = data.enabled_permissions;
            this.customerPermissionList = data;

            console.log(data);
            this.meta.total = data.total;
            this.meta.from = data.from;
            this.meta.to = data.to;
            this.meta.last_page = data.last_page;
            resolve(data);
          })
          .catch((error) => {
            // if (error.response.status === 403) {
            //   this.unauthorized = true;
            // }

            this.loadingCustomerData = false;
            this.error = getError(error);
            reject(error);
          })
          .finally(() => {
            this.loadingCustomerData = false;
          });
      });
    },
    updateCustomerPermissions(payload) {
      return new Promise((resolve, reject) => {
        this.loadingCustomerData = true;
        // CustomerService.updateCustomerPermissions(
        //   payload.customer_id,
        //   payload.request
        // )
        CustomerService.updateCustomerPermissions(payload)
          .then(({ data }) => {
            this.customerPermission = data;
            resolve(data);
          })
          .catch((error) => {
            if (error.response.status === 403) {
              this.unauthorized = true;
            }

            this.loadingCustomerData = false;
            this.error = getError(error);
            reject(error);
          })
          .finally(() => {
            this.loadingCustomerData = false;
          });
      });
    },
  },
  getters: {
    // loading: (state) => state.loading,
    // error: (state) => state.error,
    // customers: (state) => state.customers,
    // customer: (state) => state.customer,
    // customerTypes: (state) => state.customerTypes,
    // customerType: (state) => state.customerType,
    // customerGroups: (state) => state.customerGroups,
    // customerGroup: (state) => state.customerGroup,
  },
});
