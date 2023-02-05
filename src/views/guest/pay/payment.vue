<template>
  <!--begin::Wrapper-->
  <div class="d-flex flex-column flex-center flex-column-fluid">
    <!--begin::Content-->
    <div class="d-flex flex-column p-10">
      <!--begin::Wrapper-->
      <div class="card card-flush w-lg-650px py-5">
        <div class="card-body py-10 py-lg-10">
          <div>
            <!--begin::Logo-->
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
          </div>

          <div class="w-lg-600px">
            <PageLoader v-if="loadingPage"></PageLoader>
            <div v-else class="col-md-12 mx-auto mt-5">
              <div class="card-body">
                <div class="row">
                  <div class="col-md-12">
                    <h2 v-if="form.step === 'input'" class="text-center">
                      Invoice Payment
                    </h2>
                    <h2 v-if="form.step === 'validated'" class="text-center">
                      Payment Confirmation
                    </h2>
                    <h2 v-if="form.step === 'initiated'" class="text-center">
                      Approve Payment
                    </h2>
                    <h2 v-if="form.step === 'confirmed'" class="text-center">
                      Payment Submitted
                    </h2>
                    <div class="separator separator-dashed m-5"></div>
                  </div>
                </div>

                <div class="fs-6 fw-semibold mb-2">
                  Invoice #: {{ paymentInvoiceData.reference }}
                </div>
                <div class="fs-6 fw-semibold mb-2">
                  Amount: {{ paymentInvoiceData.currency_code }}
                  {{ paymentInvoiceData.total }}
                </div>
                <!--begin::Seperator-->
                <div class="separator separator-dashed mb-7"></div>
                <!--end::Seperator-->

                <div class="row">
                  <!--begin::Stepper Form-->
                  <form
                    class="mx-auto w-100 mw-600px pt-5 pb-10"
                    id="kt_modal_top_up_wallet_stepper_form"
                    ref="createAccountRef"
                  >
                    <!--begin::Step 1 - Payment Details-->
                    <div
                      data-kt-stepper-element="content"
                      class="current"
                      v-if="formStepper.step === 'input'"
                    >
                      <DataLoader v-if="initiatingPayment"
                        >Initiating payment - please wait</DataLoader
                      >
                      <!--begin::Wrapper-->
                      <div class="w-100" v-else>
                        <!--begin::Heading-->
                        <div class="pb-10 pb-lg-12">
                          <!--begin::Title-->
                          <h1 class="fw-bold text-dark">Payment Details</h1>
                          <!--end::Title-->
                          <!--begin::Description-->
                          <div class="text-muted fw-semibold fs-6"></div>
                          <!--end::Description-->
                        </div>
                        <!--end::Heading-->

                        <!--begin::Crypto options-->
                        <div
                          class=""
                          data-kt-modal-top-up-wallet-option="crypto"
                        >
                          <!--begin::Input group-->
                          <div class="mb-10">
                            <!--begin::Label-->
                            <label class="required fs-6 fw-semibold mb-2"
                              >Select Mobile Network</label
                            >
                            <!--End::Label-->
                            <!--begin::Row-->
                            <div class="row row-cols-2 row-cols-md-4 g-5">
                              <!--begin::Col-->
                              <div class="col">
                                <!--begin::Option-->
                                <input
                                  type="radio"
                                  class="btn-check"
                                  name="paymentMethod"
                                  value="VOD"
                                  id="kt_modal_top_up_wallet_coin_option_0"
                                  v-model="request.payee.account.code"
                                />
                                <label
                                  class="btn btn-outline btn-outline-dashed btn-active-light-primary p-7 d-flex flex-column flex-center gap-5 h-100"
                                  for="kt_modal_top_up_wallet_coin_option_0"
                                >
                                  <!--begin::Icon-->
                                  <img
                                    src="/media/momo/vodafone.png"
                                    alt=""
                                    class="w-80px"
                                  />
                                  <!--end::Icon-->
                                  <!--begin::Label-->
                                  <div class="fs-6 fw-bold">Vodafone</div>
                                  <!--end::Label-->
                                </label>
                              </div>
                              <!--end::Col-->
                              <!--begin::Col-->
                              <div class="col">
                                <!--begin::Option-->
                                <input
                                  type="radio"
                                  class="btn-check"
                                  name="paymentMethod"
                                  value="MTN"
                                  id="kt_modal_top_up_wallet_coin_option_1"
                                  v-model="request.payee.account.code"
                                />
                                <label
                                  class="btn btn-outline btn-outline-dashed btn-active-light-primary p-7 d-flex flex-column flex-center gap-5 h-100"
                                  for="kt_modal_top_up_wallet_coin_option_1"
                                >
                                  <!--begin::Icon-->
                                  <img
                                    src="/media/momo/mtn.png"
                                    alt=""
                                    class="w-80px"
                                  />
                                  <!--end::Icon-->
                                  <!--begin::Label-->
                                  <div class="fs-6 fw-bold">MTN</div>
                                  <!--end::Label-->
                                </label>
                              </div>
                              <!--end::Col-->
                              <!--begin::Col-->
                              <div class="col">
                                <!--begin::Option-->
                                <input
                                  type="radio"
                                  class="btn-check"
                                  name="paymentMethod"
                                  value="ATL"
                                  id="kt_modal_top_up_wallet_coin_option_2"
                                  v-model="request.payee.account.code"
                                />
                                <label
                                  class="btn btn-outline btn-outline-dashed btn-active-light-primary p-7 d-flex flex-column flex-center gap-5 h-100"
                                  for="kt_modal_top_up_wallet_coin_option_2"
                                >
                                  <!--begin::Icon-->
                                  <img
                                    src="/media/momo/airteltigo.png"
                                    alt=""
                                    class="w-80px"
                                  />
                                  <!--end::Icon-->
                                  <!--begin::Label-->
                                  <div class="fs-6 fw-bold">Airtel Tigo</div>
                                  <!--end::Label-->
                                </label>
                              </div>
                              <!--end::Col-->
                            </div>
                            <!--end::Row-->
                          </div>
                          <!--end::Input group-->
                        </div>
                        <!--end::Crypto options-->

                        <!--begin::Phone Number-->
                        <div class="fv-row mb-10">
                          <!--begin::Label-->
                          <label class="fs-6 fw-semibold mb-2"
                            >Phone Number
                            <i
                              class="fas fa-exclamation-circle ms-2 fs-7"
                              data-bs-toggle="tooltip"
                              title="Please enter your phone number"
                            ></i
                          ></label>
                          <!--End::Label-->
                          <!--begin::Input-->
                          <input
                            type="text"
                            class="form-control form-control-lg form-control-solid"
                            name="phoneNumber"
                            placeholder="Enter your phone number"
                            v-model="request.payee.account.number"
                            autocomplete="off"
                          />
                          <!--end::Input-->
                        </div>
                        <!--end::Phone Number-->

                        <!--begin::Amount-->
                        <div class="fv-row mb-10">
                          <!--begin::Label-->
                          <label class="fs-6 fw-semibold mb-2"
                            >Amount
                            <i
                              class="fas fa-exclamation-circle ms-2 fs-7"
                              data-bs-toggle="tooltip"
                              title="Please enter the amount you want to pay"
                            ></i
                          ></label>
                          <!--End::Label-->
                          <!--begin::Input-->
                          <input
                            type="number"
                            class="form-control form-control-lg form-control-solid"
                            name="paymentAmount"
                            placeholder="Enter payment amount"
                            v-model="request.amount"
                            autocomplete="off"
                          />
                          <!--end::Input-->
                        </div>
                        <!--end::Amount-->

                        <!--begin::Email-->
                        <div class="fv-row mb-10">
                          <!--begin::Label-->
                          <label class="fs-6 fw-semibold mb-2"
                            >Email Address
                            <i
                              class="fas fa-exclamation-circle ms-2 fs-7"
                              data-bs-toggle="tooltip"
                              title="Please enter your email address"
                            ></i
                          ></label>
                          <!--End::Label-->
                          <!--begin::Input-->
                          <input
                            type="email"
                            class="form-control form-control-lg form-control-solid"
                            name="paymentEmail"
                            placeholder="Enter your email"
                            v-model="request.payee.email"
                            autocomplete="off"
                          />
                          <!--end::Input-->
                        </div>
                        <!--end::Email-->
                      </div>
                      <!--end::Wrapper-->

                      <!--begin::Wrapper-->
                      <div class="d-flex flex-stack pt-10">
                        <!--begin::Wrapper-->

                        <!--              data-kt-stepper-action="previous"-->
                        <div class="me-2">
                          <button
                            type="button"
                            class="btn btn-sm btn-light-primary me-3"
                          >
                            <!--begin::Svg Icon | path: icons/duotune/arrows/arr063.svg-->
                            <span class="svg-icon svg-icon-3 me-1">
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <rect
                                  opacity="0.5"
                                  x="6"
                                  y="11"
                                  width="13"
                                  height="2"
                                  rx="1"
                                  fill="currentColor"
                                />
                                <path
                                  d="M8.56569 11.4343L12.75 7.25C13.1642 6.83579 13.1642 6.16421 12.75 5.75C12.3358 5.33579 11.6642 5.33579 11.25 5.75L5.70711 11.2929C5.31658 11.6834 5.31658 12.3166 5.70711 12.7071L11.25 18.25C11.6642 18.6642 12.3358 18.6642 12.75 18.25C13.1642 17.8358 13.1642 17.1642 12.75 16.75L8.56569 12.5657C8.25327 12.2533 8.25327 11.7467 8.56569 11.4343Z"
                                  fill="currentColor"
                                />
                              </svg>
                            </span>
                            <!--end::Svg Icon-->Back
                          </button>
                        </div>
                        <!--end::Wrapper-->
                        <!--begin::Wrapper-->
                        <div>
                          <button
                            type="button"
                            class="btn btn-sm btn-primary"
                            data-kt-stepper-action="submit"
                            @click="initiatePayment()"
                            ref="initiatePaymentButtonRef"
                          >
                            <span class="indicator-label"
                              >Initiate Payment
                              <!--begin::Svg Icon | path: icons/duotune/arrows/arr064.svg-->
                              <span class="svg-icon svg-icon-3 ms-2 me-0">
                                <svg
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <rect
                                    opacity="0.5"
                                    x="18"
                                    y="13"
                                    width="13"
                                    height="2"
                                    rx="1"
                                    transform="rotate(-180 18 13)"
                                    fill="currentColor"
                                  />
                                  <path
                                    d="M15.4343 12.5657L11.25 16.75C10.8358 17.1642 10.8358 17.8358 11.25 18.25C11.6642 18.6642 12.3358 18.6642 12.75 18.25L18.2929 12.7071C18.6834 12.3166 18.6834 11.6834 18.2929 11.2929L12.75 5.75C12.3358 5.33579 11.6642 5.33579 11.25 5.75C10.8358 6.16421 10.8358 6.83579 11.25 7.25L15.4343 11.4343C15.7467 11.7467 15.7467 12.2533 15.4343 12.5657Z"
                                    fill="currentColor"
                                  />
                                </svg>
                              </span>
                              <!--end::Svg Icon--></span
                            >
                            <span class="indicator-progress"
                              >Please wait...
                              <span
                                class="spinner-border spinner-border-sm align-middle ms-2"
                              ></span
                            ></span>
                          </button>
                          <!--                        <button-->
                          <!--                          type="button"-->
                          <!--                          class="btn btn-lg btn-primary"-->
                          <!--                          data-kt-stepper-action="next"-->
                          <!--                        >-->
                          <!--                          Continue-->
                          <!--                          &lt;!&ndash;begin::Svg Icon | path: icons/duotune/arrows/arr064.svg&ndash;&gt;-->
                          <!--                          <span class="svg-icon svg-icon-3 ms-1 me-0">-->
                          <!--                            <svg-->
                          <!--                              width="24"-->
                          <!--                              height="24"-->
                          <!--                              viewBox="0 0 24 24"-->
                          <!--                              fill="none"-->
                          <!--                              xmlns="http://www.w3.org/2000/svg"-->
                          <!--                            >-->
                          <!--                              <rect-->
                          <!--                                opacity="0.5"-->
                          <!--                                x="18"-->
                          <!--                                y="13"-->
                          <!--                                width="13"-->
                          <!--                                height="2"-->
                          <!--                                rx="1"-->
                          <!--                                transform="rotate(-180 18 13)"-->
                          <!--                                fill="currentColor"-->
                          <!--                              />-->
                          <!--                              <path-->
                          <!--                                d="M15.4343 12.5657L11.25 16.75C10.8358 17.1642 10.8358 17.8358 11.25 18.25C11.6642 18.6642 12.3358 18.6642 12.75 18.25L18.2929 12.7071C18.6834 12.3166 18.6834 11.6834 18.2929 11.2929L12.75 5.75C12.3358 5.33579 11.6642 5.33579 11.25 5.75C10.8358 6.16421 10.8358 6.83579 11.25 7.25L15.4343 11.4343C15.7467 11.7467 15.7467 12.2533 15.4343 12.5657Z"-->
                          <!--                                fill="currentColor"-->
                          <!--                              />-->
                          <!--                            </svg>-->
                          <!--                          </span>-->
                          <!--                          &lt;!&ndash;end::Svg Icon&ndash;&gt;-->
                          <!--                        </button>-->
                        </div>
                        <!--end::Wrapper-->
                      </div>
                      <!--end::Wrapper-->
                    </div>
                    <!--end::Step 1 - Payment Details-->

                    <!--begin::Step 2-->
                    <div data-kt-stepper-element="content" class="d-none">
                      <!--begin::Wrapper-->
                      <div class="w-100">
                        <!--begin::Heading-->
                        <div class="pb-10 pb-lg-12">
                          <!--begin::Title-->
                          <h1 class="fw-bold text-dark">Todo</h1>
                          <!--end::Title-->
                          <!--begin::Description-->
                          <div class="text-muted fw-semibold fs-6"></div>
                          <!--end::Description-->
                        </div>
                        <!--end::Heading-->

                        <!--begin::Phone Number-->
                        <div class="fv-row mb-10">
                          <!--begin::Label-->
                          <label class="fs-6 fw-semibold mb-2"
                            >Phone Number
                            <i
                              class="fas fa-exclamation-circle ms-2 fs-7"
                              data-bs-toggle="tooltip"
                              title="Please enter your phone number"
                            ></i
                          ></label>
                          <!--End::Label-->
                          <!--begin::Input-->
                          <input
                            type="text"
                            class="form-control form-control-lg form-control-solid"
                            name="phoneNumber"
                            placeholder="Enter your phone number"
                            value=""
                            autocomplete="off"
                          />
                          <!--end::Input-->
                        </div>
                        <!--end::Phone Number-->

                        <!--begin::Amount-->
                        <div class="fv-row mb-10">
                          <!--begin::Label-->
                          <label class="fs-6 fw-semibold mb-2"
                            >Amount
                            <i
                              class="fas fa-exclamation-circle ms-2 fs-7"
                              data-bs-toggle="tooltip"
                              title="Please enter the amount you want to pay"
                            ></i
                          ></label>
                          <!--End::Label-->
                          <!--begin::Input-->
                          <input
                            type="number"
                            class="form-control form-control-lg form-control-solid"
                            name="paymentAmount"
                            placeholder="Enter payment amount"
                            value=""
                            autocomplete="off"
                          />
                          <!--end::Input-->
                        </div>
                        <!--end::Amount-->

                        <!--begin::Email-->
                        <div class="fv-row mb-10">
                          <!--begin::Label-->
                          <label class="fs-6 fw-semibold mb-2"
                            >Email Address
                            <i
                              class="fas fa-exclamation-circle ms-2 fs-7"
                              data-bs-toggle="tooltip"
                              title="Please enter your email address"
                            ></i
                          ></label>
                          <!--End::Label-->
                          <!--begin::Input-->
                          <input
                            type="password"
                            class="form-control form-control-lg form-control-solid"
                            name="paymentEmail"
                            placeholder="Enter your email"
                            value=""
                            autocomplete="off"
                          />
                          <!--end::Input-->
                        </div>
                        <!--end::Email-->
                      </div>
                      <!--end::Wrapper-->
                    </div>
                    <!--end::Step 2-->

                    <!--begin::OTP Verification-->
                    <div
                      data-kt-stepper-element="content"
                      class=""
                      v-if="formStepper.step === 'otp'"
                    >
                      <DataLoader v-if="verifyingOTP"></DataLoader>
                      <!--begin::Wrapper-->
                      <div class="w-100" v-else>
                        <!--begin::Heading-->
                        <div class="pb-10 pb-lg-12">
                          <!--begin::Title-->
                          <h1 class="fw-bold text-dark">OTP Verification</h1>
                          <!--end::Title-->
                          <!--begin::Description-->
                          <div class="fw-semibold fs-6 text-danger">
                            OTP code sent to
                            {{ validatedData.debit_account_no }}

                            - please check your phone and confirm!
                          </div>
                          <!--end::Description-->
                        </div>
                        <!--end::Heading-->

                        <!--begin::otp-->
                        <div class="fv-row mb-10">
                          <!--begin::Label-->
                          <label class="fs-6 fw-semibold mb-2"
                            >OTP
                            <i
                              class="fas fa-exclamation-circle ms-2 fs-7"
                              data-bs-toggle="tooltip"
                              title="Please enter the OTP you received on your phone"
                            ></i
                          ></label>
                          <!--End::Label-->
                          <!--begin::Input-->
                          <input
                            type="text"
                            class="form-control form-control-lg form-control-solid h-60px fs-2qx text-center"
                            name="paymentOtp"
                            autocomplete="off"
                            data-inputmask="'mask': '9', 'placeholder': 'Enter OTP'"
                            maxlength="6"
                            v-model="request.otp"
                            :disabled="loading"
                            placeholder="Enter OTP"
                          />
                          <!--end::Input-->
                        </div>
                        <!--end::OTP-->

                        <div class="d-flex flex-stack pt-10">
                          <!--begin::Wrapper-->

                          <!--              data-kt-stepper-action="previous"-->
                          <div class="me-2">
                            <button
                              type="button"
                              class="btn btn-sm btn-light-primary me-3"
                            >
                              <!--begin::Svg Icon | path: icons/duotune/arrows/arr063.svg-->
                              <span class="svg-icon svg-icon-3 me-1">
                                <svg
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <rect
                                    opacity="0.5"
                                    x="6"
                                    y="11"
                                    width="13"
                                    height="2"
                                    rx="1"
                                    fill="currentColor"
                                  />
                                  <path
                                    d="M8.56569 11.4343L12.75 7.25C13.1642 6.83579 13.1642 6.16421 12.75 5.75C12.3358 5.33579 11.6642 5.33579 11.25 5.75L5.70711 11.2929C5.31658 11.6834 5.31658 12.3166 5.70711 12.7071L11.25 18.25C11.6642 18.6642 12.3358 18.6642 12.75 18.25C13.1642 17.8358 13.1642 17.1642 12.75 16.75L8.56569 12.5657C8.25327 12.2533 8.25327 11.7467 8.56569 11.4343Z"
                                    fill="currentColor"
                                  />
                                </svg>
                              </span>
                              <!--end::Svg Icon-->Back
                            </button>
                          </div>
                          <!--end::Wrapper-->
                          <!--begin::Wrapper-->
                          <div>
                            <button
                              type="button"
                              class="btn btn-sm btn-primary"
                              data-kt-stepper-action="submit"
                              @click="submitPaystackOTP()"
                              ref="submitOTPButtonRef"
                            >
                              <span class="indicator-label"
                                >Submit OTP
                                <!--begin::Svg Icon | path: icons/duotune/arrows/arr064.svg-->
                                <span class="svg-icon svg-icon-3 ms-2 me-0">
                                  <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <rect
                                      opacity="0.5"
                                      x="18"
                                      y="13"
                                      width="13"
                                      height="2"
                                      rx="1"
                                      transform="rotate(-180 18 13)"
                                      fill="currentColor"
                                    />
                                    <path
                                      d="M15.4343 12.5657L11.25 16.75C10.8358 17.1642 10.8358 17.8358 11.25 18.25C11.6642 18.6642 12.3358 18.6642 12.75 18.25L18.2929 12.7071C18.6834 12.3166 18.6834 11.6834 18.2929 11.2929L12.75 5.75C12.3358 5.33579 11.6642 5.33579 11.25 5.75C10.8358 6.16421 10.8358 6.83579 11.25 7.25L15.4343 11.4343C15.7467 11.7467 15.7467 12.2533 15.4343 12.5657Z"
                                      fill="currentColor"
                                    />
                                  </svg>
                                </span>
                                <!--end::Svg Icon--></span
                              >
                              <span class="indicator-progress"
                                >Please wait...
                                <span
                                  class="spinner-border spinner-border-sm align-middle ms-2"
                                ></span
                              ></span>
                            </button>
                            <!--                        <button-->
                            <!--                          type="button"-->
                            <!--                          class="btn btn-lg btn-primary"-->
                            <!--                          data-kt-stepper-action="next"-->
                            <!--                        >-->
                            <!--                          Continue-->
                            <!--                          &lt;!&ndash;begin::Svg Icon | path: icons/duotune/arrows/arr064.svg&ndash;&gt;-->
                            <!--                          <span class="svg-icon svg-icon-3 ms-1 me-0">-->
                            <!--                            <svg-->
                            <!--                              width="24"-->
                            <!--                              height="24"-->
                            <!--                              viewBox="0 0 24 24"-->
                            <!--                              fill="none"-->
                            <!--                              xmlns="http://www.w3.org/2000/svg"-->
                            <!--                            >-->
                            <!--                              <rect-->
                            <!--                                opacity="0.5"-->
                            <!--                                x="18"-->
                            <!--                                y="13"-->
                            <!--                                width="13"-->
                            <!--                                height="2"-->
                            <!--                                rx="1"-->
                            <!--                                transform="rotate(-180 18 13)"-->
                            <!--                                fill="currentColor"-->
                            <!--                              />-->
                            <!--                              <path-->
                            <!--                                d="M15.4343 12.5657L11.25 16.75C10.8358 17.1642 10.8358 17.8358 11.25 18.25C11.6642 18.6642 12.3358 18.6642 12.75 18.25L18.2929 12.7071C18.6834 12.3166 18.6834 11.6834 18.2929 11.2929L12.75 5.75C12.3358 5.33579 11.6642 5.33579 11.25 5.75C10.8358 6.16421 10.8358 6.83579 11.25 7.25L15.4343 11.4343C15.7467 11.7467 15.7467 12.2533 15.4343 12.5657Z"-->
                            <!--                                fill="currentColor"-->
                            <!--                              />-->
                            <!--                            </svg>-->
                            <!--                          </span>-->
                            <!--                          &lt;!&ndash;end::Svg Icon&ndash;&gt;-->
                            <!--                        </button>-->
                          </div>
                          <!--end::Wrapper-->
                        </div>
                      </div>
                      <!--end::Wrapper-->
                    </div>
                    <!--end::Step 3-->

                    <!--begin::Step 4-->
                    <div
                      data-kt-stepper-element="content"
                      class=""
                      v-if="formStepper.step === 'validated'"
                    >
                      <DataLoader v-if="initiatingPayment"></DataLoader>
                      <!--begin::Wrapper-->
                      <div class="w-100" v-else>
                        <!--begin::Heading-->

                        <div class="mb-0">
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
                                <div class="fs-1 text-gray-600">
                                  {{ formStepper.message }}
                                </div>
                              </div>
                              <!--end::Content-->
                            </div>
                            <!--end::Wrapper-->
                          </div>
                          <!--end::Alert-->

                          <br />
                          <div
                            class="fw-semibold fs-3 mt-5 text-danger"
                            v-if="
                              validatedData.status_message ===
                              'Charge attempted'
                            "
                          >
                            <!--                            You will receive an email/sms with with the summary-->
                            <!--                            of your payment!-->

                            Please complete the authorisation process by
                            inputting your PIN on your mobile device!

                            <br />
                          </div>
                          <br />
                          <div class="col-md-12 mb-2">
                            Status:
                            <span
                              v-if="validatedData.status === 1"
                              class="badge badge-primary"
                              >Created</span
                            >
                            <span
                              v-if="validatedData.status === 2"
                              class="badge badge-info"
                              >Submitted</span
                            >
                            <span
                              v-if="validatedData.status === 3"
                              class="badge badge-warning"
                              >Processing</span
                            >
                            <span
                              v-if="validatedData.status === 4"
                              class="badge badge-success"
                              >Success</span
                            >
                            <span
                              v-if="validatedData.status === 5"
                              class="badge badge-danger"
                              >Error</span
                            >
                            <span
                              v-if="validatedData.status === 6"
                              class="badge badge-danger"
                              >Cancelled</span
                            >
                          </div>
                          <div class="col-md-12 mb-2">
                            Reference:
                            <b>{{ validatedData.reference }}</b>
                          </div>
                          <div
                            v-if="validatedData.email"
                            class="col-md-12 mb-2"
                          >
                            External Reference: <b>{{ validatedData.email }}</b>
                          </div>
                          <div class="col-md-12 mb-2">
                            Send Amount:
                            <b
                              >{{ validatedData.currency }}
                              {{ validatedData.amount }}</b
                            >
                          </div>
                          <div class="col-md-12 mb-2">
                            From:
                            <b
                              >{{ validatedData.debit_account_no }}
                              {{ validatedData.debit_account_name }}</b
                            >
                          </div>
                          <div
                            v-if="validatedData.credit_account_name"
                            class="col-md-12 mb-2"
                          >
                            Recipient Name:
                            <b>{{ validatedData.credit_account_name }}</b>
                          </div>
                          <div v-if="validatedData.charge" class="col-md-12">
                            Charge: <b>{{ validatedData.charge.amount }}</b>
                          </div>
                          <div v-if="validatedData.tax" class="col-md-12">
                            Taxable Amount:
                            <b>{{ validated.taxable_amount }}</b>
                          </div>
                          <div v-if="validatedData.tax" class="col-md-12">
                            Tax: <b>{{ validatedData.tax.amount }}</b>
                          </div>

                          <hr />
                        </div>
                        <!--end::Heading-->
                        <!--begin::Actions-->
                        <!--                        <div class="d-flex flex-center pb-20">-->
                        <!--                          <button-->
                        <!--                            id="kt_modal_top_up_wallet_create_new"-->
                        <!--                            type="button"-->
                        <!--                            class="btn btn-sm btn-light me-3"-->
                        <!--                            data-kt-element="complete-start"-->
                        <!--                          >-->
                        <!--                            Home-->
                        <!--                          </button>-->
                        <!--                          <a-->
                        <!--                            href=""-->
                        <!--                            class="btn btn-sm btn-primary"-->
                        <!--                            data-bs-toggle="tooltip"-->
                        <!--                            title="Coming Soon"-->
                        <!--                            >View Invoice</a-->
                        <!--                          >-->
                        <!--                        </div>-->
                        <!--end::Actions-->
                        <!--begin::Illustration-->
                        <!--                        <div class="text-center px-4">-->
                        <!--                          <img-->
                        <!--                            src="/media/illustrations/sketchy-1/9.png"-->
                        <!--                            alt=""-->
                        <!--                            class="mww-100 mh-350px"-->
                        <!--                          />-->
                        <!--                        </div>-->
                        <!--end::Illustration-->
                      </div>
                    </div>
                    <!--end::Step 4-->

                    <!--begin::Actions-->

                    <!--end::Actions-->
                  </form>
                  <!--end::Stepper Form-->
                  <!--************************************************************************************-->
                </div>
              </div>
            </div>
          </div>
        </div>
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

import PageLoader from "@/components/PageLoader.vue";
import { useGuestPaymentStore } from "@/stores/guest/payment";
import { storeToRefs } from "pinia";
import { useGuestGeneralStore } from "@/stores/guest/general";
import { useRoute } from "vue-router";

import Message from "vue-m-message";
import DataLoader from "@/components/DataLoader.vue";

export default defineComponent({
  name: "blank-page",
  components: { DataLoader, PageLoader },
  setup() {
    const storeBody = useBodyStore();
    const storeTheme = useThemeStore();
    const themeMode = computed(() => {
      return storeTheme.mode;
    });
    const bgImage = themeMode.value !== "dark" ? "bg5.png" : "bg1-dark.jpg";

    const loadingPage = ref(true);

    //guest payment store
    const paymentStore = useGuestPaymentStore();
    const {
      loadingPaymentData,
      invoiceData,
      getPaymentInvoiceData,
      getPaymentValidationResponse,
      getPaymentInvoiceItems,
      paymentInvoiceData,
    } = storeToRefs(paymentStore);

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

    const formStepper = ref({
      step: "input",
      message: "",
      debit_institutions: [] as any,
    });

    const request = ref({
      collection_type: "" as any,
      collection_reference: "" as any,
      amount: 10,
      payee: {
        email: "michael@mboateng.com",
        account: {
          code: "VOD",
          //   number: "0257025683",
          number: "0208498438",
          //  number: "0551234987",
        },
      },
      transaction_reference: "" as any,
      otp: "",
    });

    const validated = ref({} as any);

    const confirmed = ref({} as any);

    const instantiateForm = () => {
      request.value.collection_reference = route.params.reference;
      request.value.collection_type = route.params.collectiontype;
      request.value.amount = paymentInvoiceData.value.total;
      request.value.payee.email = paymentInvoiceData.value.bill_to_email;
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

    onMounted(() => {
      loadingPage.value = true;
      console.log(route.params.reference);
      LayoutService.emptyElementClassesAndAttributes(document.body);

      storeBody.addBodyClassname("bg-body");
      storeBody.addBodyAttribute({
        qualifiedName: "style",
        value: `background-image: url("/media/auth/${bgImage}")`,
      });
      //  getInvoice(route.params.reference);
      instantiateForm();
      loadingPage.value = false;
    });

    const stepForm = (step) => {
      console.log(step);
    };
    const createAccountRef = ref<HTMLElement | null>(null);
    const nextStep = (step) => {
      if (!createAccountRef.value) {
        return;
      }

      console.log(step);

      // formStepper.value.step = "otp";

      initiatePayment();
    };

    const previousStep = (step) => {
      if (!createAccountRef.value) {
        return;
      }

      console.log(step);
    };
    const validatedData = ref({} as any);
    const initiatingPayment = ref(false);
    const initiatePayment = () => {
      if (!initiatePaymentButtonRef.value) {
        return;
      }

      loading.value = true;

      initiatingPayment.value = true;

      paymentStore
        .validatePayment(request.value)
        .then((response: any) => {
          validated.value = response.data;

          if (response.data.message === "OTP Required") {
            form.value.step = "otp";
            formStepper.value.step = "otp";
          } else if (response.data.message === "Charge attempted") {
            form.value.step = "validated";
            formStepper.value.step = "validated";
            formStepper.value.message = "Payment submitted";
          } else {
            // form.value.step = "paystackIssue";
            // formStepper.value.step = "paystackIssue";
            formStepper.value.step = "validated";
            formStepper.value.message = response.data.message;
          }

          if (response.data.transaction.original) {
            validatedData.value = response.data.transaction.original;
          }

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
          console.log(error);
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
          } else if (error.message) {
            Message({
              message: error.message,
              position: "bottom-right",
              type: "error",
              duration: 5000,
              zIndex: 99999,
            });
          }

          formStepper.value.step = "input";
        })
        .finally(
          () => ((loading.value = false), (initiatingPayment.value = false))
        );
    };
    const submitOTPButtonRef = ref<null | HTMLButtonElement>(null);
    const initiatePaymentButtonRef = ref<null | HTMLButtonElement>(null);

    const verifyingOTP = ref(false);

    const submitPaystackOTP = () => {
      if (!submitOTPButtonRef.value) {
        return;
      }
      verifyingOTP.value = true;
      console.log(11111111111);
      loading.value = true;

      let payload = {
        otp: request.value.otp,
        transaction_reference: validatedData.value.reference,
      };
      // transaction_reference:
      //     validatedData.value.transaction.original.reference,
      console.log("payload ", payload);
      paymentStore
        .submitPaystackOtp(payload)
        .then((response: any) => {
          validated.value = response.data;

          window.localStorage.setItem(
            "tempValidation",
            JSON.stringify(response.data)
          );

          window.localStorage.setItem("resp", JSON.stringify(response));
          console.log(response);

          if (response.data.message === "OTP Required") {
            form.value.step = "otp";
            formStepper.value.step = "otp";
          } else if (response.data.message === "Charge attempted") {
            form.value.step = "validated";
            formStepper.value.step = "validated";
            formStepper.value.message = "Payment submitted";
          } else {
            // form.value.step = "paystackIssue";
            // formStepper.value.step = "paystackIssue";
            formStepper.value.step = "validated";
            formStepper.value.message = response.data.message;
          }

          if (response.data.transaction.original) {
            validatedData.value = response.data.transaction.original;
          }
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
          console.log(error);
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
          } else if (error.message) {
            Message({
              message: error.message,
              position: "bottom-right",
              type: "error",
              duration: 5000,
              zIndex: 99999,
            });
          } else {
            Message({
              message: error,
              position: "bottom-right",
              type: "error",
              duration: 5000,
              zIndex: 99999,
            });
          }
        })
        .finally(() => ((loading.value = false), (verifyingOTP.value = false)));
    };
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
      invoiceData,

      //
      formStepper,
      stepForm,
      createAccountRef,
      nextStep,
      previousStep,
      initiatePayment,
      initiatingPayment,
      validatedData,
      submitOTPButtonRef,
      submitPaystackOTP,
      verifyingOTP,
      initiatePaymentButtonRef,
      getPaymentInvoiceData,
      paymentInvoiceData,
    };
  },
});
</script>
