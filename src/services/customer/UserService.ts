import ApiService from "@/core/services/ApiService";

class UserService {
  getUsers(options) {
    return ApiService.get(
      `/v1/users?page=${options.current_page}&page_size=${options.page_size}&search_text=${options.search_text}&sort_column=${options.sort.column}&sort_direction=${options.sort.direction}`
    );
  }

  getUsersCount(options) {
    return ApiService.post(`/v1/users/count`, options);
  }

  getUser(id) {
    return ApiService.get(`/v1/user/${id}`);
  }

  updateUser(payload) {
    return ApiService.post(`/v1/user/${payload.id}`, payload);
  }
  addUser(payload) {
    return ApiService.post(`/v1/users/add`, payload);
  }

  //TODO - merge wth main AuthService
  getAuthenticatedUser() {
    return ApiService.get("/v1/user?with_permissions=true&with_customer=true");
  }

  //TODO - move to central locatio?
  getCustomerPermissions() {
    return ApiService.get("/v1/permissions");
  }
}

export default new UserService();
