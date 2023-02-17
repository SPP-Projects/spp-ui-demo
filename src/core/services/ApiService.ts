import type { App } from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import JwtService from "@/core/services/JwtService";
import type { AxiosResponse } from "axios";
import router from "@/router";
import { useAuthStore } from "@/stores/auth";
import type { ProgressFinisher } from "@marcoschulte/vue3-progress";
import { useProgress } from "@marcoschulte/vue3-progress";

/**
 * @description service to call HTTP request via Axios
 */
class ApiService {
  /**
   * @description property to share vue instance
   */
  public static vueInstance: App;

  /**
   * @description initialize vue axios
   */
  public static init(app: App<Element>) {
    ApiService.vueInstance = app;
    ApiService.vueInstance.use(VueAxios, axios);
    //TODO
    // ApiService.vueInstance.axios.defaults.baseURL =
    //   import.meta.env.VITE_APP_API_URL;
    ApiService.vueInstance.axios.defaults.baseURL = "https://engine.sppay.dev";
    // ApiService.vueInstance.axios.defaults.baseURL = "http://localhost";

    //TODO - Interceptors to Logout Users on 401 & 409 errors
    //interceptors to logout when api has errors [401 & 409]
    ApiService.vueInstance.axios.interceptors.response.use(
      (response) => {
        return response;
      },
      function (error) {
        if (error.response && [401, 419].includes(error.response.status)) {
          const store = useAuthStore();
          store.logout();
          router.push({ name: "sign-in" });
        }
        return Promise.reject(error);
      }
    );

    //TODO
    //progress-bar for api connections
    const progresses = [] as ProgressFinisher[];
    axios.interceptors.request.use((config) => {
      progresses.push(useProgress().start());
      return config;
    });
    axios.interceptors.response.use(
      (resp) => {
        progresses.pop()?.finish();
        return resp;
      },
      (error) => {
        progresses.pop()?.finish();
        return Promise.reject(error);
      }
    );
    //progress-bar for api connections
  }

  /**
   * @description set the default HTTP request headers
   */
  public static setHeader(): void {
    ApiService.vueInstance.axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${JwtService.getToken()}`;
    ApiService.vueInstance.axios.defaults.headers.common["Accept"] =
      "application/json";
  }

  /**
   * @description send the GET HTTP request
   * @param resource: string
   * @param params: AxiosRequestConfig
   * @returns Promise<AxiosResponse>
   */
  public static query(resource: string, params: any): Promise<AxiosResponse> {
    return ApiService.vueInstance.axios.get(resource, params);
  }

  /**
   * @description send the GET HTTP request
   * @param resource: string
   * @param slug: string
   * @returns Promise<AxiosResponse>
   */
  public static get(
    resource: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    slug = "" as string
  ): Promise<AxiosResponse> {
    //TODO
    //return ApiService.vueInstance.axios.get(`${resource}/${slug}`);
    return ApiService.vueInstance.axios.get(`${resource}`);
  }

  /**
   * @description set the POST HTTP request
   * @param resource: string
   * @param params: AxiosRequestConfig
   * @returns Promise<AxiosResponse>
   */
  public static post(resource: string, params: any): Promise<AxiosResponse> {
    return ApiService.vueInstance.axios.post(`${resource}`, params);
  }

  /**
   * @description send the UPDATE HTTP request
   * @param resource: string
   * @param slug: string
   * @param params: AxiosRequestConfig
   * @returns Promise<AxiosResponse>
   */
  public static update(
    resource: string,
    slug: string,
    params: any
  ): Promise<AxiosResponse> {
    return ApiService.vueInstance.axios.put(`${resource}/${slug}`, params);
  }

  /**
   * @description Send the PUT HTTP request
   * @param resource: string
   * @param params: AxiosRequestConfig
   * @returns Promise<AxiosResponse>
   */
  public static put(resource: string, params: any): Promise<AxiosResponse> {
    return ApiService.vueInstance.axios.put(`${resource}`, params);
  }

  /**
   * @description Send the DELETE HTTP request
   * @param resource: string
   * @returns Promise<AxiosResponse>
   */
  public static delete(resource: string): Promise<AxiosResponse> {
    return ApiService.vueInstance.axios.delete(resource);
  }

  //TODO

  //add patch
  public static patch(resource: string, params: any): Promise<AxiosResponse> {
    return ApiService.vueInstance.axios.patch(`${resource}`, params);
  }
}

export default ApiService;
