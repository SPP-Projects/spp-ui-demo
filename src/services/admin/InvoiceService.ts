import ApiService from "@/core/services/ApiService";
class InvoiceService {
  getAllInvoices(options) {
    return ApiService.get(
      `/v1/admin/invoices?page=${options.current_page}&page_size=${options.page_size}&search_text=${options.search_text}&sort_column=${options.sort.column}&sort_direction=${options.sort.direction}`
    );
  }

  getInvoiceByReference(ref) {
    return ApiService.get(`/v1/admin/invoices/${ref}`);
  }

  updateInvoiceStatus(options, reference) {
    return ApiService.post(`/v1/admin/invoices/${reference}`, options);
  }
}

export default new InvoiceService();
