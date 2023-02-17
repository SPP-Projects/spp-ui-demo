<template>
  <!--begin::Card-->
  <div class="card">
    <!--begin::Card body-->
    <div class="card-body pt-0">
      <!--begin::Payment Validation-->
      <div
        data-kt-stepper-element="content"
        v-if="stepper === 'validate'"
        class="m-10 p-10"
      >
        <!--begin::Wrapper-->
        <div class="w-100">
          <!--begin::Heading-->
          <div class="pb-8 pb-lg-10">
            <!--begin::Title-->
            <h2 class="fw-bold text-dark text-center">Send Money</h2>
            <!--end::Title-->

            <!--begin::Notice-->
            <div
              class="text-gray-400 fw-semobold fs-6 mt-15"
              v-if="transferStatus.loading === true"
            >
              <div class="text-center">
                <div class="m-4 mb-5">
                  Validating transfer details, please wait ...
                </div>
                <i class="fa-solid fa-spinner fa-spin-pulse fs-4x"></i>
              </div>
            </div>
            <!--end::Notice-->
          </div>
          <!--end::Heading-->

          <!--begin::Body-->
          <div class="mb-0" v-if="transferStatus.loading === false">
            <!--begin::Text-->
            <div class="fs-6 text-gray-600 mb-5"></div>
            <!--end::Text-->

            <div
              v-if="validatedTransferDetails"
              class="col-md-12"
              style="font-size: 14px"
            >
              <div class="col-md-12 mb-3">
                <h5>General Details</h5>

                <div class="col-md-12">
                  Transaction Type:
                  <b>{{ validatedTransferDetails.type_name }}</b>
                </div>

                <div class="col-md-12">
                  Send Amount:
                  <b
                    >{{ validatedTransferDetails.debit_currency }}
                    {{ validatedTransferDetails.debit_amount }}</b
                  >
                </div>
                <div class="col-md-12">
                  Rate: <b>{{ validatedTransferDetails.rate }}</b>
                </div>

                <div class="col-md-12">
                  Recipient Receives:
                  <b
                    >{{ validatedTransferDetails.credit_currency }}
                    {{
                      validatedTransferDetails.rate *
                      validatedTransferDetails.debit_amount
                    }}</b
                  >
                </div>
              </div>
              <hr />
              <div class="col-md-12 mb-3">
                <h5>Transfer Details</h5>
                <div class="col-md-12">
                  Debit Currency:
                  <b>{{ validatedTransferDetails.debit_currency }}</b>
                </div>
                <div class="col-md-12">
                  Credit Currency:
                  <b>{{ validatedTransferDetails.credit_currency }}</b>
                </div>
                <div class="col-md-12">
                  Reference:
                  <b>{{ validatedTransferDetails.external_reference }}</b>
                </div>
              </div>
              <hr />
              <div class="col-md-12">
                <h5>Recipient Details</h5>
                <div class="col-md-12">
                  Institution:
                  <b>{{
                    validatedTransferDetails.credit_account_institution_name
                  }}</b>
                </div>
                <div class="col-md-12">
                  Account No:
                  <b>{{ validatedTransferDetails.credit_account_no }}</b>
                </div>
                <div class="col-md-12">
                  Name on Account:
                  <b>{{ validatedTransferDetails.credit_account_name }}</b>
                </div>
              </div>

              <hr />
            </div>
          </div>
          <!--end::Body-->
        </div>
        <!--end::Wrapper-->

        <!--begin::Actions-->
        <div
          class="d-flex flex-stack pt-15"
          v-if="transferStatus.loading === false"
        >
          <!--begin::Wrapper-->
          <div class="me-2">
            <button
              type="button"
              class="btn btn-lg btn-light-primary me-3"
              data-kt-stepper-action="previous"
              @click="startTransfer()"
            >
              <span class="svg-icon svg-icon-3 me-1">
                <inline-svg src="/media/icons/duotune/arrows/arr063.svg" />
              </span>
              Back
            </button>
          </div>
          <!--end::Wrapper-->

          <!--begin::Wrapper-->
          <div>
            <button
              type="submit"
              class="btn btn-lg btn-primary"
              @click.prevent="addRecipientDetails()"
            >
              <span class="indicator-label">
                Add Recipient Details
                <span class="svg-icon svg-icon-3 ms-2 me-0">
                  <inline-svg src="/media/icons/duotune/arrows/arr064.svg" />
                </span>
              </span>
              <span class="indicator-progress">
                Please wait...
                <span
                  class="spinner-border spinner-border-sm align-middle ms-2"
                ></span>
              </span>
            </button>
          </div>
          <!--end::Wrapper-->
        </div>
        <!--end::Actions-->
      </div>
      <!--end:::Payment Validation-->

      <!--begin::Payment Confirmation-->
      <div
        data-kt-stepper-element="content"
        v-if="stepper === 'confirm'"
        class="m-10 p-10"
      >
        <el-form ref="confirmTransferFormRef" :rules="confirmTransferRules">
          <!--begin::Wrapper-->
          <div class="w-100">
            <!--begin::Heading-->
            <div class="pb-8 pb-lg-10">
              <!--begin::Title-->
              <h2 class="fw-bold text-dark text-center">Confirm Payment</h2>
              <!--end::Title-->

              <!--begin::Notice-->
              <div
                class="text-gray-400 fw-semobold fs-6"
                v-if="transferStatus.error !== true"
              >
                <div class="text-center">
                  <div class="m-4 mb-5">Processing Card Payment</div>
                  <i class="fa-solid fa-spinner fa-spin-pulse fs-4x"></i>
                </div>
              </div>
              <!--end::Notice-->
            </div>
            <!--end::Heading-->
            <h1>{{ transferStatus }}</h1>
            <!--begin::Body-->
            <div class="mb-0">
              <!--begin::Text-->
              <div class="fs-6 text-gray-600 mb-5"></div>
              <!--end::Text-->

              <!--begin::Alert-->
              <div
                class="notice d-flex bg-light-warning rounded border-warning border border-dashed p-6"
              >
                <!--begin::Icon-->
                <span class="svg-icon svg-icon-2tx svg-icon-warning me-4">
                  <inline-svg src="/media/icons/duotune/general/gen044.svg" />
                </span>
                <!--end::Icon-->
                <!--begin::Wrapper-->
                <div class="d-flex flex-stack flex-grow-1">
                  <!--begin::Content-->
                  <div class="fw-semobold">
                    <h4 class="text-gray-800 fw-bold">
                      {{ transferStatus.statusMessage }}
                    </h4>
                    <div class="fs-6 text-gray-600">... please wait ...</div>
                  </div>
                  <!--end::Content-->
                </div>
                <!--end::Wrapper-->
              </div>
              <!--end::Alert-->
            </div>
            <!--end::Body-->
          </div>
          <!--end::Wrapper-->

          <!--begin::Actions-->
          <div class="d-flex flex-stack pt-15">
            <!--begin::Wrapper-->
            <div class="me-2">
              <button
                type="button"
                class="btn btn-lg btn-light-primary me-3"
                data-kt-stepper-action="previous"
                @click.prevent="addPaymentDetails()"
              >
                <span class="svg-icon svg-icon-3 me-1">
                  <inline-svg src="/media/icons/duotune/arrows/arr063.svg" />
                </span>
                Back
              </button>
            </div>
            <!--end::Wrapper-->

            <!--begin::Wrapper-->
            <div>
              <button
                type="submit"
                class="btn btn-lg btn-primary"
                @click="addRecipientDetails()"
              >
                <span class="indicator-label">
                  Submit
                  <span class="svg-icon svg-icon-3 ms-2 me-0">
                    <inline-svg src="/media/icons/duotune/arrows/arr064.svg" />
                  </span>
                </span>
                <span class="indicator-progress">
                  Please wait...
                  <span
                    class="spinner-border spinner-border-sm align-middle ms-2"
                  ></span>
                </span>
              </button>
            </div>
            <!--end::Wrapper-->
          </div>
          <!--end::Actions--></el-form
        >
      </div>
      <!--end:::Payment Confirmation-->

      <!--begin::Input Currency and Amount-->
      <div
        data-kt-stepper-element="content"
        v-if="stepper === 'input'"
        class="m-10 p-10"
      >
        <el-form
          ref="validateTransferFormRef"
          :rules="validateTransferRules"
          :model="remittanceForm.validationDetails"
          class="form"
        >
          <!--begin::Wrapper-->
          <div class="w-100">
            <!--begin::Heading-->
            <div class="pb-10 pb-lg-15">
              <h2 class="fw-bold text-dark">Send Money</h2>
              <div class="text-gray-400 fw-semobold fs-6"></div>
            </div>
            <!--end::Heading-->

            <!--begin::Currency and Amount-->
            <div class="row mb-10">
              <!--begin::Col-->
              <div class="col-md-6 fv-row">
                <!--begin::Label-->
                <label class="required fs-6 fw-semobold form-label mb-2"
                  >Currency</label
                >
                <!--end::Label-->

                <!--begin::Row-->
                <div class="row fv-row">
                  <!--begin::Col-->
                  <div class="">
                    <el-form-item prop="debit_currency_code">
                      <el-select
                        name="debit_currency_code"
                        class="form-control"
                        data-placeholder="Currency"
                        as="select"
                        v-model="
                          remittanceForm.validationDetails.debit_currency_code
                        "
                      >
                        <el-option label="GBP" value="GBP">GBP</el-option>
                        <el-option label="USD" value="USD">EUR</el-option>
                        <el-option label="EUR" value="EUR">EUR</el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                  <!--end::Col-->
                </div>
                <!--end::Row-->
              </div>
              <!--end::Col-->

              <!--begin::Col-->
              <div class="col-md-6 fv-row">
                <!--begin::Label-->
                <label
                  class="d-flex align-items-center fs-6 fw-semobold form-label mb-2"
                >
                  <span class="required">Amount</span>
                  <i class="fas ms-2 fs-7" title="Specify amount"></i>
                </label>
                <!--end::Label-->

                <el-form-item prop="amount">
                  <el-input
                    type="number"
                    class="form-control form-control-solid"
                    placeholder="Amount"
                    name="amount"
                    v-model="remittanceForm.validationDetails.amount"
                  />
                </el-form-item>
              </div>
              <!--end::Col-->
            </div>
            <!--end::Currency and Amount-->

            <!--begin::Institution and Account-->
            <div class="row mb-10">
              <!--begin::Col-->
              <div class="col-md-4 fv-row">
                <!--begin::Label-->
                <label class="required fs-6 fw-semobold form-label mb-2"
                  >Institution</label
                >
                <!--end::Label-->

                <!--begin::Row-->
                <div class="row fv-row">
                  <!--begin::Col-->
                  <div class="">
                    <el-form-item prop="credit_account_institution">
                      <el-select
                        name="credit_account_institution"
                        class="form-select form-select-solid"
                        data-control="select2"
                        data-hide-search="true"
                        data-placeholder="Institution"
                        as="select"
                        v-model="
                          remittanceForm.validationDetails
                            .credit_account_institution
                        "
                      >
                        <el-option label="SPPAY" value="1">SPPAY</el-option>
                        <el-option label="MTN" value="26">MTN</el-option>
                        <el-option label="VOD" value="40">VOD</el-option>
                        <el-option label="ATL" value="5">ATL</el-option>
                      </el-select></el-form-item
                    >
                  </div>
                  <!--end::Col-->
                </div>
                <!--end::Row-->
              </div>
              <!--end::Col-->

              <!--begin::Col-->
              <div class="col-md-8 fv-row">
                <!--begin::Label-->
                <label
                  class="d-flex align-items-center fs-6 fw-semobold form-label mb-2"
                >
                  <span class="required">Mobile Number</span>
                  <i
                    class="fas ms-2 fs-7"
                    title="Enter Account Number to Transfer To E.g. 027XXXXXXX"
                  ></i>
                </label>
                <!--end::Label-->
                <el-form-item prop="credit_account_no">
                  <el-input
                    type="text"
                    class="form-control form-control-solid"
                    placeholder="Enter Account Number to Transfer To E.g. 027XXXXXXX"
                    name="credit_account_no"
                    v-model="
                      remittanceForm.validationDetails.credit_account_no
                    "
                /></el-form-item>
              </div>
              <!--end::Col-->
            </div>
            <!--end::Institution and Account-->

            <!--begin::Input group-->
            <div class="d-flex flex-column mb-7 fv-row">
              <!--begin::Label-->
              <label
                class="d-flex align-items-center fs-6 fw-semobold form-label mb-2"
              >
                <span>Reference (Optional)</span>
                <i class="fas ms-2 fs-7" title="Enter reference"></i>
              </label>
              <!--end::Label-->

              <Field
                type="text"
                rows="3"
                class="form-control form-control-solid"
                placeholder=""
                name="external_reference"
                v-model="remittanceForm.validationDetails.external_reference"
              />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="external_reference" />
                </div>
              </div>
            </div>
            <!--end::Input group-->
          </div>
          <!--end::Wrapper-->

          <!--begin::Actions-->
          <div class="d-flex flex-stack pt-15">
            <!--begin::Wrapper-->
            <div class="me-2"></div>
            <!--end::Wrapper-->

            <!--begin::Wrapper-->
            <div>
              <button
                type="submit"
                class="btn btn-lg btn-primary"
                ref="validateTransferButtonRef"
                @click.prevent="validateTransfer()"
              >
                <span class="indicator-label">
                  Validate Transfer
                  <span class="svg-icon svg-icon-3 ms-2 me-0">
                    <inline-svg src="/media/icons/duotune/arrows/arr064.svg" />
                  </span>
                </span>
                <span class="indicator-progress">
                  Please wait...
                  <span
                    class="spinner-border spinner-border-sm align-middle ms-2"
                  ></span>
                </span>
              </button>
            </div>
            <!--end::Wrapper-->
          </div>
          <!--end::Actions-->
        </el-form>
      </div>
      <!--end::Input Currency and Amount-->

      <!--begin::Recipient Details-->
      <div
        data-kt-stepper-element="content"
        v-if="stepper === 'recipient'"
        class="m-10 p-10"
      >
        <el-form
          ref="addRecipientDetailsFormRef"
          :rules="addRecipientDetailsRules"
          class="form"
          :model="remittanceForm.recipientDetails"
          ><!--begin::Wrapper-->
          <div class="w-100">
            <!--begin::Heading-->
            <div class="pb-10 pb-lg-12">
              <!--begin::Title-->
              <h2 class="fw-bold text-dark">Recipient Details</h2>
              <!--end::Title-->

              <!--begin::Notice-->
              <div class="text-gray-400 fw-semobold fs-6"></div>
              <!--end::Notice-->
            </div>
            <!--end::Heading-->

            <!--begin::Recipient Name-->
            <div class="fv-row mb-10">
              <!--begin::Label-->
              <label class="form-label required">Recipient Name</label>
              <!--end::Label-->

              <!--begin::Input-->
              <el-form-item prop="recipient_name">
                <el-input
                  name="recipient_name"
                  class="form-control form-control-lg form-control-solid"
                  v-model="remittanceForm.recipientDetails.recipient_name"
              /></el-form-item>
              <!--end::Input-->
            </div>
            <!--end::Recipient Name-->

            <!--begin::Recipient Email-->
            <div class="fv-row mb-0">
              <!--begin::Label-->
              <label class="fs-6 fw-semobold form-label required"
                >Recipient Email</label
              >
              <!--end::Label-->

              <!--begin::Input-->
              <el-form-item prop="recipient_email">
                <el-input
                  name="recipient_email"
                  class="form-control form-control-lg form-control-solid"
                  v-model="remittanceForm.recipientDetails.recipient_email"
              /></el-form-item>

              <!--end::Input-->
            </div>
            <!--end::Recipient Email-->
          </div>
          <!--end::Wrapper-->

          <!--begin::Actions-->
          <div class="d-flex flex-stack pt-15">
            <!--begin::Wrapper-->
            <div class="me-2">
              <button
                type="button"
                class="btn btn-lg btn-light-primary me-3"
                data-kt-stepper-action="previous"
                @click="startTransfer()"
              >
                <span class="svg-icon svg-icon-3 me-1">
                  <inline-svg src="/media/icons/duotune/arrows/arr063.svg" />
                </span>
                Back
              </button>
            </div>
            <!--end::Wrapper-->

            <!--begin::Wrapper-->
            <div>
              <button
                type="submit"
                class="btn btn-lg btn-primary"
                @click.prevent="addPaymentDetails()"
              >
                <span class="indicator-label">
                  Add Payment Details
                  <span class="svg-icon svg-icon-3 ms-2 me-0">
                    <inline-svg src="/media/icons/duotune/arrows/arr064.svg" />
                  </span>
                </span>
                <span class="indicator-progress">
                  Please wait...
                  <span
                    class="spinner-border spinner-border-sm align-middle ms-2"
                  ></span>
                </span>
              </button>
            </div>
            <!--end::Wrapper-->
          </div>
          <!--end::Actions-->
        </el-form>
      </div>
      <!--end::Recipient Details-->

      <!--begin::Payment Details-->
      <div
        data-kt-stepper-element="content"
        v-if="stepper === 'payment'"
        class="m-10 p-10"
      >
        <el-form
          ref="addPaymentDetailsFormRef"
          :rules="addPaymentDetailsRules"
          class="form"
          :model="remittanceForm.paymentDetails"
        >
          <!--begin::Wrapper-->
          <div class="w-100">
            <!--begin::Heading-->
            <div class="pb-10 pb-lg-15">
              <!--begin::Title-->
              <h2 class="fw-bold text-dark">Payment Details</h2>
              <!--end::Title-->

              <!--begin::Notice-->
              <div class="text-gray-400 fw-semobold fs-6"></div>
              <!--end::Notice-->
            </div>
            <!--end::Heading-->

            <!--begin::Input group-->
            <div class="d-flex flex-column mb-7 fv-row">
              <!--begin::Label-->
              <label
                class="d-flex align-items-center fs-6 fw-semobold form-label mb-2"
              >
                <span class="required">Name On Card</span>
                <i
                  class="fas fa-exclamation-circle ms-2 fs-7"
                  data-bs-toggle="tooltip"
                  title="Specify a card holder's name"
                ></i>
              </label>
              <!--end::Label-->
              <el-form-item prop="name">
                <el-input
                  type="text"
                  class="form-control form-control-solid"
                  placeholder=""
                  v-model="remittanceForm.paymentDetails.name"
                />
              </el-form-item>
            </div>
            <!--end::Input group-->

            <!--begin::Input group-->
            <div class="d-flex flex-column mb-7 fv-row">
              <!--begin::Label-->
              <label class="required fs-6 fw-semobold form-label mb-2"
                >Card Number</label
              >
              <!--end::Label-->

              <!--begin::Input wrapper-->
              <div class="position-relative">
                <!--begin::Input-->

                <div id="card"></div>
                <!--end::Input-->
              </div>
              <!--end::Input wrapper-->
            </div>
            <!--end::Input group-->
          </div>
          <!--end::Wrapper-->

          <div class="d-flex flex-stack pt-15">
            <!--begin::Wrapper-->
            <div class="me-2">
              <button
                type="button"
                class="btn btn-lg btn-light-primary me-3"
                data-kt-stepper-action="previous"
                @click="addRecipientDetails()"
              >
                <span class="svg-icon svg-icon-3 me-1">
                  <inline-svg src="/media/icons/duotune/arrows/arr063.svg" />
                </span>
                Back
              </button>
            </div>
            <!--end::Wrapper-->

            <!--begin::Wrapper-->
            <div>
              <button
                type="submit"
                class="btn btn-lg btn-primary"
                @click.prevent="confirmTransfer()"
              >
                <span class="indicator-label">
                  Confirm Payment
                  <span class="svg-icon svg-icon-3 ms-2 me-0">
                    <inline-svg src="/media/icons/duotune/arrows/arr064.svg" />
                  </span>
                </span>
                <span class="indicator-progress">
                  Please wait...
                  <span
                    class="spinner-border spinner-border-sm align-middle ms-2"
                  ></span>
                </span>
              </button>
            </div>
            <!--end::Wrapper-->
          </div>
          <!--end::Actions-->
        </el-form>
      </div>
      <!--end::Payment Details-->

      <!--begin::Payment Confirmation-->
      <div
        data-kt-stepper-element="content"
        v-if="stepper === 'complete'"
        class="m-10 p-10 form"
      >
        <!--begin::Wrapper-->
        <div class="w-100">
          <!--begin::Heading-->
          <div class="pb-8 pb-lg-10">
            <!--begin::Title-->
            <h2 class="fw-bold text-dark">Transfer Submitted</h2>
            <!--end::Title-->

            <!--begin::Notice-->
            <div class="text-gray-400 fw-semobold fs-6"></div>
            <!--end::Notice-->
          </div>
          <!--end::Heading-->

          <!--begin::Body-->
          <div class="mb-0">
            <!--begin::Alert-->
            <payment-success
              message="Payment Processed Successfully"
            ></payment-success>
            <!--end::Alert-->
          </div>
          <!--end::Body-->
        </div>
        <!--end::Wrapper-->
        <div class="mb-10"></div>
        <div class="col-md-12" style="font-size: 14px">
          <div class="col-md-12">
            Status:
            <span
              v-if="confirmedTransferDetails.status === 1"
              class="badge badge-primary"
              >Created</span
            >
            <span
              v-if="confirmedTransferDetails.status === 2"
              class="badge badge-info"
              >Submitted</span
            >
            <span
              v-if="confirmedTransferDetails.status === 3"
              class="badge badge-warning"
              >Processing</span
            >
            <span
              v-if="confirmedTransferDetails.status === 4"
              class="badge badge-success"
              >Success</span
            >
            <span
              v-if="confirmedTransferDetails.status === 5"
              class="badge badge-danger"
              >Error</span
            >
            <span
              v-if="confirmedTransferDetails.status === 6"
              class="badge badge-danger"
              >Cancelled</span
            >
          </div>
          <div class="col-md-12">
            Reference: <b>{{ confirmedTransferDetails.reference }}</b>
          </div>
          <div
            v-if="confirmedTransferDetails.external_reference"
            class="col-md-12"
          >
            External Reference:
            <b>{{ confirmedTransferDetails.external_reference }}</b>
          </div>
          <div class="col-md-12">
            Send Amount:
            <b
              >{{ confirmedTransferDetails.currency }}
              {{ confirmedTransferDetails.amount }}</b
            >
          </div>
          <div class="col-md-12">
            From:
            <b
              >{{ confirmedTransferDetails.debit_account_no }}
              {{ confirmedTransferDetails.debit_account_name }}</b
            >
          </div>
          <div class="col-md-12">
            Recipient Institution:
            <b>{{ confirmedTransferDetails.credit_account_institution_id }}</b>
          </div>
          <div class="col-md-12">
            Recipient Account No:
            <b>{{ confirmedTransferDetails.credit_account_no }}</b>
          </div>
          <div
            v-if="confirmedTransferDetails.credit_account_name"
            class="col-md-12"
          >
            Recipient Name:
            <b>{{ confirmedTransferDetails.credit_account_name }}</b>
          </div>
          <div v-if="confirmedTransferDetails.charge" class="col-md-12">
            Charge: <b>{{ confirmedTransferDetails.charge.amount }}</b>
          </div>
        </div>

        <!--begin::Actions-->
        <div class="d-flex flex-stack pt-15">
          <!--begin::Wrapper-->
          <div class="me-2"></div>
          <!--end::Wrapper-->

          <!--begin::Wrapper-->
          <div>
            <router-link to="/remittance" class="link-primary fw-bold"
              ><button type="submit" class="btn btn-sm btn-primary">
                View Transfers
                <span class="svg-icon svg-icon-3 ms-1 me-0">
                  <inline-svg src="/media/icons/duotune/arrows/arr064.svg" />
                </span></button></router-link
            >.
          </div>
          <!--end::Wrapper-->
        </div>
        <!--end::Actions-->
      </div>
      <!--end:::Payment Confirmation-->
    </div>

    <!--end::Card body-->
  </div>
  <!--end::Card-->
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";

import { ErrorMessage, Field } from "vee-validate";
import { loadStripe } from "@stripe/stripe-js";
import Message from "vue-m-message";
import { useCustomerRemittanceStore } from "@/stores/remittance/remittance";

import PaymentSuccess from "@/views/remittance/success.vue";

export default defineComponent({
  name: "create-account-modal",
  components: {
    PaymentSuccess,
    Field,
    ErrorMessage,
  },
  setup() {
    const remittanceStore = useCustomerRemittanceStore();

    const loading = ref(false);

    const remittanceForm = ref({
      stepper: "input",
      validationDetails: {
        //TODO - Add more code
        debit_account_no: "CARD",
        //TODO - Add more code
        debit_account_institution: "42",
        debit_currency_code: "GBP",
        credit_account_no: "1016", //0257025683",
        credit_account_institution: "1", //"26",
        amount: "50",
        external_reference: "Welcome to our test",
        payment_intent_id: "",
      },
      recipientDetails: {
        recipient_name: "Michael Boateng",
        recipient_email: "thuggistry@gmail.com",
        recipient_address: "Accra",
        recipient_city: "Accra",
        recipient_state: "Ghana",
        recipient_zip_code: "23321",
      },
      paymentDetails: {
        name: "michael",
        email: "thuggistry@gmail.com",
        address: {
          city: "accra",
          line1: "address",
          state: "state",
          postal_code: "zip",
        },
      },
      paymentIntentDetails: {
        secret: "",
        payment_token: "",
      },
    });

    const transferStatus = ref({
      loading: false,
      error: false,
      status: "",
      statusTitle: "",
      statusMessage: "",
    });

    const validatedTransferDetails = ref({} as any);

    const confirmed = ref({} as any);

    const stepper = ref("input");

    const startTransfer = () => {
      stepper.value = "input";
    };
    const validateTransfer = () => {
      if (!validateTransferFormRef.value) {
        return;
      }

      validateTransferFormRef.value.validate((valid: boolean) => {
        if (valid) {
          loading.value = true;
          stepper.value = "validate";
          transferStatus.value.loading = true;
          loading.value = true;

          setTimeout(() => {
            //TODO - validation
            // if (submitButtonRef.value) {
            //   submitButtonRef.value.disabled = false;
            //
            //   submitButtonRef.value?.removeAttribute("data-kt-indicator");
            // }

            remittanceStore
              .validateRemittance(remittanceForm.value.validationDetails)
              .then(async (response: any) => {
                console.log(response);
                validatedTransferDetails.value = response;
                remittanceForm.value.validationDetails.payment_intent_id =
                  response.payment_intent.id;
              })
              .catch((error) => {
                stepper.value = "input";
                loading.value = false;
                const response = error.response.data;

                if (response.errors) {
                  const errors = response.errors;
                  for (const key in errors) {
                    Message({
                      message: errors[key][0],
                      position: "bottom-right",
                      type: "error",
                      duration: 5000,
                      zIndex: 99999,
                    });
                  }
                } else if (response.error) {
                  Message({
                    message: response.error,
                    position: "bottom-right",
                    type: "error",
                    duration: 5000,
                    zIndex: 99999,
                  });
                }
              })
              .finally(function () {
                loading.value = false;
                transferStatus.value.loading = false;
              });
          }, 2000);
        } else {
          stepper.value = "input";
          return false;
        }
      });
    };

    const addRecipientDetails = () => {
      stepper.value = "recipient";
    };

    let stripe = "" as any;
    let elements = "" as any;
    let cardElement = "" as any;

    const addPaymentDetails = async () => {
      stepper.value = "payment";

      stripe = await loadStripe(
        "pk_test_51I6SdiGlH0aO6inDfRKEjC9f6Xc4d5l37IvGI0gSijHm38WRxt74QXS1sl8NtChtESqMypV2YzqDXQOUGUnZVm0y00CKC6pML1"
      );

      elements = stripe.elements();
      cardElement = elements.create("card", {
        hidePostalCode: true,
        //showIcon: true,
        classes: {
          base: "form-control bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 text-base outline-none text-gray-700 p-3 leading-8 transition-colors duration-200 ease-in-out",
        },
      });
      cardElement.mount("#card");

      // console.log("before");
      // if (!addRecipientDetailsFormRef.value) {
      //   return;
      // }
      // console.log("done");
      // addRecipientDetailsFormRef.value.validate(async (valid: boolean) => {
      //   if (valid) {
      //     stepper.value = "payment";
      //
      //     stripe = await loadStripe(
      //       "pk_test_51I6SdiGlH0aO6inDfRKEjC9f6Xc4d5l37IvGI0gSijHm38WRxt74QXS1sl8NtChtESqMypV2YzqDXQOUGUnZVm0y00CKC6pML1"
      //     );
      //
      //     elements = stripe.elements();
      //     cardElement = elements.create("card", {
      //       hidePostalCode: true,
      //       //showIcon: true,
      //       classes: {
      //         base: "form-control bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 text-base outline-none text-gray-700 p-3 leading-8 transition-colors duration-200 ease-in-out",
      //       },
      //     });
      //     cardElement.mount("#card");
      //   } else {
      //     return false;
      //   }
      // });
    };

    const confirmedTransferDetails = ref({} as any);

    const confirmTransfer = () => {
      console.log("111");
      if (!addPaymentDetailsFormRef.value) {
        return;
      }
      console.log("222");
      addPaymentDetailsFormRef.value.validate(async (valid: boolean) => {
        if (valid) {
          loading.value = true;
          transferStatus.value.loading = true;

          //log
          transferStatus.value.statusMessage = "Confirming Transfer";
          const paymentProcessing = ref(true);
          const billingDetails = {
            name: "michael",
            email: "thuggistry@gmail.com",
            address: {
              city: "accra",
              line1: "address",
              state: "state",
              postal_code: "zip",
            },
          };

          paymentProcessing.value = true;
          remittanceForm.value.stepper = "confirm";

          //log
          transferStatus.value.statusMessage = "Creating Payment Method";
          const { paymentMethod, error } = await stripe
            .createPaymentMethod({
              type: "card",
              card: cardElement,
              billing_details: billingDetails,
            })
            .catch((error) => {
              transferStatus.value.statusMessage = error;
              transferStatus.value.loading = false;
              transferStatus.value.error = true;
              Message({
                message: error,
                position: "bottom-right",
                type: "error",
                duration: 5000,
                zIndex: 99999,
              });
            });

          stepper.value = "confirm";

          //log
          transferStatus.value.statusMessage = "Checking for card errors";

          if (error) {
            paymentProcessing.value = false;
            console.error(error.message);
            transferStatus.value.error = true;
            transferStatus.value.loading = false;
            transferStatus.value.statusMessage = error.message;
            Message({
              message: error.message,
              position: "bottom-right",
              type: "error",
              duration: 5000,
              zIndex: 99999,
            });
            return;
          }

          setTimeout(() => {
            //TODO
            // self.cardError = {};

            console.log("creating payment method");
          }, 3000);

          transferStatus.value.statusMessage = "Connecting to Stripe";

          await stripe
            .confirmCardPayment(
              validatedTransferDetails.value.payment_intent.client_secret,
              {
                payment_method: paymentMethod.id,
              }
            )
            .then((paymentResult) => {
              transferStatus.value.loading = true;
              transferStatus.value.statusMessage =
                "Confirming Card Payment with Stripe";

              if (paymentResult.error) {
                transferStatus.value.statusMessage =
                  paymentResult.error.message;
                transferStatus.value.loading = false;
                transferStatus.value.error = true;
                Message({
                  message: paymentResult.error.message,
                  position: "bottom-right",
                  type: "error",
                  duration: 5000,
                  zIndex: 99999,
                });
                return;
              } else {
                transferStatus.value.loading = true;
                transferStatus.value.statusMessage =
                  "Confirming Payment with SPPAY";
                setTimeout(() => {
                  //TODO
                  // self.cardError = {};

                  console.log("sending card payment response");
                }, 3000);

                remittanceStore
                  .confirmRemittance(remittanceForm.value.validationDetails)
                  .then((data: any) => {
                    confirmedTransferDetails.value = data;
                    transferStatus.value.statusMessage =
                      "Confirmation with SPPAY Complete";
                    confirmed.value = data;
                    stepper.value = "complete";
                  });

                //TODO
                //  if (data.status === 'succeeded') {
                //    setError(null);
                //    setProcessing(false);
                //   setSucceeded(true);
                //  reset();
                //  }
              }
            })

            .catch((error) => {
              // get errors from state
              transferStatus.value.loading = false;
              transferStatus.value.statusMessage = error;
              Message({
                message: error,
                position: "bottom-right",
                type: "error",
                duration: 5000,
                zIndex: 99999,
              });
              console.log(error);
            })
            .finally(() => {
              loading.value = false;
              transferStatus.value.loading = false;
            });
        } else {
          return false;
        }
      });
    };

    onMounted(() => {
      stepper.value = "input";
    });

    const validateTransferFormRef = ref<null | HTMLFormElement>(null);
    const confirmTransferFormRef = ref<null | HTMLFormElement>(null);
    const addRecipientDetailsFormRef = ref<null | HTMLFormElement>(null);
    const addPaymentDetailsFormRef = ref<null | HTMLFormElement>(null);

    const validateTransferRules = ref({
      debit_account_institution: [
        {
          required: true,
          message: "Please input debit institution",
          trigger: "blur",
        },
      ],
      debit_currency_code: [
        {
          required: true,
          message: "Please select currency",
          trigger: "blur",
        },
      ],
      credit_account_no: [
        {
          required: true,
          message: "Please input recipient mobile number",
          trigger: "blur",
        },
      ],
      credit_account_institution: [
        {
          required: true,
          message: "Please select mobile number",
          trigger: "blur",
        },
      ],
      amount: [
        {
          required: true,
          message: "Please input amount",
          trigger: "blur",
        },
      ],
    });
    const confirmTransferRules = ref({
      eventName: [
        {
          required: true,
          message: "Please input event name",
          trigger: "blur",
        },
      ],
    });
    const addRecipientDetailsRules = ref({
      recipient_name: [
        {
          required: true,
          message: "Please input recipient name",
          trigger: "blur",
        },
      ],
    });
    const addPaymentDetailsRules = ref({
      name: [
        {
          required: true,
          message: "Please input name",
          trigger: "blur",
        },
      ],
    });

    return {
      remittanceForm,
      stepper,
      startTransfer,
      validateTransfer,
      validatedTransferDetails,
      addRecipientDetails,
      addPaymentDetails,
      confirmTransfer,
      confirmedTransferDetails,
      transferStatus,

      //form refs
      validateTransferFormRef,
      confirmTransferFormRef,
      addRecipientDetailsFormRef,
      addPaymentDetailsFormRef,

      //form rules
      validateTransferRules,
      confirmTransferRules,
      addRecipientDetailsRules,
      addPaymentDetailsRules,
    };
  },
});
</script>
