import { CaretakerApiService } from "@/services/guest/CaretakerApiService";
import JwtService from "@/core/services/JwtService";
import { useAuthStore } from "@/stores/auth";

class OnboardingService {
  getCustomerType() {
    return CaretakerApiService.get("/v1/customer/types");
  }

  getAccountType(data) {
    return CaretakerApiService.post("/v1/account/types", data);
  }

  getKYCRequirements(data) {
    return CaretakerApiService.post("/v1/kyc/requirements", data);
  }

  registerCustomer(data) {
    return CaretakerApiService.post("/v1/customer/register", data).then(
      (response) => {
        if (response.data) {
          //TODO - MOVE TO CENTRAL PLACE
          //set token for authenticated session
          //   TokenService.setUserToken(response.data.token);
          //  TokenService.saveToken(response.data.token);
          JwtService.saveToken(response.data.token);
          const authStore = useAuthStore();
          authStore.isAuthenticated = true;
        }
        //TODO - INITIATE USER AUTH DETAILS
        //AuthService.initAuthUser();
        return response;
      }
    );
  }

  initiateForgotPassword(data) {
    return CaretakerApiService.post(
      "/v1/customer/forgot-password/initiate",
      data
    );
  }
  validateResetCode(data) {
    return CaretakerApiService.post(
      "/v1/customer/forgot-password/validate-code",
      data
    );
  }
  resetPassword(data) {
    return CaretakerApiService.post(
      "/v1/customer/forgot-password/reset-password",
      data
    );
  }
}

export default new OnboardingService();
