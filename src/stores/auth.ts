import { ref } from "vue";
import { defineStore } from "pinia";
import ApiService from "@/core/services/ApiService";
import JwtService from "@/core/services/JwtService";
import { useCustomerUserStore } from "@/stores/customer/user";
import type { User } from "@/models/user";

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
  const authenticatedUser = ref({ id: 0 } as User);

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
      if (value === "admin") {
        return true;
      } else {
        return false;
      }
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
    console.log("state", status);
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
      if (localStorage.getItem("isAdminMode") === "admin") {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  function setAuthUser(data) {
    //TODO - MOVE TO CENTRALISED LOCATIONS
    //save user id in local storage
    window.localStorage.setItem("userid", data.id);

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
  }

  function login(credentials: CoreUser) {
    return ApiService.post("/v1/sanctum/token", credentials)
      .then(({ data }) => {
        console.log(data);
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
    return ApiService.post("forgot_password", email)
      .then(() => {
        setError({});
      })
      .catch(({ response }) => {
        setError(response.data.errors);
      });
  }

  function verifyAuth() {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.get("/v1/user?with_permissions=true&with_customer=true")
        .then(({ data }) => {
          //TODO  -move to centralised location
          //setAuth(data);
          setAuthUser(data);

          const userStore = useCustomerUserStore();
          userStore.getUser(data.id);
        })
        .catch(({ response }) => {
          //TODO
          setError(response.data.errors);
          //purgeAuth();
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
    //TODO
    isAdminMode,
    setAdminMode,
    getAdminMode,
  };
});
