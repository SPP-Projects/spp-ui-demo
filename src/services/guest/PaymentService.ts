import { CaretakerApiService } from "@/services/guest/CaretakerApiService";

class PaymentService {
  validatePayment(payload) {
    return CaretakerApiService.post(`/v1/pay/initiate`, payload);
  }

  submitPayment(payload) {
    return CaretakerApiService.post(`/v1/pay/confirm`, payload);
  }

  getInvoiceByReference(ref) {
    return CaretakerApiService.get(`/v1/invoices/${ref}/pay`);
  }

  getCampaign(ref) {
    return CaretakerApiService.get(`/v1/campaigns/${ref}/donate`);
  }
}

export default new PaymentService();
