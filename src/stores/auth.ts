import { ref } from "vue";
import { defineStore } from "pinia";
import ApiService from "@/core/services/ApiService";
import JwtService from "@/core/services/JwtService";
import { useCustomerUserStore } from "@/stores/customer/user";
import type { iUser } from "@/models/user";
import { CaretakerApiService } from "@/services/guest/CaretakerApiService";
import { useStorage } from "@vueuse/core";

export interface CoreUser {
  name: string;
  surname: string;
  email: string;
  password: string;
  token: string;
}

export const useAuthStore = defineStore("auth", () => {
  const errors = ref({});
  const user = ref<CoreUser>({} as CoreUser);
  const isAuthenticated = ref(!!JwtService.getToken());
  const authenticatedUser = ref({ id: 0 } as iUser);
  const authPermissions = ref([] as any);
  const hasAuthorisedAccess = ref(false);
  const loadingPermissions = ref(false);
  const getJSONFromLocalStorage = (key) => {
    const value = window.localStorage.getItem(key);

    if (
      value === "undefined" ||
      value === "null" ||
      value === undefined ||
      value === null
    ) {
      return false;
    } else {
      return value === "admin";
    }
  };

  //TODO - set user mode
  // const isAdminMode =
  //   getJSONFromLocalStorage("isAdminMode") || (false as boolean);
  const isAdminMode = ref(
    getJSONFromLocalStorage("isAdminMode") || (false as boolean)
  );
  //TODO - set user mode
  function setAuth(authUser: CoreUser) {
    isAuthenticated.value = true;
    user.value = authUser;
    errors.value = {};
    JwtService.saveToken(user.value.token);
  }
  //TODO - set user mode
  function setAdminMode(status) {
    //save auth user details in state

    if (status) {
      localStorage.setItem("isAdminMode", "admin");
      isAdminMode.value = true;
    } else {
      isAdminMode.value = false;
      localStorage.setItem("isAdminMode", "user");
    }
  }

  function getAdminMode() {
    if (localStorage.getItem("isAdminMode")) {
      return localStorage.getItem("isAdminMode") === "admin";
    } else {
      return false;
    }
  }

  function setAuthUser(data) {
    //TODO - MOVE TO CENTRALISED LOCATIONS
    //save user id in local storage
    window.localStorage.setItem("userid", data.id);
    // window.localStorage.setItem("userpermissions", data.permissions);
    window.localStorage.setItem(
      "userpermissions",
      JSON.stringify(data.permissions)
    );
    //save auth user details in state
    authenticatedUser.value = data;
  }

  function setError(error: any) {
    errors.value = { ...error };
  }

  function purgeAuth() {
    isAuthenticated.value = false;
    user.value = {} as CoreUser;
    errors.value = [];
    JwtService.destroyToken();

    //TODO
    //DESTROY SPPAY VARIABLES
    authenticatedUser.value = { id: 0 } as iUser;
    isAdminMode.value = false;
    authPermissions.value = null;
    window.localStorage.removeItem("userpermissions");
    window.localStorage.removeItem("userid");
    window.localStorage.removeItem("isAdminMode");
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("userid");
    window.localStorage.removeItem("validatedRemittanceResponse");
    window.localStorage.removeItem("fxRates");
    window.localStorage.removeItem("checkRates");
    window.localStorage.removeItem("exchangeRates");
    window.localStorage.removeItem("exchangeRate");
    // Reset all stores
  }

  function login(credentials: CoreUser) {
    return ApiService.post("/v1/sanctum/token", credentials)
      .then(({ data }) => {
        setAuth(data);
      })
      .catch(({ response }) => {
        //TODO - CATCH ERROR IN ARRAY ITEM 1
        setError([response.data.error]);
      });
  }

  function logout() {
    purgeAuth();
  }

  function register(credentials: CoreUser) {
    return ApiService.post("register", credentials)
      .then(({ data }) => {
        setAuth(data);
      })
      .catch(({ response }) => {
        setError(response.data.errors);
      });
  }

  function forgotPassword(email: string) {
    console.log(email);
    return CaretakerApiService.post(
      "/v1/customer/forgot-password/initiate",
      email
    )
      .then(({ data }) => {
        setError({});
        return data;
      })
      .catch(({ response }) => {
        setError(response.data.errors);
        return response;
      });
  }

  function verifyAuth() {
    if (JwtService.getToken()) {
      loadingPermissions.value = true;
      ApiService.setHeader();
      ApiService.get("/v1/user?with_permissions=true&with_customer=true")
        .then(({ data }) => {
          //TODO  -move to centralised location
          //setAuth(data);
          setAuthUser(data);

          //TODO
          //store user permissions in local storage
          authPermissions.value = data.permissions;

          const userStore = useCustomerUserStore();
          userStore.getUser(data.id);
        })
        .catch(({ response }) => {
          //TODO
          setError(response.data.errors);
          //purgeAuth();
        })
        .finally(() => {
          loadingPermissions.value = false;
        });
    } else {
      //TODO
      //purgeAuth();
    }
  }

  return {
    errors,
    user,
    isAuthenticated,
    login,
    logout,
    register,
    forgotPassword,
    verifyAuth,
    authenticatedUser,
    authPermissions,
    hasAuthorisedAccess,

    //TODO
    isAdminMode,
    setAdminMode,
    getAdminMode,

    //
    loadingPermissions,
  };
});
