<template>
  <!--begin::Wrapper-->
  <div class="d-flex flex-column flex-column-fluid">
    <!--begin::Content-->
    <div class="d-flex flex-column flex-center p-10">
      <!--begin::Wrapper-->

      <div class="card card-flush w-lg-1000px py-5 pt-0">
        <!--begin::Body-->
        <div class="card-body p-lg-17">
          <!--begin::Hero-->
          <div class="position-relative mb-17">
            <div class="mb-2 text-center">
              <router-link to="/" class="">
                <img
                  alt="Logo"
                  src="/media/logos/custom-2.svg"
                  class="h-40px"
                  ref="picture"
                />
              </router-link>
            </div>
            <!--end::Logo-->

            <div class="separator separator-dashed mb-5"></div>
            <!--begin::Overlay-->
            <div class="overlay overlay-show">
              <!--begin::Image-->
              <div
                class="bgi-no-repeat bgi-position-center bgi-size-cover card-rounded min-h-150px"
                style="background-image: url('/media/donations/img-4.jpg')"
              ></div>
              <!--end::Image-->
              <!--begin::layer-->
              <div
                class="overlay-layer rounded bg-black"
                style="opacity: 0.4"
              ></div>
              <!--end::layer-->
            </div>
            <!--end::Overlay-->
            <!--begin::Heading-->
            <div class="position-absolute text-white mb-8 ms-10 bottom-0">
              <!--begin::Title-->
              <h3 class="text-white fs-2qx fw-bold mb-3 m">
                Donations with SPPAY
              </h3>
              <!--end::Title-->
              <!--begin::Text-->
              <div class="fs-5 fw-semibold">
                Let’s contribute to make world a better place
              </div>
              <!--end::Text-->
            </div>
            <!--end::Heading-->
          </div>
          <!--end::-->
          <!--begin::Layout-->
          <DataLoader v-if="loadingPaymentData"></DataLoader>
          <div class="d-flex flex-column flex-lg-row mb-17" v-else>
            <!--begin::Content-->
            <div class="flex-lg-row-fluid me-0 me-lg-20">
              <!--begin::Job-->
              <div class="mb-10 mb-lg-0">
                <!--begin::Description-->
                <div class="m-0">
                  <!--begin::Title-->
                  <h4 class="fs-1 text-gray-800 w-bolder mb-6">
                    {{ campaignData.title }}
                  </h4>
                  <!--end::Title-->

                  <!--begin::Row-->
                  <div class="row g-12">
                    <!--begin::Col-->
                    <div class="col-12">
                      <!--begin::Earnings-->
                      <div class="cards card-xxl-stretch mb-5 mb-xxl-10">
                        <div class="separator separator-dashed mb-5"></div>

                        <!--begin::Body-->
                        <div class="card-bodys">
                          <span
                            class="fs-5 fw-semibold text-gray-600 pb-5 d-block"
                            >Fund Raiser: {{ campaignData.user_id }}
                          </span>

                          <span
                            class="fs-5 fw-semibold text-gray-600 pb-5 d-block"
                            >Created On:
                            {{ formatDateTime(campaignData.created_at) }}
                          </span>

                          <!--begin::Left Section-->
                          <div
                            class="d-flex flex-wrap justify-content-between pb-6"
                          >
                            <!--begin::Stats-->
                            <div class="row">
                              <!--begin::Col-->
                              <div class="col-4">
                                <div
                                  class="card card-dashed flex-center min-w-150px my-3 p-6"
                                >
                                  <span
                                    class="fs-2 fw-semibold text-info pb-1 px-2"
                                    >Goal</span
                                  >
                                  <span
                                    class="fs-2 fw-bold d-flex justify-content-center"
                                  >
                                    <!--                                    {{ campaignData.currency_code }}-->
                                    <span
                                      data-kt-countup="true"
                                      data-kt-countup-value="63,240.00"
                                    >
                                      {{
                                        formatCurrencyAmount(campaignData.goal)
                                      }}</span
                                    ></span
                                  >
                                </div>
                              </div>
                              <!--end::Col-->
                              <!--begin::Col-->
                              <div class="col-4">
                                <div
                                  class="card card-dashed flex-center min-w-150px my-3 p-6"
                                >
                                  <span
                                    class="fs-4 fw-semibold text-success pb-1 px-2"
                                    >Amt Raised</span
                                  >
                                  <span
                                    class="fs-2 fw-bold d-flex justify-content-center"
                                  >
                                    <span
                                      data-kt-countup="true"
                                      data-kt-countup-value="8,530.00"
                                    >
                                      {{
                                        formatCurrencyAmount(
                                          campaignData.donated
                                        )
                                      }}</span
                                    ></span
                                  >
                                </div>
                              </div>
                              <!--end::Col-->
                              <!--begin::Col-->
                              <div class="col-4">
                                <div
                                  class="card card-dashed flex-center min-w-150px my-3 p-6"
                                >
                                  <span
                                    class="fs-4 fw-semibold text-danger pb-1 px-2"
                                    >Amt Left</span
                                  >
                                  <span
                                    class="fs-2 fw-bold d-flex justify-content-center"
                                  >
                                    <!--                                    {{ campaignData.currency_code }}-->
                                    <span
                                      data-kt-countup="true"
                                      data-kt-countup-value="2,600"
                                    >
                                      {{
                                        formatCurrencyAmount(
                                          campaignData.amount_to_goal
                                        )
                                      }}</span
                                    ></span
                                  >
                                </div>
                              </div>
                              <!--end::Col-->
                            </div>
                            <!--end::Stats-->
                          </div>
                          <!--end::Left Section-->

                          <div class="separator separator-dashed mb-5"></div>
                        </div>
                        <!--end::Body-->
                      </div>
                      <!--end::Earnings-->
                    </div>
                    <!--end::Col-->
                  </div>
                  <!--end::Row-->

                  <!--begin::Text-->
                  <p class="fw-semibold fs-4 text-gray-600 mb-2">
                    {{ campaignData.description }}
                  </p>
                  <!--end::Text-->
                </div>
                <!--end::Description-->
              </div>
              <!--end::Job-->
            </div>
            <!--end::Content-->
            <!--begin::Sidebar-->
            <div class="flex-lg-row-auto w-100 w-lg-275px w-xxl-350px">
              <!--begin::Careers about-->
              <div class="card">
                <!--begin::Body-->
                <div class="card-body">
                  <!--begin::Progress-->
                  <div class="d-flex flex-column mb-10">
                    <div
                      class="d-flex justify-content-between w-100 fs-4 fw-bold mb-3"
                    >
                      <span>Amount Raised</span>
                      <span>
                        {{ formatCurrencyAmount(campaignData.donated) }}
                        of
                        {{ formatCurrencyAmount(campaignData.goal) }}
                      </span>
                    </div>
                    <div class="h-8px bg-light rounded mb-3">
                      <div
                        class="bg-success rounded h-8px"
                        role="progressbar"
                        style="width: 68%"
                        aria-valuenow="50"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                    <div class="fw-semibold text-gray-600">
                      {{ campaignData.donated }} Backers of this campaign
                    </div>
                  </div>
                  <!--end::Progress-->

                  <!--begin::Top-->
                  <div class="mb-7">
                    <!--begin::Title-->
                    <h2 class="fs-1 text-gray-800 w-bolder mb-6">
                      Make a donation
                    </h2>
                    <!--end::Title-->

                    <!--begin::Form-->
                    <PageLoader v-if="loadingPage"></PageLoader>
                    <div v-else class="cardS">
                      <div class="card-bodyS">
                        <div class="row">
                          <div class="col-md-12">
                            <h2
                              v-if="form.step === 'validated'"
                              class="text-center"
                            >
                              Confirm Payment
                            </h2>
                            <h2
                              v-if="form.step === 'initiated'"
                              class="text-center"
                            >
                              Approve Payment
                            </h2>
                            <h2
                              v-if="form.step === 'confirmed'"
                              class="text-center"
                            >
                              Payment Submitted
                            </h2>
                            <div class="separator separator-dashed mb-5"></div>
                          </div>
                        </div>

                        <div class="row">
                          <!--begin::Form-->
                          <form class="">
                            <!--begin:: Input-->
                            <div
                              v-if="form.step === 'input'"
                              class="current"
                              data-kt-stepper-element="content"
                            >
                              <div class="w-100">
                                <!--begin::Input group-->
                                <div class="mb-10 fv-row">
                                  <!--begin::Label-->
                                  <label class="form-label mb-3"
                                    >Payment Method</label
                                  >
                                  <!--end::Label-->

                                  <!--begin::Input-->
                                  <div>
                                    <Field
                                      name="institution_id"
                                      class="form-select form-select-solid select2-hidden-accessible"
                                      placeholder="Month"
                                      as="select"
                                      v-model="request.payee.account.code"
                                      :disabled="loading"
                                    >
                                      <option value="">
                                        Select Payment Method
                                      </option>
                                      <option
                                        v-for="institution in form.debit_institutions"
                                        :key="institution.code"
                                        :value="institution.code"
                                      >
                                        {{ institution.name }}
                                      </option>
                                    </Field>
                                    <ErrorMessage
                                      class="fv-plugins-message-container invalid-feedback"
                                      name="institution_id"
                                    />
                                  </div>

                                  <!--end::Input-->
                                </div>
                                <div class="mb-10 fv-row">
                                  <!--begin::Label-->
                                  <label class="form-label mb-3"
                                    >Debit Account Number</label
                                  >
                                  <!--end::Label-->

                                  <!--begin::Input-->
                                  <input
                                    type="text"
                                    class="form-control form-control-lg form-control-solid"
                                    v-model="request.payee.account.number"
                                    placeholder="Enter Account Number to Initiate Payment From E.g. 027XXXXXXX"
                                  />
                                  <ErrorMessage
                                    name="accountName"
                                    class="fv-plugins-message-container invalid-feedback"
                                  ></ErrorMessage>
                                  <!--end::Input-->
                                </div>
                                <div class="mb-10 fv-row">
                                  <!--begin::Label-->
                                  <label class="form-label mb-3">Amount</label>
                                  <!--end::Label-->

                                  <!--begin::Input-->
                                  <input
                                    type="text"
                                    class="form-control form-control-lg form-control-solid"
                                    v-model="request.amount"
                                    placeholder="Enter Amount"
                                  />
                                  <ErrorMessage
                                    name="accountName"
                                    class="fv-plugins-message-container invalid-feedback"
                                  ></ErrorMessage>
                                  <!--end::Input-->
                                </div>
                                <div class="mb-10 fv-row">
                                  <!--begin::Label-->
                                  <label class="form-label mb-3">Email</label>
                                  <!--end::Label-->

                                  <!--begin::Input-->
                                  <input
                                    type="text"
                                    class="form-control form-control-lg form-control-solid"
                                    v-model="request.payee.email"
                                    placeholder="Enter Email"
                                  />

                                  <ErrorMessage
                                    name="accountName"
                                    class="fv-plugins-message-container invalid-feedback"
                                  ></ErrorMessage>
                                  <!--end::Input-->
                                </div>
                                <!--end::Input group-->
                              </div>
                            </div>
                            <!--begin:: Input-->

                            <!--begin::Validated-->
                            <div
                              v-if="form.step === 'validated'"
                              class="current"
                              data-kt-stepper-element="content"
                            >
                              <div class="w-100">
                                <!--begin::Heading-->
                                <div class="pb-10 pb-lg-15">
                                  <!--begin::Title-->
                                  <h2 class="fw-bold text-dark">
                                    Validation - OTP
                                  </h2>
                                  <!--end::Title-->

                                  <!--begin::Notice-->
                                  <div class="text-gray-400 fw-semobold fs-6">
                                    {{ validated.message }}
                                  </div>
                                  <!--end::Notice-->
                                </div>
                                <!--end::Heading-->

                                <div class="w-100">
                                  <!--begin::Input group-->
                                  <div class="d-flex flex-column mb-7 fv-row">
                                    <!--begin::Label-->
                                    <label
                                      class="d-flex align-items-center fs-6 fw-semobold form-label mb-2"
                                    >
                                      <span class="required">OTP</span>
                                      <i
                                        class="fas fa-exclamation-circle ms-2 fs-7"
                                        title="Enter OTP"
                                      ></i>
                                    </label>
                                    <!--end::Label-->

                                    <Field
                                      type="text"
                                      class="form-control form-control-solid"
                                      placeholder="Enter OTP - you will receive this on your phone"
                                      name="nameOnCard"
                                      v-model="request.otp.pin"
                                      :disabled="loading"
                                    />
                                    <ErrorMessage
                                      class="fv-plugins-message-container invalid-feedback"
                                      name="otpError"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <!--begin::Validated-->

                            <!--begin::Confirmed-->
                            <div
                              v-if="form.step === 'confirmed'"
                              class="current"
                              data-kt-stepper-element="content"
                            >
                              <div class="">
                                <!--begin::Body-->
                                <div class="">
                                  <!--begin::Alert-->
                                  <div
                                    class="notice d-flex bg-light-warning rounded border-warning border border-dashed p-6"
                                  >
                                    <!--begin::Icon-->
                                    <span
                                      class="svg-icon svg-icon-2tx svg-icon-warning me-4"
                                    >
                                      <inline-svg
                                        src="/media/icons/duotune/general/gen044.svg"
                                      />
                                    </span>
                                    <!--end::Icon-->
                                    <!--begin::Wrapper-->
                                    <div class="d-flex flex-stack flex-grow-1">
                                      <!--begin::Content-->
                                      <div class="fw-semobold">
                                        <div class="fs-6 text-gray-600">
                                          {{ confirmed.message }}
                                        </div>
                                      </div>
                                      <!--end::Content-->
                                    </div>
                                    <!--end::Wrapper-->
                                  </div>
                                  <!--end::Alert-->

                                  <br />

                                  <div class="col-md-12">
                                    Status:
                                    <span
                                      v-if="confirmed.transaction.status === 1"
                                      class="badge badge-primary"
                                      >Created</span
                                    >
                                    <span
                                      v-if="confirmed.transaction.status === 2"
                                      class="badge badge-info"
                                      >Submitted</span
                                    >
                                    <span
                                      v-if="confirmed.status === 3"
                                      class="badge badge-warning"
                                      >Processing</span
                                    >
                                    <span
                                      v-if="confirmed.status === 4"
                                      class="badge badge-success"
                                      >Success</span
                                    >
                                    <span
                                      v-if="confirmed.transaction.status === 5"
                                      class="badge badge-danger"
                                      >Error</span
                                    >
                                    <span
                                      v-if="confirmed.transaction.status === 6"
                                      class="badge badge-danger"
                                      >Cancelled</span
                                    >
                                  </div>
                                  <div class="col-md-12">
                                    Reference:
                                    <b>{{ confirmed.transaction.reference }}</b>
                                  </div>
                                  <div v-if="confirmed.email" class="col-md-12">
                                    External Reference:
                                    <b>{{ confirmed.email }}</b>
                                  </div>
                                  <div class="col-md-12">
                                    Send Amount:
                                    <b
                                      >{{ confirmed.transaction.currency }}
                                      {{ confirmed.transaction.amount }}</b
                                    >
                                  </div>
                                  <div class="col-md-12">
                                    From:
                                    <b
                                      >{{
                                        confirmed.transaction.debit_account_no
                                      }}
                                      {{
                                        confirmed.transaction.debit_account_name
                                      }}</b
                                    >
                                  </div>
                                  <div
                                    v-if="confirmed.credit_account_name"
                                    class="col-md-12"
                                  >
                                    Recipient Name:
                                    <b>{{ confirmed.credit_account_name }}</b>
                                  </div>
                                  <div
                                    v-if="confirmed.charge"
                                    class="col-md-12"
                                  >
                                    Charge: <b>{{ confirmed.charge.amount }}</b>
                                  </div>
                                  <div v-if="confirmed.tax" class="col-md-12">
                                    Taxable Amount:
                                    <b>{{ validated.taxable_amount }}</b>
                                  </div>
                                  <div v-if="confirmed.tax" class="col-md-12">
                                    Tax: <b>{{ confirmed.tax.amount }}</b>
                                  </div>

                                  <hr />
                                </div>
                                <!--end::Body-->
                              </div>
                            </div>
                            <!--begin::Confirmed-->
                          </form>
                          <!--end::Form-->
                          <div v-if="form.step === 'input'" class="col-md-12">
                            <div class="row">
                              <div class="col-12 mb-3 text-right">
                                <button
                                  class="btn btn-success"
                                  type="submit"
                                  @click.prevent="validatePayment()"
                                  :disabled="loading"
                                >
                                  <svg
                                    v-if="loading"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    class="feather feather-loader spin ml-2"
                                  >
                                    <line x1="12" y1="2" x2="12" y2="6"></line>
                                    <line
                                      x1="12"
                                      y1="18"
                                      x2="12"
                                      y2="22"
                                    ></line>
                                    <line
                                      x1="4.93"
                                      y1="4.93"
                                      x2="7.76"
                                      y2="7.76"
                                    ></line>
                                    <line
                                      x1="16.24"
                                      y1="16.24"
                                      x2="19.07"
                                      y2="19.07"
                                    ></line>
                                    <line x1="2" y1="12" x2="6" y2="12"></line>
                                    <line
                                      x1="18"
                                      y1="12"
                                      x2="22"
                                      y2="12"
                                    ></line>
                                    <line
                                      x1="4.93"
                                      y1="19.07"
                                      x2="7.76"
                                      y2="16.24"
                                    ></line>
                                    <line
                                      x1="16.24"
                                      y1="7.76"
                                      x2="19.07"
                                      y2="4.93"
                                    ></line>
                                  </svg>
                                  <span v-else>Donate Now</span>
                                </button>
                              </div>
                            </div>
                          </div>
                          <div
                            v-if="form.step === 'validated'"
                            class="col-md-12"
                            style="font-size: 14px"
                          >
                            <!--TODO-->
                            <!--                  <div class="col-md-12">-->
                            <!--                    <h5>Amount</h5>-->
                            <!--                    <div class="col-md-12">Send Amount: <b>{{ validated.debit_currency }} {{ validated.debit_amount | formatAmount }}</b></div>-->
                            <!--                    <div class="col-md-12">Charge: <b>{{ validated.charge_amount | formatAmount }}</b></div>-->
                            <!--                    <div class="col-md-12 mb-2">Account to Charge: <b>{{ validated.charge_account }}</b></div>-->
                            <!--                    <div class="col-md-12">Taxable Amount: <b>{{ validated.taxable_amount | formatAmount }}</b></div>-->
                            <!--                    <div class="col-md-12">Tax: <b>{{ validated.tax_amount | formatAmount }}</b></div>-->
                            <!--                    <div class="col-md-12">Account to Tax: <b>{{ validated.tax_account }}</b></div>-->
                            <!--                  </div>-->
                            <hr />
                            <div class="row">
                              <div class="col-12 mb-3 text-right">
                                <button
                                  class="btn btn-warning me-5"
                                  type="submit"
                                  @click.prevent="form.step = 'input'"
                                  :disabled="loading"
                                >
                                  <i class="mdi mdi-content-save"></i> Edit
                                  Details
                                </button>
                                <button
                                  class="btn btn-success"
                                  type="submit"
                                  @click.prevent="confirmPayment()"
                                  :disabled="loading"
                                >
                                  <svg
                                    v-if="loading"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    class="feather feather-loader spin ml-2"
                                  >
                                    <line x1="12" y1="2" x2="12" y2="6"></line>
                                    <line
                                      x1="12"
                                      y1="18"
                                      x2="12"
                                      y2="22"
                                    ></line>
                                    <line
                                      x1="4.93"
                                      y1="4.93"
                                      x2="7.76"
                                      y2="7.76"
                                    ></line>
                                    <line
                                      x1="16.24"
                                      y1="16.24"
                                      x2="19.07"
                                      y2="19.07"
                                    ></line>
                                    <line x1="2" y1="12" x2="6" y2="12"></line>
                                    <line
                                      x1="18"
                                      y1="12"
                                      x2="22"
                                      y2="12"
                                    ></line>
                                    <line
                                      x1="4.93"
                                      y1="19.07"
                                      x2="7.76"
                                      y2="16.24"
                                    ></line>
                                    <line
                                      x1="16.24"
                                      y1="7.76"
                                      x2="19.07"
                                      y2="4.93"
                                    ></line>
                                  </svg>
                                  <span v-else> Initiate Payment</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!--end::Form-->
                  </div>
                  <!--end::Top-->
                </div>
                <!--end::Body-->
              </div>
              <!--end::Careers about-->
            </div>
            <!--end::Sidebar-->
          </div>
          <!--end::Layout-->

          <!--begin::Card-->
          <div class="card mb-4 bg-light text-center">
            <!--begin::Body-->
            <div class="card-body py-12">
              <!--begin::Icon-->
              <a href="#" class="mx-4">
                <img
                  src="/media/svg/brand-logos/facebook-4.svg"
                  class="h-30px my-2"
                  alt=""
                />
              </a>
              <!--end::Icon-->
              <!--begin::Icon-->
              <a href="#" class="mx-4">
                <img
                  src="/media/svg/brand-logos/instagram-2-1.svg"
                  class="h-30px my-2"
                  alt=""
                />
              </a>
              <!--end::Icon-->
              <!--begin::Icon-->
              <a href="#" class="mx-4">
                <img
                  src="/media/svg/brand-logos/github.svg"
                  class="h-30px my-2"
                  alt=""
                />
              </a>
              <!--end::Icon-->
              <!--begin::Icon-->
              <a href="#" class="mx-4">
                <img
                  src="/media/svg/brand-logos/behance.svg"
                  class="h-30px my-2"
                  alt=""
                />
              </a>
              <!--end::Icon-->
              <!--begin::Icon-->
              <a href="#" class="mx-4">
                <img
                  src="/media/svg/brand-logos/pinterest-p.svg"
                  class="h-30px my-2"
                  alt=""
                />
              </a>
              <!--end::Icon-->
              <!--begin::Icon-->
              <a href="#" class="mx-4">
                <img
                  src="/media/svg/brand-logos/twitter.svg"
                  class="h-30px my-2"
                  alt=""
                />
              </a>
              <!--end::Icon-->
              <!--begin::Icon-->
              <a href="#" class="mx-4">
                <img
                  src="/media/svg/brand-logos/dribbble-icon-1.svg"
                  class="h-30px my-2"
                  alt=""
                />
              </a>
              <!--end::Icon-->

              <!--begin::Icon-->
              <a href="#" class="mx-4">
                <img
                  src="/media/svg/brand-logos/whatsapp-2.svg"
                  class="h-30px my-2"
                  alt=""
                />
              </a>
              <!--end::Icon-->
            </div>
            <!--end::Body-->
          </div>
          <!--end::Card-->
        </div>
        <!--end::Body-->
      </div>
    </div>
  </div>

  <!--end::Wrapper-->
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from "vue";
import { useBodyStore } from "@/stores/body";
import { useThemeStore } from "@/stores/theme";
import LayoutService from "@/core/services/LayoutService";
import { getIllustrationsPath } from "@/core/helpers/assets";
import { useRoute } from "vue-router";
import { useGuestPaymentStore } from "@/stores/guest/payment";

import PageLoader from "@/components/PageLoader.vue";
import Message from "vue-m-message";
import { Field, ErrorMessage } from "vee-validate";
import { storeToRefs } from "pinia";
import { useGuestGeneralStore } from "@/stores/guest/general";
import DataLoader from "@/components/DataLoader.vue";
import useOutputFormat from "@/composables/useOutputFormat";

export default defineComponent({
  name: "guest-donations",
  components: { DataLoader, PageLoader, Field, ErrorMessage },
  setup() {
    const storeBody = useBodyStore();
    const storeTheme = useThemeStore();
    const themeMode = computed(() => {
      return storeTheme.mode;
    });
    const bgImage = themeMode.value !== "dark" ? "bg5.png" : "bg1-dark.jpg";

    const loadingPage = ref(true);

    //payment
    //guest payment store
    const paymentStore = useGuestPaymentStore();
    const { loadingPaymentData, campaignData } = storeToRefs(paymentStore);
    const { getCampaign } = useGuestPaymentStore();
    //common store
    const generalStore = useGuestGeneralStore();
    const { loadingGeneralData } = storeToRefs(generalStore);
    const route = useRoute();

    const loadingData = ref(false);
    const loading = ref(false);

    const form = ref({
      step: "input",
      debit_institutions: [] as any,
    });

    const request = ref({
      collection_type: "campaign" as any,
      collection_reference: "" as any,
      amount: 0,
      payee: {
        email: "",
        account: {
          code: "",
          number: "",
        },
      },
      otp: {
        id: "",
        pin: "",
      },
    });

    const validated = ref({} as any);

    const confirmed = ref({} as any);

    const instantiateForm = () => {
      request.value.collection_reference = route.params.reference;
      request.value.collection_type = "campaign";
      getInstitutions(); // Not async, so will run in background :)
    };

    const getInstitutions = () => {
      generalStore.getInstitutions({ type_id: 3 }).then((response) => {
        form.value.debit_institutions = response;
        //TODO
        //   sort institutions to debit and credit institutions
        // data.value.form.debit_institutions =
        //   data.value.form.credit_institutions.filter(function (
        //     institution: any
        //   ) {
        //     return institution.type_id === "3"; // Get only mobile money institutions
        //   });d
      });
    };

    const validatePayment = () => {
      JSON.stringify(request);
      console.log("request", 1);
      loading.value = true;
      paymentStore
        .validatePayment(request.value)

        .then((response: any) => {
          validated.value = response.data;
          request.value.otp.id = response.data.otp_id;
          form.value.step = "validated";
          console.log(response);
          Message({
            message: "Validation successful, please confirm details.",
            position: "bottom-right",
            type: "success",
            duration: 5000,
            zIndex: 99999,
          });
        })
        .catch((error) => {
          // get errors from state
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
        .finally(() => (loading.value = false));
    };

    const confirmPayment = () => {
      loading.value = true;

      paymentStore
        .submitPayment(request.value)
        .then((response: any) => {
          confirmed.value = response.data;

          form.value.step = "confirmed";

          Message({
            message: "Payment submitted successfully.",
            position: "bottom-right",
            type: "success",
            duration: 5000,
            zIndex: 99999,
          });
        })
        .catch((error) => {
          // get errors from state
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
        .finally(() => (loading.value = false));
    };

    let { formatCurrencyAmount, formatDateTime, formatTime, formatDate } =
      useOutputFormat();

    onMounted(() => {
      loadingPage.value = true;

      LayoutService.emptyElementClassesAndAttributes(document.body);

      storeBody.addBodyClassname("bg-body");
      storeBody.addBodyAttribute({
        qualifiedName: "style",
        value: `background-image: url("/media/auth/${bgImage}")`,
      });

      getCampaign(route.params.reference);
      instantiateForm();

      loadingPage.value = false;
    });
    return {
      //page
      getIllustrationsPath,
      bgImage,
      loadingPage,

      //form
      validatePayment,
      confirmPayment,
      instantiateForm,

      loadingData,
      loading,
      form,
      request,
      validated,
      confirmed,

      //state
      loadingGeneralData,
      loadingPaymentData,
      campaignData,

      //dates
      formatCurrencyAmount,
      formatDateTime,
      formatTime,
      formatDate,
    };
  },
});
</script>
