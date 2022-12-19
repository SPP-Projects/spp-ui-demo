import { CaretakerApiService } from "@/services/guest/CaretakerApiService";
import TokenService from "@/services/TokenService";

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
          TokenService.setUserToken(response.data.token);
          TokenService.saveToken(response.data.token);
        }
        //TODO - INITIATE USER AUTH DETAILS
        //AuthService.initAuthUser();
        return response;
      }
    );
  }
}

export default new OnboardingService();
