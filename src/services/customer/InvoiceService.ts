import ApiService from "@/core/services/ApiService";
class InvoiceService {
  getAllInvoices(options) {
    return ApiService.get(
      `/v1/invoices/records?page=${options.current_page}&page_size=${options.page_size}&search_text=${options.search_text}&sort_column=${options.sort.column}&sort_direction=${options.sort.direction}`
    );
  }

  addInvoice(payload) {
    return ApiService.post(`/v1/invoices/add`, payload);
  }

  getInvoiceByReference(ref) {
    return ApiService.get(`/v1/invoices/${ref}`);
  }

  updateInvoiceStatus(options, reference) {
    console.log(reference);
    return ApiService.post(`/v1/invoices/${reference}`, options);
  }
}

export default new InvoiceService();
