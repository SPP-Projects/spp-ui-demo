import { CaretakerApiService } from "@/services/guest/CaretakerApiService";

class GeneralService {
  getInstitutions(data) {
    return CaretakerApiService.post("/v1/institutions", data);
  }
  getPermissions() {
    return CaretakerApiService.get("/v1/permissions");
  }
  getCountries() {
    return CaretakerApiService.get("/v1/countries");
  }
}

export default new GeneralService();
