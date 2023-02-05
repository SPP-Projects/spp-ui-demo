<template>
  <!--begin::Layout-->
  <PermissionDenied v-if="unauthorized" />
  <PageLoader v-else-if="loadingInvoiceData" />
  <div class="d-flex flex-column flex-lg-row" v-else>
    <!--begin::Content-->
    <div class="flex-lg-row-fluid me-lg-15 order-2 order-lg-1 mb-10 mb-lg-0">
      <!--begin::Alert-->
      <div
        class="alert alert-danger d-flex align-items-center p-5"
        v-if="invoiceDetails.status_id === '4'"
      >
        <!--begin::Icon-->
        <span class="svg-icon svg-icon-2hx svg-icon-primary me-3"></span>
        <!--end::Icon-->

        <!--begin::Wrapper-->
        <div class="d-flex flex-column">
          <!--begin::Title-->
          <h4 class="mb-1 text-dark"></h4>
          <!--end::Title-->
          <!--begin::Content-->
          <span
            >Invoice was cancelled on
            {{ formatDateTime(invoiceDetails.updated_at) }}.</span
          >
          <!--end::Content-->
        </div>
        <!--end::Wrapper-->
      </div>
      <!--end::Alert-->
      <!--begin::Card-->
      <div class="card card-flush pt-3 mb-5 mb-xl-10">
        <!--begin::Card header-->
        <div class="card-header">
          <!--begin::Card title-->
          <div class="card-title">
            <h2 class="fw-bold">Invoice # {{ invoiceDetails.reference }}</h2>
          </div>
          <!--begin::Card title-->
          <!--begin::Card toolbar-->

          <div class="card-toolbar" v-if="!loadingInvoiceData">
            <h2 class="fw-bold">
              Status:

              <span
                v-if="invoiceDetails.status_id === '1'"
                class="badge badge-light-primary"
                >Pending</span
              >
              <span
                v-if="invoiceDetails.status_id === '2'"
                class="badge badge-light-success"
                >Completed</span
              >
              <span
                v-if="invoiceDetails.status_id === '3'"
                class="badge badge-light-warning"
                >Rejected</span
              >
              <span
                v-if="invoiceDetails.status_id === '4'"
                class="badge badge-light-danger"
                >Cancelled</span
              >

              <span
                v-if="invoiceDetails.status_id === '5'"
                class="badge badge-secondary"
                >Draft</span
              >
            </h2>
          </div>
          <!--end::Card toolbar-->
        </div>
        <!--end::Card header-->
        <!--begin::Card body-->
        <div class="card-body pt-3">
          <!--begin::Section-->
          <div class="mb-10">
            <!--begin::Title-->
            <h5 class="mb-4">
              Issue Date: {{ formatDate(invoiceDetails.created_at) }}
            </h5>
            <!--end::Title-->
            <!--begin::Details-->
            <div class="d-flex flex-wrap py-5">
              <!--begin::Row-->
              <div class="flex-equal me-5">
                <!--begin::Details-->
                <table class="table fs-6 fw-semibold gs-0 gy-2 gx-2 m-0">
                  <!--begin::Row-->
                  <tr>
                    <td class="text-danger">Bill to:</td>
                    <td class="text-gray-800"></td>
                  </tr>
                  <!--end::Row-->
                  <!--begin::Row-->
                  <tr>
                    <td class="text-gray-400">Name:</td>
                    <td class="text-gray-800">
                      {{ invoiceDetails.bill_to_name }}
                    </td>
                  </tr>
                  <!--end::Row-->
                  <!--begin::Row-->
                  <tr>
                    <td class="text-gray-400">Email:</td>
                    <td class="text-gray-800">
                      {{ invoiceDetails.bill_to_email }}
                    </td>
                  </tr>
                  <!--end::Row-->
                  <!--begin::Row-->
                  <tr>
                    <td class="text-gray-400">Address:</td>
                    <td class="text-gray-800">
                      {{ invoiceDetails.bill_to_address }}
                    </td>
                  </tr>
                  <!--end::Row-->
                </table>
                <!--end::Details-->
              </div>
              <!--end::Row-->
              <!--begin::Row-->
              <div class="flex-equal">
                <!--begin::Details-->
                <table class="table fs-6 fw-semibold gs-0 gy-2 gx-2 m-0">
                  <!--begin::Row-->
                  <tr>
                    <td class="text-gray-400 min-w-175px w-175px"></td>
                    <td class="text-gray-800 min-w-200px"></td>
                  </tr>
                  <!--end::Row-->
                  <!--begin::Row-->
                  <tr>
                    <td class="text-gray-400">Customer Ref:</td>
                    <td class="text-gray-800">
                      {{ invoiceDetails.user_reference }}
                    </td>
                  </tr>
                  <!--end::Row-->
                  <!--begin::Row-->
                  <tr>
                    <td class="text-gray-400">Billing method:</td>
                    <td class="text-gray-800">
                      {{ invoiceDetails.po_number }}
                    </td>
                  </tr>
                  <!--end::Row-->
                  <!--begin::Row-->
                  <tr>
                    <td class="text-gray-400">Due Date:</td>
                    <td class="text-gray-800">{{ invoiceDetails.due_date }}</td>
                  </tr>
                  <!--end::Row-->
                </table>
                <!--end::Details-->
              </div>
              <!--end::Row-->
            </div>
            <!--end::Row-->
          </div>
          <!--end::Section-->
          <!--begin::Section-->
          <div class="mb-0">
            <!--begin::Title-->
            <h2 class="mb-4">Items:</h2>
            <!--end::Title-->
            <!--begin::Product table-->
            <div class="table-responsive">
              <!--begin::Table-->
              <table class="table align-middle table-row-dashed fs-6 gy-3 mb-0">
                <!--begin::Table head-->
                <thead>
                  <tr
                    class="text-start text-gray-400 fw-bold fs-7 text-uppercase gs-0"
                  >
                    <th class="min-w-175px">Product</th>

                    <th class="min-w-70px text-end">Qty</th>
                    <th class="min-w-100px text-end">Unit Price</th>
                    <th class="min-w-100px text-end">Total</th>
                  </tr>
                </thead>
                <!--end::Table head-->
                <!--begin::Table body-->
                <tbody class="fw-semibold text-gray-600">
                  <!--begin::Products-->
                  <tr v-for="(item, index) in invoiceItems" :key="index">
                    <!--begin::Product-->
                    <td>
                      <div class="d-flex align-items-center">
                        <!--begin::Title-->
                        <div class="ms">
                          <span
                            class="fw-bold text-gray-800 text-hover-primary"
                            >{{ item.description }}</span
                          >
                          <div class="fs-7 text-muted"></div>
                        </div>
                        <!--end::Title-->
                      </div>
                    </td>
                    <!--end::Product-->

                    <!--begin::Quantity-->
                    <td class="text-end">{{ item.quantity }}</td>
                    <!--end::Quantity-->
                    <!--begin::Price-->
                    <td class="text-end">{{ item.quantity }}</td>
                    <!--end::Price-->
                    <!--begin::Total-->
                    <td class="text-end">
                      {{ formatCurrencyAmount(item.amount) }}
                    </td>
                    <!--end::Total-->
                  </tr>

                  <!--end::Products-->
                  <!--begin::Subtotal-->
                  <tr>
                    <td colspan="3" class="text-end">Subtotal</td>
                    <td class="text-end">
                      {{ formatCurrencyAmount(invoiceDetails.sub_total) }}
                    </td>
                  </tr>
                  <!--end::Subtotal-->
                  <!--begin::Discount-->
                  <tr>
                    <td colspan="3" class="text-end">Discount</td>
                    <td class="text-end">
                      {{ formatCurrencyAmount(invoiceDetails.discount) }}
                    </td>
                  </tr>
                  <!--end::Discount-->
                  <!--begin::VAT-->
                  <tr>
                    <td colspan="3" class="text-end">VAT (%)</td>
                    <td class="text-end">
                      {{ formatCurrencyAmount(invoiceDetails.tax) }}
                    </td>
                  </tr>
                  <!--end::VAT-->
                  <!--begin::Shipping-->
                  <tr>
                    <td colspan="3" class="text-end">Shipping Rate</td>
                    <td class="text-end">
                      {{ formatCurrencyAmount(invoiceDetails.shipping) }}
                    </td>
                  </tr>
                  <!--end::Shipping-->
                  <!--begin::Grand total-->
                  <tr>
                    <td colspan="3" class="fs-3 text-dark text-end">
                      Grand Total
                    </td>
                    <td class="text-dark fs-3 fw-bolder text-end">
                      {{ formatCurrencyAmount(invoiceDetails.total) }}
                    </td>
                  </tr>
                  <!--end::Grand total-->
                </tbody>
                <!--end::Table head-->
              </table>
              <!--end::Table-->
            </div>
            <!--end::Product table-->
          </div>
          <!--end::Section-->
        </div>
        <!--end::Card body-->
      </div>
      <!--end::Card-->

      <!--begin::Card-->
      <div class="card card-flush pt-3 mb-5 mb-xl-10">
        <!--begin::Card header-->
        <div class="card-header">
          <!--begin::Card title-->
          <div class="card-title">
            <h2>Invoice Payments</h2>
          </div>
          <!--end::Card title-->
          <!--begin::Toolbar-->
          <div class="card-toolbar"></div>
          <!--end::Toolbar-->
        </div>
        <!--end::Card header-->
        <!--begin::Card body-->
        <div class="card-body pt-2">
          <KTDatatable
            :data="invoicePayments"
            :header="tableHeader"
            :itemsPerPageDropdownEnabled="false"
            :checkbox-enabled="false"
            checkbox-label="id"
            :loading="loadingInvoiceData"
          >
            <template v-slot:status="{ row: data }">
              <span
                v-if="data.transaction.status_id === 1"
                class="badge badge-light-primary"
                >Created</span
              >
              <span
                v-if="data.transaction.status_id === 2"
                class="badge badge-light-info"
                >Submitted</span
              >
              <span
                v-if="data.transaction.status_id === 3"
                class="badge badge-light-warning"
                >Processing</span
              >
              <span
                v-if="data.transaction.status_id === 4"
                class="badge badge-light-success"
                >Success</span
              >
              <span
                v-if="data.transaction.status_id === 5"
                class="badge badge-light-danger"
                >Error</span
              >
              <span
                v-if="data.transaction.status_id === 6"
                class="badge badge-light-danger"
                >Cancelled</span
              >

              <br />

              <span class="text-muted fs-7 fw-normal text-muted small">{{
                data.transaction.status_message
              }}</span>
            </template>

            <template v-slot:created_at="{ row: data }">
              {{ formatDateTime(data.created_at) }}
            </template>

            <template v-slot:transaction_reference="{ row: data }">
              {{ data.transaction_reference }}
            </template>

            <template v-slot:amount="{ row: data }">
              {{ data.currency_code }}
              {{ formatCurrencyAmount(data.amount) }}
            </template>

            <template v-slot:donor="{ row: data }">
              {{ data.payee_email }} <br />
              {{ data.transaction.debit_account_no }}
            </template>

            <template v-slot:actions="{ row: data }">
              <button
                class="btn btn-sm btn-light-info btn-active-light-info"
                data-bs-toggle="modal"
                id="edit-btn"
                data-bs-target="#kt_modal_view_transaction"
                @click="viewTransaction(data)"
              >
                View
              </button>
            </template>
          </KTDatatable>
        </div>
        <!--end::Card body-->
      </div>
      <!--end::Card-->
    </div>
    <!--end::Content-->
    <!--begin::Sidebar-->
    <div
      class="flex-column flex-lg-row-auto w-lg-350px w-xl-400px mb-10 order-1 order-lg-2"
    >
      <!--begin::Card-->
      <div
        class="card card-flush mb-0"
        data-kt-sticky="true"
        data-kt-sticky-name="invoice-summary"
        data-kt-sticky-offset="{default: false, lg: '200px'}"
        data-kt-sticky-width="{lg: '250px', xl: '300px'}"
        data-kt-sticky-left="auto"
        data-kt-sticky-top="150px"
        data-kt-sticky-animation="false"
        data-kt-sticky-zindex="95"
      >
        <!--begin::Card header-->
        <div class="card-header">
          <!--begin::Card title-->
          <div class="card-title">
            <h2>Summary</h2>
          </div>
          <!--end::Card title-->
        </div>
        <!--end::Card header-->
        <!--begin::Card body-->
        <div class="card-body pt-0 fs-6">
          <!--begin::Seperator-->
          <div class="separator separator-dashed mb-7"></div>
          <!--end::Seperator-->

          <!--begin::Section-->
          <div class="mb-1">
            <!--begin::Details-->
            <table class="table fs-6 fw-semibold gs-0 gy-2 gx-2">
              <!--begin::Row-->
              <tr class="">
                <td class="text-gray-400">Invoice ID:</td>
                <td class="text-gray-800">{{ invoiceDetails.reference }}</td>
              </tr>
              <!--end::Row-->
              <!--begin::Row-->
              <tr class="">
                <td class="text-gray-400">Total:</td>
                <td class="text-gray-800">
                  {{ formatCurrencyAmount(invoiceDetails.total) }}
                </td>
              </tr>
              <!--end::Row-->
              <!--begin::Row-->
              <tr class="">
                <td class="text-gray-400">Balance Due:</td>
                <td class="text-gray-800">
                  {{ formatCurrencyAmount(invoiceDetails.balance_due) }}
                </td>
              </tr>
              <!--end::Row-->
              <!--begin::Row-->
              <tr class="">
                <td class="text-gray-400">Paid:</td>
                <td class="text-gray-800">{{ invoiceDetails.paid }}</td>
              </tr>
              <!--end::Row-->
              <!--begin::Row-->
              <tr class="">
                <td class="text-gray-400">Status:</td>
                <td>
                  <span
                    v-if="invoiceDetails.status_id === '1'"
                    class="badge badge-light-primary"
                    >Pending</span
                  >
                  <span
                    v-if="invoiceDetails.status_id === '2'"
                    class="badge badge-light-success"
                    >Completed</span
                  >
                  <span
                    v-if="invoiceDetails.status_id === '3'"
                    class="badge badge-light-warning"
                    >Rejected</span
                  >
                  <span
                    v-if="invoiceDetails.status_id === '4'"
                    class="badge badge-light-danger"
                    >Cancelled</span
                  >
                </td>
              </tr>
              <!--end::Row-->
            </table>
            <!--end::Details-->
          </div>
          <!--end::Section-->

          <!--begin::Seperator-->
          <div class="separator separator-dashed mb-7"></div>
          <!--end::Seperator-->
          <!--begin::Section-->
          <div class="mb-10">
            <!--begin::Details-->
            <table class="table fs-6 fw-semibold gs-0 gy-2 gx-2">
              <!--begin::Row-->
              <tr class="">
                <td class="text-gray-400">Created at:</td>
                <td class="text-gray-800">
                  {{ formatDateTime(invoiceDetails.created_at) }}
                </td>
              </tr>
              <!--end::Row-->
              <!--begin::Row-->
              <tr class="">
                <td class="text-gray-400">Updated at:</td>
                <td class="text-gray-800">
                  {{ formatDateTime(invoiceDetails.updated_at) }}
                </td>
              </tr>
              <!--end::Row-->
            </table>
            <!--end::Details-->
          </div>
          <!--end::Section-->
          <!--          v-if="invoiceDetails.status_id === '1'"-->
          <!--begin::Actions-->

          <div
            class="mb-0"
            v-if="
              invoiceDetails.status_id !== '2' &&
              invoiceDetails.status_id !== '4'
            "
          >
            <a
              href="#"
              class="btn btn-danger btn-sm m-2"
              id="kt_invoice_update_button"
              data-bs-toggle="modal"
              data-bs-target="#kt_modal_update_invoice"
              @click="showInvoiceStatusModal('cancel', 'Cancel Invoice')"
              >Cancel</a
            >
            <a
              href="#"
              class="btn btn-info btn-sm m-2"
              id="kt_invoice_update_button"
              data-bs-toggle="modal"
              data-bs-target="#kt_modal_update_invoice"
              @click="showInvoiceStatusModal('complete', 'Mark as Paid')"
              >Mark as Paid</a
            >

            <a
              href="#"
              class="btn btn-success btn-sm m-2"
              id="kt_invoice_update_button"
              data-bs-toggle="modal"
              data-bs-target="#kt_modal_update_invoice"
              @click="showInvoiceStatusModal('submit', 'Send Invoice')"
              >Send Invoice</a
            >
          </div>
          <!--end::Actions-->
        </div>
        <!--end::Card body-->
      </div>
      <!--end::Card-->
    </div>
    <!--end::Sidebar-->
  </div>

  <!--View Transaction Modal-->
  <div
    class="modal fade"
    id="kt_modal_view_transaction"
    tabindex="-1"
    aria-hidden="true"
  >
    <!--begin::Modal dialog-->
    <div class="modal-dialog mw-650px">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Modal header-->
        <div class="modal-header pb-0 border-0 justify-content-end">
          <!--begin::Close-->
          <div
            class="btn btn-sm btn-icon btn-active-color-primary"
            data-bs-dismiss="modal"
          >
            <span class="svg-icon svg-icon-1">
              <inline-svg src="/media/icons/duotune/arrows/arr061.svg" />
            </span>
          </div>
          <!--end::Close-->
        </div>
        <!--begin::Modal header-->

        <!--begin::Modal body-->
        <div class="modal-body scroll-y mx-5 mx-xl-18 pt-0 pb-15">
          <div data-kt-stepper-element="content">
            <!--begin::Wrapper-->
            <div class="w-100" v-if="transaction.id">
              <!--begin::Heading-->
              <div class="pb-12">
                <!--begin::Title-->
                <h1 class="fw-bold text-dark">
                  Transaction Details: {{ transaction.transaction.id }} -
                  {{ transaction.transaction.reference }}
                </h1>
                <!--end::Title-->
              </div>
              <!--end::Heading-->
            </div>
            <!--end::Wrapper-->
          </div>
          <div v-if="transaction.id">
            <!--  General Info -->
            <div
              class="py-2 border-bottom border-bottom-dashed border-gray-300"
            >
              <div class="ms">
                <span
                  class="d-flex align-items-center fs-5 fw-bold text-dark text-hover-primary"
                >
                  General
                </span>
              </div>
              <div class="flex-equal table-responsive">
                <table
                  class="table table-flush fw-semobold gy-1"
                  style="width: 100%"
                >
                  <tbody>
                    <tr>
                      <td class="text-muted">Amount</td>
                      <td class="text-gray-800">
                        {{ transaction.transaction.amount }}
                        {{ transaction.transaction.currency_code }}
                      </td>
                    </tr>
                    <tr>
                      <td class="text-muted">Type Name</td>
                      <td class="text-gray-800">
                        {{ transaction.transaction.type_code }}
                      </td>
                    </tr>
                    <tr>
                      <td class="text-muted">Status</td>
                      <td class="text-gray-800">
                        {{ transaction.transaction.status_message }}
                      </td>
                    </tr>
                    <tr>
                      <td class="text-muted">Created At</td>
                      <td class="text-gray-800">
                        {{ transaction.transaction.created_at }}
                      </td>
                    </tr>
                    <tr>
                      <td class="text-muted">Last Updated At</td>
                      <td class="text-gray-800">
                        {{ transaction.transaction.updated_at }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <!--  General Info -->

            <!--  Debit Info -->
            <div
              class="py-2 border-bottom border-bottom-dashed border-gray-300"
            >
              <div class="ms">
                <span class="d-flex align-items-center fs-5 fw-bold text-dark">
                  Debit Account
                </span>
              </div>
              <div class="flex-equal table-responsive">
                <table class="table table-flush fw-semobold gy-1">
                  <tbody>
                    <tr>
                      <td class="text-muted">Institution</td>
                      <td class="text-gray-800">
                        {{
                          transaction.transaction.debit_account_institution_id
                        }}
                      </td>
                    </tr>
                    <tr>
                      <td class="text-muted">Account No</td>
                      <td class="text-gray-800">
                        {{ transaction.transaction.debit_account_no }}
                      </td>
                    </tr>
                    <tr>
                      <td class="text-muted">Account Name</td>
                      <td class="text-gray-800">
                        {{ transaction.transaction.debit_account_name }}
                      </td>
                    </tr>
                    <tr>
                      <td class="text-muted">Debit Status</td>
                      <td class="text-gray-800">
                        {{ transaction.transaction.debit_status_message }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <!--  Debit Info -->

            <!--  Credit Info -->
            <div
              class="py-2 border-bottom border-bottom-dashed border-gray-300"
            >
              <div class="ms">
                <span class="d-flex align-items-center fs-5 fw-bold text-dark">
                  Debit Account
                </span>
              </div>
              <div class="flex-equal table-responsive">
                <table class="table table-flush fw-semobold gy-1">
                  <tbody>
                    <tr>
                      <td class="text-muted">Institution</td>
                      <td class="text-gray-800">
                        {{
                          transaction.transaction.credit_account_institution_id
                        }}
                      </td>
                    </tr>
                    <tr>
                      <td class="text-muted">Account No.</td>
                      <td class="text-gray-800">
                        {{ transaction.transaction.credit_account_no }}
                      </td>
                    </tr>
                    <tr>
                      <td class="text-muted">Account Name</td>
                      <td class="text-gray-800">
                        {{ transaction.transaction.credit_account_name }}
                      </td>
                    </tr>
                    <tr>
                      <td class="text-muted">Credit Status</td>
                      <td class="text-gray-800">
                        {{ transaction.transaction.credit_status_message }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <!--  Credit Info -->
          </div>
        </div>
        <!--end::Modal body-->
      </div>
      <!--end::Modal content-->
    </div>
    <!--end::Modal dialog-->
  </div>
  <!--View Transaction Modal-->

  <!--update Invoice Modal-->
  <div
    class="modal fade"
    id="kt_modal_update_invoice"
    ref="updateInvoiceModalRef"
    tabindex="-1"
    aria-hidden="true"
  >
    <!--begin::Modal dialog-->
    <div class="modal-dialog mw-650px">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Modal header-->
        <div class="modal-header pb-0 border-0 justify-content-end">
          <!--begin::Close-->
          <div
            class="btn btn-sm btn-icon btn-active-color-primary"
            data-bs-dismiss="modal"
          >
            <span class="svg-icon svg-icon-1">
              <inline-svg src="/media/icons/duotune/arrows/arr061.svg" />
            </span>
          </div>
          <!--end::Close-->
        </div>
        <!--begin::Modal header-->

        <!--begin::Modal body-->

        <el-form
          @submit.prevent="processInvoiceAction()"
          class="form"
          :model="invoiceForm"
          :rules="rules"
          ref="formUpdateInvoiceRef"
        >
          <div
            class="modal-body scroll-y mx-5 mx-xl-18 pt-0 pb-15"
            v-if="invoiceForm"
          >
            <!--begin::Heading-->
            <div class="mb-13 text-center">
              <!--begin::Title-->
              <h1 class="mb-3" v-if="invoiceForm.action === 'cancel'">
                Cancel Invoice
              </h1>
              <h1 class="mb-3" v-if="invoiceForm.action === 'complete'">
                Mark as Paid
              </h1>
              <h1 class="mb-3" v-if="invoiceForm.action === 'submit'">
                Send Invoice
              </h1>

              <!--end::Title-->
            </div>
            <!--end::Heading-->

            <!--begin::Input group-->
            <div class="d-flex flex-column mb-4 fv-row">
              <div class="modal-text">
                <h6
                  class="text-center"
                  style="color: red"
                  v-if="invoiceForm.action === 'cancel'"
                >
                  <div
                    class="svg-icon svg-icon-5tx svg-icon-danger mb-15 text-center"
                  >
                    <inline-svg src="/media/icons/duotune/general/gen044.svg" />
                  </div>

                  Are you sure you want to cancel this invoice?
                </h6>
                <h6
                  class="text-center"
                  style="color: green"
                  v-if="invoiceForm.action === 'complete'"
                >
                  <div
                    class="svg-icon svg-icon-5tx svg-icon-danger mb-15 text-center"
                  >
                    <inline-svg src="/media/icons/duotune/general/gen044.svg" />
                  </div>
                  Are you sure you want mark this invoice as paid?
                </h6>
                <h6
                  class="text-center"
                  style="color: green"
                  v-if="invoiceForm.action === 'submit'"
                >
                  <div
                    class="svg-icon svg-icon-5tx svg-icon-danger mb-15 text-center"
                  >
                    <inline-svg src="/media/icons/duotune/general/gen044.svg" />
                  </div>
                  Are you sure you want to send this invoice?
                </h6>
              </div>
            </div>
            <!--end::Input group-->
          </div>
          <div class="modal-footer flex-center" v-if="invoiceForm">
            <!--begin::Button-->
            <button
              type="reset"
              id="kt_modal_update_invoice_cancel"
              class="btn btn-light me-3 btn-sm"
              data-bs-dismiss="modal"
              :disabled="refData.loadingAction"
            >
              Discard
            </button>
            <!--end::Button-->

            <!--begin::Button-->
            <button
              :data-kt-indicator="refData.loadingAction ? 'on' : null"
              class="btn btn-sm btn-primary"
              type="submit"
              @click="processInvoiceAction()"
              :disabled="refData.loadingAction"
            >
              <span v-if="!refData.loadingAction" class="indicator-label">
                <template v-if="invoiceForm.action === 'cancel'"
                  >Cancel Invoice</template
                >
                <template v-if="invoiceForm.action === 'complete'"
                  >Mark as Paid</template
                >
                <template v-if="invoiceForm.action === 'submit'"
                  >Send Invoice</template
                >

                <span class="svg-icon svg-icon-3 ms-2 me-0">
                  <inline-svg src="/media/icons/duotune/arrows/arr064.svg" />
                </span>
              </span>
              <span v-if="refData.loadingAction" class="indicator-progress">
                Please wait...
                <span
                  class="spinner-border spinner-border-sm align-middle ms-2"
                ></span>
              </span>
            </button>
            <!--end::Button-->
          </div>
        </el-form>
        <!--end::Modal body-->
      </div>
      <!--end::Modal content-->
    </div>
    <!--end::Modal dialog-->
  </div>
  <!--update Invoice Modal-->

  <!--end::Layout-->
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import type { iInvoicePayment } from "@/models/invoice";
import { useCustomerInvoiceStore } from "@/stores/customer/invoice";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import { hideModal } from "@/core/helpers/dom";

import KTDatatable from "@/components/kt-datatable/KTDataTable.vue";

import Message from "vue-m-message";

import PermissionDenied from "@/components/PermissionDenied.vue";
import PageLoader from "@/components/PageLoader.vue";
import useOutputFormat from "@/composables/useOutputFormat";

export default defineComponent({
  name: "invoice-details",
  components: {
    KTDatatable,
    PermissionDenied,
    PageLoader,
  },
  props: {
    widgetClasses: String,
  },
  setup() {
    //store
    const invoiceStore = useCustomerInvoiceStore();
    const {
      invoiceDetails,
      invoiceItems,
      invoicePayments,
      unauthorized,
      loadingInvoiceData,
    } = storeToRefs(invoiceStore);
    const { getInvoiceByReference } = useCustomerInvoiceStore();

    //
    const route = useRoute();

    //data variables
    const refData = ref({
      loadingPage: true,
      loadingAction: false,
    });

    const tableHeader = ref([
      {
        columnLabel: "created_at",
        columnName: "Created Date",
        sortEnabled: true,
      },

      {
        columnLabel: "status",
        columnName: "status",
        sortEnabled: true,
      },

      {
        columnLabel: "transaction_reference",
        columnName: "Payment reference",
        sortEnabled: false,
      },
      {
        columnLabel: "amount",
        columnName: "amount",
        sortEnabled: false,
      },

      {
        columnLabel: "donor",
        columnName: "Payee",
        sortEnabled: false,
      },
      {
        columnName: "Actions",
        columnLabel: "actions",
      },
    ]);

    const transaction = ref({} as iInvoicePayment);

    const invoiceForm = ref({
      id: 0,
      action: "",
      paid: 0,
      reference: "",
    } as any);

    const action = ref("");

    const viewTransaction = (val) => {
      transaction.value = val;
    };

    const formUpdateInvoiceRef = ref<null | HTMLFormElement>(null);

    const updateInvoiceModalRef = ref<null | HTMLElement>(null);

    const rules = ref({
      paid: [
        {
          required: true,
          message: "status is required",
          trigger: "change",
        },
      ],
    });

    const processInvoiceAction = () => {
      if (!formUpdateInvoiceRef.value) {
        return;
      }

      formUpdateInvoiceRef.value.validate((valid) => {
        if (valid) {
          refData.value.loadingAction = true;

          let formPayload = new FormData();
          formPayload.append("paid", invoiceForm.value.paid);
          formPayload.append("reference", invoiceDetails.value.reference);

          const payload = {
            action: invoiceForm.value.action,
          };

          console.log(payload);

          invoiceStore
            .updateInvoiceStatus([payload, invoiceForm.value.reference])
            .then(() => {
              refData.value.loadingAction = false;

              Message({
                message: "Data updated successfully.",
                //TBC
                position: "bottom-right",
                type: "success",
                duration: 5000,
                zIndex: 99999,
              });

              getInvoiceByReference(invoiceForm.value.reference);

              hideModal(updateInvoiceModalRef.value);
            })
            .catch((error) => {
              // get errors from state
              let response = error.response.data;

              if (response.errors) {
                let errors = response.errors;
                for (const key in errors) {
                  Message({
                    message: errors[key][0],
                    //TBC
                    position: "bottom-right",
                    type: "error",
                    duration: 5000,
                    zIndex: 99999,
                  });
                }
              } else if (response.error) {
                Message({
                  message: response.error,
                  //TBC
                  position: "bottom-right",
                  type: "error",
                  duration: 5000,
                  zIndex: 99999,
                });
              } else {
                Message({
                  message: error.message,
                  //TBC
                  position: "bottom-right",
                  type: "error",
                  duration: 5000,
                  zIndex: 99999,
                });
              }

              hideModal(updateInvoiceModalRef.value);

              // update loading status
              refData.value.loadingAction = false;
            });

          //do nothing.
        } else {
          return false;
        }
      });
    };

    onMounted(async () => {
      refData.value.loadingPage = true;

      invoiceForm.value.reference = route.params.reference;

      await getInvoiceByReference(invoiceForm.value.reference);

      refData.value.loadingPage = false;
    });

    //output formatting
    let { formatCurrencyAmount, formatDateTime, formatTime, formatDate } =
      useOutputFormat();

    //modal
    const showInvoiceStatusModal = (action, data) => {
      if (action === "cancel") {
        invoiceForm.value.name = "";
      } else if (action === "complete") {
        invoiceForm.value.name = data.name;
        invoiceForm.value.id = data.id;
      } else if (action === "submit") {
        invoiceForm.value.name = data.name;
        invoiceForm.value.id = data.id;
      } else {
        return;
      }
      invoiceForm.value.data = data;
      invoiceForm.value.action = action;
      console.log(invoiceForm.value.action);
    };

    return {
      //variables
      refData,
      tableHeader,
      invoiceDetails,
      invoiceItems,
      invoicePayments,
      transaction,
      invoiceForm,
      action,

      //functions
      viewTransaction,

      processInvoiceAction,
      rules,
      formUpdateInvoiceRef,
      updateInvoiceModalRef,

      //state
      loadingInvoiceData,
      unauthorized,

      //composable
      formatCurrencyAmount,
      formatDateTime,
      formatTime,
      formatDate,

      //new
      showInvoiceStatusModal,
    };
  },
});
</script>
