import { defineStore } from "pinia";
import { getError } from "@/helpers/errors";
import PermissionService from "@/services/admin/PermissionService";

export const useAdminPermissionStore = defineStore("adminPermissionStore", {
  state: () => ({
    permissions: [],
    permission: {},
    permissionTypes: [],
    permissionType: {},
    permissionGroups: [],
    permissionGroup: {},
    loading: false,
    permission_options: [],
    error: null,
  }),
  actions: {
    /*********MANAGE PERMISSIONS ********/
    getAllPermissions({ commit }, options) {
      return new Promise((resolve, reject) => {
        commit("SET_LOADING", true);
        PermissionService.getAllPermissions(options)
          .then(({ data }) => {
            commit("SET_PERMSSIONS", data.data);
            resolve(data);
          })
          .catch((err) => {
            commit("SET_ERROR", getError(err));
            reject(err);
          })
          .finally(() => commit("SET_LOADING", false));
      });
    },

    getSinglePermission({ commit }, id) {
      return new Promise((resolve, reject) => {
        commit("SET_LOADING", true);
        PermissionService.getPermissionGroup(id)
          .then(({ data }) => {
            commit("SET_PERMISSION", data.data);
            resolve(data);
          })
          .catch((err) => {
            commit("SET_ERROR", getError(err));
            reject(err);
          })
          .finally(() => commit("SET_LOADING", false));
      });
    },

    addPermission({ commit }, payload) {
      return new Promise((resolve, reject) => {
        commit("SET_LOADING", true);
        PermissionService.addPermission(payload)
          .then((response) => {
            commit("SET_NEW_PERMISSION", response);
            resolve(response);
          })
          .catch((err) => {
            commit("SET_ERROR", getError(err));
            reject(err);
          })
          .finally(() => commit("SET_LOADING", false));
      });
    },

    /********* PERMISSION GROUPS **********/

    getAllPermissionGroups({ commit }, options) {
      return new Promise((resolve, reject) => {
        commit("SET_LOADING", true);
        PermissionService.getAllPermissionGroups(options)
          .then(({ data }) => {
            commit("SET_PERMISSION_GROUPS", data.data);
            resolve(data);
          })
          .catch((err) => {
            commit("SET_ERROR", getError(err));
            reject(err);
          })
          .finally(() => commit("SET_LOADING", false));
      });
    },

    getSinglePermissionGroup({ commit }, id) {
      return new Promise((resolve, reject) => {
        commit("SET_LOADING", true);
        PermissionService.getPermissionGroup(id)
          .then(({ data }) => {
            commit("SET_PERMISSION_GROUP", data.data);
            resolve(data);
          })
          .catch((err) => {
            commit("SET_ERROR", getError(err));
            reject(err);
          })
          .finally(() => commit("SET_LOADING", false));
      });
    },

    addPermissionGroup({ commit }, payload) {
      return new Promise((resolve, reject) => {
        commit("SET_LOADING", true);
        PermissionService.addPermissionGroup(payload)
          .then((response) => {
            commit("SET_NEW_PERMISSION_GROUP", response);
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
    updatePermissionGroup({ commit }, payload) {
      return new Promise((resolve, reject) => {
        PermissionService.updatePermissionGroup(payload)
          .then(({ data }) => {
            resolve(data);
          })
          .catch((err) => {
            reject(err);
          })
          .finally();
      });
    },

    /********* PERMISSION TYPE **********/
    getAllPermissionTypes({ commit }, options) {
      return new Promise((resolve, reject) => {
        commit("SET_LOADING", true);
        PermissionService.getAllPermissionTypes(options)
          .then(({ data }) => {
            commit("SET_PERMISSION_TYPES", data.data);
            resolve(data);
          })
          .catch((err) => {
            commit("SET_ERROR", getError(err));
            reject(err);
          })
          .finally(() => commit("SET_LOADING", false));
      });
    },

    getSinglePermissionTYPE({ commit }, id) {
      return new Promise((resolve, reject) => {
        commit("SET_LOADING", true);
        PermissionService.getPermissionType(id)
          .then(({ data }) => {
            commit("SET_PERMISSION_TYPE", data.data);
            resolve(data);
          })
          .catch((err) => {
            commit("SET_ERROR", getError(err));
            reject(err);
          })
          .finally(() => commit("SET_LOADING", false));
      });
    },

    addPermissionType({ commit }, payload) {
      return new Promise((resolve, reject) => {
        commit("SET_LOADING", true);
        PermissionService.addPermissionType(payload)
          .then((response) => {
            commit("SET_NEW_PERMISSION_TYPE", response);
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
    updatePermissionType({ commit }, payload) {
      return new Promise((resolve, reject) => {
        PermissionService.updatePermissionType(payload)
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
    updatePermission({ commit }, payload) {
      return new Promise((resolve, reject) => {
        PermissionService.updatePermission(payload)
          .then(({ data }) => {
            resolve(data);
          })
          .catch((err) => {
            reject(err);
          })
          .finally();
      });
    },

    getPermissionOptions({ commit }) {
      return new Promise((resolve, reject) => {
        commit("SET_LOADING", true);
        PermissionService.getPermissionOptions()
          .then(({ data }) => {
            commit("SET_PERMISSION_OPTIONS", data);
            resolve(data);
          })
          .catch((err) => {
            commit("SET_ERROR", getError(err));
            reject(err);
          })
          .finally(() => commit("SET_LOADING", false));
      });
    },
  },
  getters: {
    loading: (state) => state.loading,
    error: (state) => state.error,
    permissions: (state) => state.permissions,
    permission: (state) => state.permission,
    permission_groups: (state) => state.permissionGroups,
    permission_group: (state) => state.permissionGroup,
    permission_types: (state) => state.permissionTypes,
    permission_type: (state) => state.permissionType,
    permission_options: (state) => state.permission_options,
  },
});
