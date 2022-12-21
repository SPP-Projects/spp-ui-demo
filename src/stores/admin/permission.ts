import { defineStore } from "pinia";

import PermissionService from "@/services/admin/PermissionService";

export const useAdminPermissionStore = defineStore("adminPermissionStore", {
  state: () => ({
    permissions: [],
    permission: {},
    permissionTypes: [],
    permissionType: {},
    permissionGroups: [],
    permissionGroup: {},

    permission_options: [],

    //shared
    error: null,
    loading: false,
  }),
  actions: {
    getAllPermissions(options) {
      return new Promise((resolve, reject) => {
        // commit("SET_LOADING", true);
        PermissionService.getAllPermissions(options)
          .then(({ data }) => {
            //   commit("SET_PERMISSIONS", data.data);
            resolve(data);
          })
          .catch((err) => {
            //   commit("SET_ERROR", getError(err));
            reject(err);
          })
          .finally();
      });
    },

    getSinglePermission(id) {
      return new Promise((resolve, reject) => {
        //  commit("SET_LOADING", true);
        PermissionService.getPermissionGroup(id)
          .then(({ data }) => {
            //     commit("SET_PERMISSION", data.data);
            resolve(data);
          })
          .catch((err) => {
            //      commit("SET_ERROR", getError(err));
            reject(err);
          })
          .finally();
      });
    },

    addPermission(payload) {
      return new Promise((resolve, reject) => {
        //   commit("SET_LOADING", true);
        PermissionService.addPermission(payload)
          .then((response) => {
            //   commit("SET_NEW_PERMISSION", response);
            resolve(response);
          })
          .catch((err) => {
            //     commit("SET_ERROR", getError(err));
            reject(err);
          })
          .finally();
      });
    },

    getAllPermissionGroups(options) {
      return new Promise((resolve, reject) => {
        //   commit("SET_LOADING", true);
        PermissionService.getAllPermissionGroups(options)
          .then(({ data }) => {
            //    commit("SET_PERMISSION_GROUPS", data.data);
            resolve(data);
          })
          .catch((err) => {
            //     commit("SET_ERROR", getError(err));
            reject(err);
          })
          .finally();
      });
    },

    getSinglePermissionGroup(id) {
      return new Promise((resolve, reject) => {
        //    commit("SET_LOADING", true);
        PermissionService.getPermissionGroup(id)
          .then(({ data }) => {
            //     commit("SET_PERMISSION_GROUP", data.data);
            resolve(data);
          })
          .catch((err) => {
            //      commit("SET_ERROR", getError(err));
            reject(err);
          })
          .finally();
      });
    },

    addPermissionGroup(payload) {
      return new Promise((resolve, reject) => {
        //  commit("SET_LOADING", true);
        PermissionService.addPermissionGroup(payload)
          .then((response) => {
            //    commit("SET_NEW_PERMISSION_GROUP", response);
            resolve(response);
          })
          .catch((err) => {
            //    commit("SET_ERROR", getError(err));
            reject(err);
          })
          .finally();
      });
    },

    updatePermissionGroup(payload) {
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

    getAllPermissionTypes(options) {
      return new Promise((resolve, reject) => {
        //  commit("SET_LOADING", true);
        PermissionService.getAllPermissionTypes(options)
          .then(({ data }) => {
            //  commit("SET_PERMISSION_TYPES", data.data);
            resolve(data);
          })
          .catch((err) => {
            //   commit("SET_ERROR", getError(err));
            reject(err);
          })
          .finally();
      });
    },

    getSinglePermissionTYPE(id) {
      return new Promise((resolve, reject) => {
        //  commit("SET_LOADING", true);
        PermissionService.getPermissionType(id)
          .then(({ data }) => {
            //      commit("SET_PERMISSION_TYPE", data.data);
            resolve(data);
          })
          .catch((err) => {
            //    commit("SET_ERROR", getError(err));
            reject(err);
          })
          .finally();
      });
    },

    addPermissionType(payload) {
      return new Promise((resolve, reject) => {
        //    commit("SET_LOADING", true);
        PermissionService.addPermissionType(payload)
          .then((response) => {
            //     commit("SET_NEW_PERMISSION_TYPE", response);
            resolve(response);
          })
          .catch((err) => {
            //      commit("SET_ERROR", getError(err));
            reject(err);
          })
          .finally();
      });
    },

    updatePermissionType(payload) {
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

    updatePermission(payload) {
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

    getPermissionOptions() {
      return new Promise((resolve, reject) => {
        //    commit("SET_LOADING", true);
        PermissionService.getPermissionOptions()
          .then(({ data }) => {
            //     commit("SET_PERMISSION_OPTIONS", data);
            resolve(data);
          })
          .catch((err) => {
            //     commit("SET_ERROR", getError(err));
            reject(err);
          })
          .finally();
      });
    },
  },
  getters: {
    // loading: (state) => state.loading,
    // error: (state) => state.error,
    // permissions: (state) => state.permissions,
    // permission: (state) => state.permission,
    // permission_groups: (state) => state.permissionGroups,
    // permission_group: (state) => state.permissionGroup,
    // permission_types: (state) => state.permissionTypes,
    // permission_type: (state) => state.permissionType,
    // permission_options: (state) => state.permission_options,
  },
});
