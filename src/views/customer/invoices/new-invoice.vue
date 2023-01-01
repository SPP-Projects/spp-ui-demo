<template>
  <!--begin::Card-->
  <PermissionDenied v-if="unauthorized" />
  <PageLoader v-else-if="refData.loadingPage" />
  <div class="d-flex flex-column flex-lg-row" v-else>
    <!--begin::Content-->
    <div class="flex-lg-row-fluid mb-10 mb-lg-0 me-lg-7 me-xl-10">
      <!--begin::Card-->
      <div class="card">
        <!--begin::Card body-->
        <div class="card-body p-12">
          <!--begin::Form-->
          <el-form
            @submit.prevent="processInvoice()"
            id="kt_invoice_form"
            :rules="formRules"
            :model="formData"
            ref="formAddMoneyRequestRef"
          >
            <!--begin::Wrapper-->
            <div class="d-flex flex-column align-items-start flex-xxl-row">
              <!--begin::Input group-->
              <div
                class="d-flex align-items-center flex-equal fw-row me-4 order-2"
                data-bs-toggle="tooltip"
                data-bs-trigger="hover"
                title="Specify invoice #"
              >
                <span class="fs-2 fw-bold text-gray-800">Invoice #</span>
                <input
                  type="text"
                  class="form-control form-control text-muted fs-4 w-175px"
                  v-model="formData.user_reference"
                />
              </div>
              <!--end::Input group-->
              <!--begin::Input group-->
              <div
                class="d-flex flex-center flex-equal fw-row text-nowrap order-1 order-xxl-2 me-4"
                data-bs-toggle="tooltip"
                data-bs-trigger="hover"
                title="Enter invoice number"
              >
                <el-row :gutter="20">
                  <el-form-item prop="due_date"
                    >Due Date:
                    <el-date-picker
                      v-model="formData.due_date"
                      type="date"
                      placeholder="Select a date"
                      :teleported="false"
                      name="due_date"
                      value-format="YYYY-MM-DD"
                    />
                  </el-form-item>
                </el-row>
              </div>
              <!--end::Input group-->
            </div>
            <!--end::Top-->
            <!--begin::Separator-->
            <div class="separator separator-dashed my-10"></div>
            <!--end::Separator-->
            <!--begin::Wrapper-->
            <div class="mb-0">
              <!--begin::Row-->
              <div class="row gx-10 mb-5">
                <!--begin::Col-->
                <div class="col-lg-6">
                  <label class="form-label fs-6 fw-bold text-gray-700 mb-3"
                    >Bill To: Name</label
                  >
                  <!--begin::Input group-->
                  <div class="mb-5">
                    <el-form-item prop="bill_to_name">
                      <input
                        type="text"
                        class="form-control form-control-solid"
                        placeholder="Name"
                        v-model="formData.bill_to_name"
                      />
                    </el-form-item>
                  </div>
                </div>
                <!--end::Col-->
                <!--begin::Col-->
                <div class="col-lg-6">
                  <label class="form-label fs-6 fw-bold text-gray-700 mb-3"
                    >Bill To: Email</label
                  >
                  <!--begin::Input group-->
                  <div class="mb-5">
                    <el-form-item prop="bill_to_email">
                      <input
                        type="email"
                        class="form-control form-control-solid"
                        placeholder="Email"
                        v-model="formData.bill_to_email"
                        name="bill_to_email"
                    /></el-form-item>
                  </div>
                  <!--end::Input group-->
                </div>
                <!--end::Col-->
              </div>
              <!--end::Row-->

              <!--begin::Row-->
              <div class="row gx-10 mb-5">
                <!--begin::Col-->
                <div class="col-lg-6">
                  <label class="form-label fs-6 fw-bold text-gray-700 mb-3"
                    >PO Number</label
                  >
                  <!--begin::Input group-->
                  <div class="mb-5">
                    <input
                      type="text"
                      class="form-control form-control-solid"
                      placeholder="Name"
                      v-model="formData.po_number"
                    />
                  </div>
                </div>
                <!--end::Col-->
                <!--begin::Col-->
                <div class="col-lg-6">
                  <label class="form-label fs-6 fw-bold text-gray-700 mb-3"
                    >Address</label
                  >
                  <!--begin::Input group-->
                  <div class="mb-5">
                    <input
                      type="email"
                      class="form-control form-control-solid"
                      placeholder="Address"
                      v-model="formData.bill_to_address"
                    />
                  </div>
                  <!--end::Input group-->
                </div>
                <!--end::Col-->
              </div>
              <!--end::Row-->
              <!--begin::Table wrapper-->
              <div class="table-responsive mb-10">
                <!--begin::Table-->
                <table
                  class="table g-5 gs-0 mb-0 fw-bold text-gray-700"
                  data-kt-element="items"
                >
                  <!--begin::Table head-->
                  <thead>
                    <tr
                      class="border-bottom fs-7 fw-bold text-gray-700 text-uppercase"
                    >
                      <th class="min-w-300px w-475px">Item</th>
                      <th class="min-w-100px w-100px">QTY</th>
                      <th class="min-w-150px w-150px">rate</th>
                      <th class="min-w-100px w-150px text-end">Total</th>
                      <th class="min-w-75px w-75px text-end">Action</th>
                    </tr>
                  </thead>
                  <!--end::Table head-->
                  <!--begin::Table body-->
                  <tbody>
                    <tr
                      v-for="(product, n) in formData.items"
                      :key="n"
                      class="border-bottom border-bottom-dashed product"
                      data-kt-element="item"
                    >
                      <td class="pe-7">
                        <input
                          type="text"
                          class="form-control form-control-solid"
                          name="description[]"
                          placeholder="Description"
                          v-model="product.description"
                        />
                      </td>
                      <td class="ps-0">
                        <input
                          class="form-control form-control-solid"
                          type="number"
                          min="1"
                          name="quantity[]"
                          placeholder="1"
                          data-kt-element="quantity"
                          v-model="product.quantity"
                          @keyup="verifyQuantity(product, product)"
                          @change="calculateTotal"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          class="form-control form-control-solid text-end"
                          name="rate[]"
                          placeholder="0.00"
                          data-kt-element="rate"
                          v-model="product.rate"
                          @change="calculateTotal"
                        />
                      </td>

                      <td class="pt-8 text-end text-nowrap">
                        <span data-kt-element="total">{{
                          Number(product.quantity) * Number(product.rate)
                        }}</span>
                      </td>
                      <td class="pt-5 text-end product-removal">
                        <button
                          type="button"
                          class="btn btn-sm btn-icon btn-active-color-primary"
                          data-kt-element="remove-item"
                          @click.prevent="removeInvoiceItem(n)"
                        >
                          <span class="svg-icon svg-icon-3">
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M5 9C5 8.44772 5.44772 8 6 8H18C18.5523 8 19 8.44772 19 9V18C19 19.6569 17.6569 21 16 21H8C6.34315 21 5 19.6569 5 18V9Z"
                                fill="currentColor"
                              />
                              <path
                                opacity="0.5"
                                d="M5 5C5 4.44772 5.44772 4 6 4H18C18.5523 4 19 4.44772 19 5V5C19 5.55228 18.5523 6 18 6H6C5.44772 6 5 5.55228 5 5V5Z"
                                fill="currentColor"
                              />
                              <path
                                opacity="0.5"
                                d="M9 4C9 3.44772 9.44772 3 10 3H14C14.5523 3 15 3.44772 15 4V4H9V4Z"
                                fill="currentColor"
                              />
                            </svg>
                          </span>
                          <!--end::Svg Icon-->
                        </button>
                      </td>
                    </tr>

                    <tr id="newForm" style="display: none"></tr>
                  </tbody>
                  <!--end::Table body-->
                  <!--begin::Table foot-->
                  <tfoot>
                    <tr
                      class="border-top border-top-dashed align-top fs-6 fw-bold text-gray-700"
                    >
                      <th class="text-primary">
                        <button
                          class="btn btn-link py-1"
                          data-kt-element="add-item"
                          @click.prevent="addInvoiceItem"
                        >
                          Add item
                        </button>
                      </th>
                      <th
                        colspan="2"
                        class="border-bottom border-bottom-dashed ps-0"
                      >
                        <div class="d-flex flex-column align-items-start">
                          <div class="fs-5">Sub Total</div>
                          <span class="btn btn-link py-1"> Less Discount </span>
                          <span class="btn btn-link py-1"> Add Tax </span>
                          <span class="btn btn-link py-1"> Shipping </span>
                        </div>
                      </th>
                      <th
                        colspan="2"
                        class="border-bottom border-bottom-dashed text-end"
                      >
                        <span data-kt-element="sub-total">{{
                          formData.sub_total.toFixed(2)
                        }}</span>

                        <br />
                        <span data-kt-element="sub-total" class="mt-10 red">
                          -{{ formData.discount.toFixed(2) }}</span
                        >

                        <br />
                        <span data-kt-element="sub-total">{{
                          formData.tax_amount.toFixed(2)
                        }}</span>

                        <br />

                        <span data-kt-element="sub-total">{{
                          formData.shipping.toFixed(2)
                        }}</span>

                        <br />
                      </th>
                    </tr>
                    <tr class="align-top fw-bold text-gray-700">
                      <th></th>
                      <th colspan="2" class="fs-4 ps-0">Total</th>
                      <th colspan="2" class="text-end fs-4 text-nowrap">
                        $
                        <span data-kt-element="grand-total">{{
                          formData.total.toFixed(2)
                        }}</span>
                      </th>
                    </tr>
                  </tfoot>
                  <!--end::Table foot-->
                </table>
              </div>
              <!--end::Table-->
              <!--begin::Item template-->
              <table class="table d-none" data-kt-element="item-template">
                <tr
                  class="border-bottom border-bottom-dashed"
                  data-kt-element="item"
                >
                  <td class="pe-7">
                    <input
                      type="text"
                      class="form-control form-control-solid mb-2"
                      name="name[]"
                      placeholder="Item name"
                      required
                    />
                    <input
                      type="text"
                      class="form-control form-control-solid"
                      name="description[]"
                      placeholder="Description"
                    />
                  </td>
                  <td class="ps-0">
                    <input
                      class="form-control form-control-solid"
                      type="number"
                      min="1"
                      name="quantity[]"
                      placeholder="1"
                      data-kt-element="quantity"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      class="form-control form-control-solid text-end"
                      name="rate[]"
                      placeholder="0.00"
                      data-kt-element="rate"
                    />
                  </td>
                  <td class="pt-8 text-end">
                    $ <span data-kt-element="total">0.00</span>
                  </td>
                  <td class="pt-5 text-end">
                    <button
                      type="button"
                      class="btn btn-sm btn-icon btn-active-color-primary"
                      data-kt-element="remove-item"
                    >
                      <!--begin::Svg Icon | path: icons/duotune/general/gen027.svg-->
                      <span class="svg-icon svg-icon-3">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5 9C5 8.44772 5.44772 8 6 8H18C18.5523 8 19 8.44772 19 9V18C19 19.6569 17.6569 21 16 21H8C6.34315 21 5 19.6569 5 18V9Z"
                            fill="currentColor"
                          />
                          <path
                            opacity="0.5"
                            d="M5 5C5 4.44772 5.44772 4 6 4H18C18.5523 4 19 4.44772 19 5V5C19 5.55228 18.5523 6 18 6H6C5.44772 6 5 5.55228 5 5V5Z"
                            fill="currentColor"
                          />
                          <path
                            opacity="0.5"
                            d="M9 4C9 3.44772 9.44772 3 10 3H14C14.5523 3 15 3.44772 15 4V4H9V4Z"
                            fill="currentColor"
                          />
                        </svg>
                      </span>
                      <!--end::Svg Icon-->
                    </button>
                  </td>
                </tr>
              </table>
              <table class="table d-none" data-kt-element="empty-template">
                <tr data-kt-element="empty">
                  <th colspan="5" class="text-muted text-center py-10">
                    No items
                  </th>
                </tr>
              </table>
              <!--end::Item template-->
              <!--begin::Notes-->
              <div class="mb-0">
                <label class="form-label fs-6 fw-bold text-gray-700"
                  >Notes</label
                >
                <textarea
                  name="notes"
                  class="form-control form-control-solid"
                  rows="3"
                  placeholder="Thanks for your business"
                ></textarea>
              </div>
              <!--end::Notes-->
            </div>
            <!--end::Wrapper-->
          </el-form>
          <!--end::Form-->
        </div>
        <!--end::Card body-->
      </div>
      <!--end::Card-->
    </div>
    <!--end::Content-->
    <!--begin::Sidebar-->
    <div class="flex-lg-auto min-w-lg-300px">
      <!--begin::Card-->
      <div
        class="card"
        data-kt-sticky="true"
        data-kt-sticky-name="invoice"
        data-kt-sticky-offset="{default: false, lg: '200px'}"
        data-kt-sticky-width="{lg: '250px', lg: '300px'}"
        data-kt-sticky-left="auto"
        data-kt-sticky-top="150px"
        data-kt-sticky-animation="false"
        data-kt-sticky-zindex="95"
      >
        <!--begin::Card body-->
        <div class="card-body p-10">
          <!--begin::Input group-->

          <div class="mb-10">
            <!--begin::Label-->
            <label class="form-label fw-bold fs-6 text-gray-700"
              >Discount (Amount)</label
            >
            <!--end::Label-->
            <!--begin::Select-->
            <input
              type="number"
              class="form-control form-control-solid"
              placeholder="Dscount Amount"
              v-model="formData.discount"
              @change="calculateTotal"
            />
            <!--end::Select-->
          </div>
          <!--end::Input group-->

          <div class="separator separator-dashed mb-2"></div>

          <!--end::Input group-->
          <div class="mb-10">
            <!--begin::Label-->
            <label class="form-label fw-bold fs-6 text-gray-700">Tax (%)</label>
            <!--end::Label-->
            <!--begin::Select-->
            <input
              class="form-control form-control-solid"
              v-model="formData.tax"
              type="number"
              min="0"
              placeholder="0"
              data-kt-element="tax"
              @change="calculateTotal"
            />
            <!--end::Select-->
          </div>
          <!--end::Input group-->

          <div class="separator separator-dashed mb-2"></div>

          <!--end::Input group-->
          <div class="mb-10">
            <!--begin::Label-->
            <label class="form-label fw-bold fs-6 text-gray-700"
              >Shipping (amount)</label
            >
            <!--end::Label-->
            <!--begin::Select-->
            <input
              class="form-control form-control-solid"
              v-model="formData.shipping"
              type="number"
              min="0"
              placeholder="0"
              data-kt-element="shipping"
              @change="calculateTotal"
            />
            <!--end::Select-->
          </div>
          <!--end::Input group-->

          <div class="separator separator-dashed mb-2"></div>

          <!--begin::Actions-->
          <div class="mb-0">
            <button
              :data-kt-indicator="refData.loadingAction ? 'on' : null"
              class="btn btn-lg btn-primary"
              type="submit"
              @click="processInvoice()"
              :disabled="refData.loadingAction"
            >
              <span v-if="!refData.loadingAction" class="indicator-label">
                Add Invoice
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
          </div>
          <!--end::Actions-->
        </div>
        <!--end::Card body-->
      </div>
      <!--end::Card-->
    </div>
    <!--end::Sidebar-->
  </div>
  <!--end::Card-->
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, onMounted, ref } from "vue";
import { useCustomerInvoiceStore } from "@/stores/customer/invoice";
import { storeToRefs } from "pinia";

import Message from "vue-m-message";

import moment from "moment";
import PermissionDenied from "@/components/PermissionDenied.vue";
import PageLoader from "@/components/PageLoader.vue";
import { useRouter } from "vue-router";
import useOutputFormat from "@/composables/useOutputFormat";
interface invoiceItems {
  quantity: number;
  description: string;
  amount: number;
  rate: number;
}
export default defineComponent({
  name: "new-invoice",
  components: { PermissionDenied, PageLoader },
  setup() {
    //store
    const invoiceStore = useCustomerInvoiceStore();
    const { loadingInvoiceData, unauthorized } = storeToRefs(invoiceStore);
    const router = useRouter();
    const refData = ref({
      noDataMessage: ["No Data"],

      formType: "add",
      //loading
      loadingPage: false,
      loadingAction: false,
      products: [],
    });

    const formData = ref({
      //notes: "", //TODO - add notes
      user_reference:
        moment(new Date()).format("DDMMYY") +
        "-" +
        Math.ceil(Math.random() * 1000), //TODO - CHANGE TO PROPER REF
      bill_to_email: "",
      bill_to_name: "",
      bill_to_address: "",
      po_number: "",
      sub_total: 0,
      due_date: "",
      total: 0,
      tax: 0,
      tax_amount: 0,
      discount: 0,
      shipping: 0,
      sub_total_with_discount: 0,

      items: [] as invoiceItems[],
    });

    const loadingPage = ref(true);

    const removeInvoiceItem = (key) => {
      formData.value.items.splice(key, 1);
      calculateTotal();
    };

    const addInvoiceItem = () => {
      formData.value.items.push({
        quantity: 0,
        amount: 0,
        description: "",
        rate: 0,
      });
    };

    const formAddMoneyRequestRef = ref<null | HTMLFormElement>(null);

    const formRules = ref({
      bill_to_email: [
        {
          required: true,
          message: "Recipient email is required",
          trigger: "change",
        },
      ],
      bill_to_name: [
        {
          required: true,
          message: "Recipient name is required",
          trigger: "change",
        },
      ],
      sub_total: [
        {
          required: true,
          message: "Sub total is required",
          trigger: "change",
        },
      ],
      total: [
        {
          required: true,
          message: "Total amount requested is required",
          trigger: "change",
        },
      ],
      due_date: [
        {
          required: true,
          message: "Due date is required",
          trigger: "change",
        },
      ],
    });
    const processInvoice = () => {
      if (!formAddMoneyRequestRef.value) {
        return;
      }
      formAddMoneyRequestRef.value.validate((valid) => {
        if (valid) {
          refData.value.loadingAction = true;

          invoiceStore
            .addInvoice(formData.value)
            .then(() => {
              Message({
                message: "Invoice added successfully, please confirm details.",
                position: "bottom-right",
                type: "success",
                duration: 5000,
                zIndex: 99999,
              });

              router.push(`/invoices`);

              refData.value.loadingAction = false;
            })
            .catch((error) => {
              // get errors from state
              const response = error.response.data;

              if (response.errors) {
                const errors = response.errors;
                for (const key in errors) {
                  Message({
                    message: errors[key][0],
                    //TODO
                    position: "bottom-right",
                    type: "error",
                    duration: 5000,
                    zIndex: 99999,
                  });
                }
              } else if (response.error) {
                Message({
                  message: response.error,
                  //TODO
                  position: "bottom-right",
                  type: "error",
                  duration: 5000,
                  zIndex: 99999,
                });
              }
            })
            .finally(() => (refData.value.loadingAction = false));
          //do nothing.
        } else {
          console.log("error");
          return false;
        }
      });
    };

    const verifyQuantity = (detail, id) => {
      for (let i = 0; i < formData.value.items.length; i++) {
        if (formData.value.items[i] == id) {
          if (isNaN(detail.quantity)) {
            formData.value.items[i].quantity = 1;
          }
          calculateTotal();
          forceUpdate();
        }
      }
    };

    const calculateTotal = () => {
      formData.value.sub_total = 0;
      let net_amount = 0;

      for (let i = 0; i < formData.value.items.length; i++) {
        formData.value.items[i].amount =
          formData.value.items[i].quantity * formData.value.items[i].rate;

        net_amount += formData.value.items[i].amount;
      }
      formData.value.sub_total = net_amount;
      formData.value.sub_total_with_discount =
        net_amount - formData.value.discount;

      formData.value.tax_amount =
        (formData.value.sub_total_with_discount * formData.value.tax) / 100;
      formData.value.total =
        formData.value.sub_total_with_discount +
        formData.value.tax_amount +
        formData.value.shipping;
    };

    const forceUpdate = () => {
      const instance = getCurrentInstance();
      instance?.proxy?.$forceUpdate();
    };

    onMounted(() => {
      loadingPage.value = false;
    });
    //output formatting
    let { formatCurrencyAmount, formatDateTime, formatTime, formatDate } =
      useOutputFormat();
    return {
      loadingPage,

      removeInvoiceItem,
      addInvoiceItem,
      refData,
      processInvoice,
      calculateTotal,

      verifyQuantity,

      //state
      loadingInvoiceData,
      unauthorized,

      //
      formRules,
      formData,
      formAddMoneyRequestRef,

      //composable
      formatCurrencyAmount,
      formatDateTime,
      formatTime,
      formatDate,
    };
  },
});
</script>
