import axios from "axios";
import TokenService from "@/services/TokenService";

export const CaretakerApiService = axios.create({
  //activate proxy for baseUrl if engine is hosted online
  // baseURL:
  //   process.env.VUE_APP_ENGINE_LOCATION === "online"
  //     ? "/"
  //     : process.env.VUE_APP_ENGINE_URL_LOCAL + "/",
  baseURL: "https://engine.sppay.dev",
  withCredentials: true, // required to handle the CSRF token
});

//interceptors to logout when api has errors [401 & 409].
CaretakerApiService.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    const originalRequest = error.config;

    if (error.response && [419].includes(error.response.status)) {
      originalRequest._retry = true;
      return CaretakerApiService.post("/v1/sanctum/token", {
        email: "caretaker@sppaysolutions.com",
        password: "Car3t@k3r&^",
        device_name: navigator.userAgent,
      }).then(({ data }) => {
        TokenService.setCaretakerAccessToken(data.token);
        axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
        originalRequest.headers["Authorization"] = `Bearer ${data.token}`;

        axios.defaults.headers.common["Accept"] = "application/json";
        return axios(originalRequest);
      });
    }
    return Promise.reject(error);
  }
);

// interceptors to add token
CaretakerApiService.interceptors.request.use(
  (config) => {
    const token = TokenService.getCaretakerAccessToken();
    if (token) {
      if (config.headers) {
        config.headers["Authorization"] = "Bearer " + token;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
