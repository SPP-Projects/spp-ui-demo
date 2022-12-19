import ApiService from "@/core/services/ApiService";

class KycService {
  //TODO - REMOVE REDUNDANT
  getKycRequirements() {
    return ApiService.post("/v1/kyc/requirements", {});
  }

  getKycDetails() {
    return ApiService.post("/v1/kyc/details", {});
  }

  updateKYC(payload) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return ApiService.post(`/v1/customer/update`, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
}

export default new KycService();
