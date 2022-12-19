import ApiService from "@/core/services/ApiService";

class PermissionService {
  /**
   * Permissions
   */
  getAllPermissions(options) {
    return ApiService.get(
      `/v1/admin/permissions?page=${options.current_page}&page_size=${options.page_size}&search_text=${options.search_text}&sort_column=${options.sort.column}&sort_direction=${options.sort.direction}`
    );
  }
  getSinglePermission(id) {
    return ApiService.get(`/v1/admin/permissions/${id}`);
  }
  getPermissionOptions() {
    return ApiService.get(`/v1/admin/permissions/options`);
  }
  updatePermission(options) {
    return ApiService.patch(`/v1/admin/permissions/${options.id}`, options);
  }
  addPermission(payload) {
    return ApiService.post(`/v1/admin/permissions`, payload);
  }

  /**
   * Permission Groups
   */
  getAllPermissionGroups(options) {
    return ApiService.get(
      `/v1/admin/permission-groups?page=${options.current_page}&page_size=${options.page_size}&search_text=${options.search_text}&sort_column=${options.sort.column}&sort_direction=${options.sort.direction}`
    );
  }
  getPermissionGroup(id) {
    return ApiService.get(`/v1/admin/permission-groups/${id}`);
  }
  addPermissionGroup(payload) {
    return ApiService.post(`/v1/admin/permission-groups`, payload);
  }
  updatePermissionGroup(options) {
    return ApiService.patch(
      `/v1/admin/permission-groups/${options.id}`,
      options
    );
  }

  /**
   * Permission Types
   */
  getAllPermissionTypes(options) {
    return ApiService.get(
      `/v1/admin/permission-types?page=${options.current_page}&page_size=${options.page_size}&search_text=${options.search_text}&sort_column=${options.sort.column}&sort_direction=${options.sort.direction}`
    );
  }
  getPermissionType(id) {
    return ApiService.get(`/v1/admin/permission-types/${id}`);
  }
  addPermissionType(payload) {
    return ApiService.post(`/v1/admin/permission-types`, payload);
  }
  updatePermissionType(options) {
    return ApiService.patch(
      `/v1/admin/permission-types/${options.id}`,
      options
    );
  }
}

export default new PermissionService();
