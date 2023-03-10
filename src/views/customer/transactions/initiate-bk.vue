<template>
  <PermissionDenied v-if="unauthorized" />
  <PageLoader v-else-if="loadingPage" />
  <!--begin::Card-->
  <div class="card" v-else>
    <div class="card-body">
      <h4 class="card-title"></h4>
      <p class="card-title-desc"></p>
      <div class="row">
        <div class="col-md-12">
          <h4 v-if="form.step === 'input'" class="text-center">
            New Transaction
          </h4>
          <h4 v-if="form.step === 'validated'" class="text-center">
            Confirm Transaction
          </h4>
          <h4 v-if="form.step === 'initiated'" class="text-center">
            Approve Transaction
          </h4>
          <h4 v-if="form.step === 'confirmed'" class="text-center">
            Transaction Submitted
          </h4>
          <hr />
        </div>
      </div>

      <div class="row" v-if="form.step === 'input'">
        <div class="col-md-12">
          <div class="mb-3">
            <select
              name="institution_id"
              @change="instantiateForm"
              class="form-select form-control"
              v-model="form.transaction_type"
              :disabled="loading"
            >
              <option value="payment">Initiate Payment from Third-Party</option>
              <option value="transfer">Transfer Money</option>
            </select>
          </div>
          <hr />
        </div>
      </div>

      <!-- Payment -->
      <div v-if="form.transaction_type === 'payment'" class="row">
        <div v-if="form.step === 'input'" class="col-md-12">
          <el-form
            @submit.prevent="validateTransaction()"
            class="form"
            :model="request"
            :rules="formValidateTransactionRules"
            ref="paymentValidationRef"
          >
            <div class="row">
              <div class="col-md-12">
                <div class="mb-3">
                  <label class="form-label">Debit Institution</label>

                  <el-form-item prop="debit_account_institution">
                    <select
                      name="institution_id"
                      class="form-select form-control"
                      v-model="request.debit_account_institution"
                      :disabled="loading"
                    >
                      <option value="">Select Debit Institution</option>
                      <option
                        v-for="institution in institutions"
                        :key="institution.id"
                        :value="institution.id"
                      >
                        {{ institution.name }}
                      </option>
                    </select>
                  </el-form-item>
                </div>
              </div>
              <div class="col-md-12">
                <div class="mb-3">
                  <label class="form-label">Debit Account Number</label>
                  <el-form-item prop="debit_account_no">
                    <input
                      v-model="request.debit_account_no"
                      type="text"
                      class="form-control"
                      placeholder="Enter Account Number to Initiate Payment From E.g. 027XXXXXXX"
                      :disabled="loading"
                  /></el-form-item>
                </div>
              </div>
            </div>
            <hr />
            <div class="row">
              <div class="col-md-12">
                <div class="mb-3">
                  <label class="form-label">Credit Account</label>

                  <el-form-item prop="credit_account_no">
                    <select
                      name="institution_id"
                      class="form-select form-control"
                      v-model="request.credit_account_no"
                      :disabled="loading"
                    >
                      <option value="">Select Credit Account</option>
                      <option
                        v-for="account in accounts"
                        :key="account.id"
                        :value="account.id"
                      >
                        {{ account.id + " - " + account.name_on_account }}
                      </option>
                    </select></el-form-item
                  >
                </div>
              </div>
            </div>
            <hr />
            <div class="row">
              <div class="col-md-12">
                <div class="mb-3">
                  <label class="form-label">Amount</label>
                  <el-form-item prop="amount">
                    <input
                      v-model="request.amount"
                      type="text"
                      class="form-control"
                      placeholder="Enter amount"
                      :disabled="loading"
                      required
                  /></el-form-item>
                </div>
              </div>
              <div class="col-md-12">
                <div class="mb-3">
                  <label class="form-label">Reference (Optional)</label>
                  <input
                    v-model="request.external_reference"
                    type="text"
                    class="form-control"
                    placeholder="Enter reference"
                    :disabled="loading"
                  />
                </div>
              </div>
              <hr />
            </div>
            <div class="row">
              <div class="col-12 mb-3 text-right">
                <button
                  class="btn btn-success w-100"
                  type="submit"
                  @click.prevent="validateTransaction()"
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
                    <line x1="12" y1="18" x2="12" y2="22"></line>
                    <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
                    <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
                    <line x1="2" y1="12" x2="6" y2="12"></line>
                    <line x1="18" y1="12" x2="22" y2="12"></line>
                    <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
                    <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
                  </svg>
                  <span v-else>Validate Payment</span>
                </button>
              </div>
            </div>
          </el-form>
        </div>
        <div
          v-if="form.step === 'validated'"
          class="col-md-12"
          style="font-size: 14px"
        >
          <div class="col-md-12 mb-3">
            <h5>General Details</h5>
            <div class="col-md-12">
              Transaction Type Code: <b>{{ validated.type_code }}</b>
            </div>
            <div class="col-md-12">
              Transaction Type Name: <b>{{ validated.type_name }}</b>
            </div>
            <div class="col-md-12">
              Debit Currency: <b>{{ validated.debit_currency }}</b>
            </div>
            <div class="col-md-12">
              Credit Currency: <b>{{ validated.credit_currency }}</b>
            </div>
            <div class="col-md-12">
              Rate: <b>{{ validated.rate }}</b>
            </div>
          </div>
          <hr />
          <div class="col-md-12 mb-3">
            <h5>Sender Details</h5>
            <div class="col-md-12">
              Institution:
              <b>{{ validated.debit_account_institution_name }}</b>
            </div>
            <div class="col-md-12">
              Account No: <b>{{ validated.debit_account_no }}</b>
            </div>
            <div class="col-md-12">
              Name on Account: <b>{{ validated.debit_account_name }}</b>
            </div>
            <div class="col-md-12">
              Account Type: <b>{{ validated.debit_account_type_name }}</b>
            </div>
          </div>
          <hr />
          <div class="col-md-12">
            <h5>Recipient Details</h5>
            <div class="col-md-12">
              Institution:
              <b>{{ validated.credit_account_institution_name }}</b>
            </div>
            <div class="col-md-12">
              Account No: <b>{{ validated.credit_account_no }}</b>
            </div>
            <div class="col-md-12">
              Name on Account: <b>{{ validated.credit_account_name }}</b>
            </div>
            <div class="col-md-12">
              Account Type: <b>{{ validated.credit_account_type_name }}</b>
            </div>
          </div>
          <hr />
          <div class="col-md-12">
            <h5>Amount</h5>
            <div class="col-md-12">
              Send Amount:
              <b>{{ validated.debit_currency }} {{ validated.debit_amount }}</b>
            </div>
            <div class="col-md-12">
              Charge: <b>{{ validated.charge_amount }}</b>
            </div>
            <div class="col-md-12 mb-2">
              Account to Charge: <b>{{ validated.charge_account }}</b>
            </div>
            <div class="col-md-12">
              Taxable Amount:
              <b>{{ validated.taxable_amount }}</b>
            </div>
            <div class="col-md-12">
              Tax: <b>{{ validated.tax_amount }}</b>
            </div>
            <div class="col-md-12">
              Account to Tax: <b>{{ validated.tax_account }}</b>
            </div>
          </div>
          <hr />
          <div class="row">
            <div class="col-12 mb-3 text-right">
              <button
                class="btn btn-warning w-100"
                type="submit"
                @click.prevent="form.step = 'input'"
                :disabled="loading"
              >
                <i class="mdi mdi-content-save"></i> Edit Details
              </button>
            </div>
            <div class="col-12 mb-3 text-right">
              <button
                class="btn btn-success w-100"
                type="submit"
                @click.prevent="confirmTransaction()"
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
                  <line x1="12" y1="18" x2="12" y2="22"></line>
                  <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
                  <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
                  <line x1="2" y1="12" x2="6" y2="12"></line>
                  <line x1="18" y1="12" x2="22" y2="12"></line>
                  <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
                  <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
                </svg>
                <span v-else> Initiate Payment</span>
              </button>
            </div>
          </div>
        </div>
        <div
          v-if="form.step === 'confirmed'"
          class="col-md-12"
          style="font-size: 14px"
        >
          <div class="col-md-12">
            Status:
            <span v-if="confirmed.status === 1" class="badge badge-primary"
              >Created</span
            >
            <span v-if="confirmed.status === 2" class="badge badge-info"
              >Submitted</span
            >
            <span v-if="confirmed.status === 3" class="badge badge-warning"
              >Processing</span
            >
            <span v-if="confirmed.status === 4" class="badge badge-success"
              >Success</span
            >
            <span v-if="confirmed.status === 5" class="badge badge-danger"
              >Error</span
            >
            <span v-if="confirmed.status === 6" class="badge badge-danger"
              >Cancelled</span
            >
          </div>
          <div class="col-md-12">
            Reference: <b>{{ confirmed.reference }}</b>
          </div>
          <div v-if="confirmed.external_reference" class="col-md-12">
            External Reference: <b>{{ confirmed.external_reference }}</b>
          </div>
          <div class="col-md-12">
            Send Amount:
            <b>{{ confirmed.currency }} {{ confirmed.amount }}</b>
          </div>
          <div class="col-md-12">
            From:
            <b
              >{{ confirmed.debit_account_no }}
              {{ confirmed.debit_account_name }}</b
            >
          </div>
          <div class="col-md-12">
            Recipient Institution:
            <b>{{ validated.credit_account_institution_name }}</b>
          </div>
          <div class="col-md-12">
            Recipient Account No: <b>{{ confirmed.credit_account_no }}</b>
          </div>
          <div v-if="confirmed.credit_account_name" class="col-md-12">
            Recipient Name: <b>{{ confirmed.credit_account_name }}</b>
          </div>
          <div v-if="confirmed.charge" class="col-md-12">
            Charge: <b>{{ confirmed.charge.amount }}</b>
          </div>
          <div v-if="confirmed.tax" class="col-md-12">
            Taxable Amount: <b>{{ validated.taxable_amount }}</b>
          </div>
          <div v-if="confirmed.tax" class="col-md-12">
            Tax: <b>{{ confirmed.tax.amount }}</b>
          </div>
          <div class="row mt-3">
            <div class="col-12 mb-3 text-right">
              <router-link to="/transactions">
                <button class="btn btn-warning w-100">
                  <i class="mdi mdi-content-save"></i> View Transactions
                </button>
              </router-link>
            </div>
            <div class="col-12 mb-3 text-right">
              <router-link to="/transactions/initiate">
                <button class="btn btn-success w-100">
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
                    <line x1="12" y1="18" x2="12" y2="22"></line>
                    <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
                    <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
                    <line x1="2" y1="12" x2="6" y2="12"></line>
                    <line x1="18" y1="12" x2="22" y2="12"></line>
                    <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
                    <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
                  </svg>
                  <span v-else> Another Transaction</span>
                </button>
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <!-- Transfer -->
      <div v-else class="row">
        <div v-if="form.step === 'input'" class="col-md-12">
          <el-form
            @submit.prevent="validateTransaction()"
            class="form"
            :model="request"
            :rules="formValidateTransactionRules"
            ref="paymentValidationRef"
          >
            <div class="row">
              <div class="col-md-12">
                <div class="mb-3">
                  <label class="form-label">Debit Account</label>
                  <el-form-item prop="debit_account_no">
                    <select
                      name="institution_id"
                      class="form-select form-control"
                      v-model="request.debit_account_no"
                      :disabled="loading"
                    >
                      <option value="">Select Debit Account</option>
                      <option
                        v-for="account in accounts"
                        :key="account.id"
                        :value="account.id"
                      >
                        {{ account.id + " - " + account.name_on_account }}
                      </option>
                    </select></el-form-item
                  >
                </div>
              </div>
            </div>
            <hr />
            <div class="row">
              <div class="col-md-12">
                <div class="mb-3">
                  <label class="form-label">Credit Institution</label>

                  <el-form-item prop="credit_account_institution">
                    <select
                      name="institution_id"
                      class="form-select form-control"
                      v-model="request.credit_account_institution"
                      :disabled="loading"
                    >
                      <option value="">Select Credit Institution</option>
                      <option
                        v-for="institution in institutions"
                        :key="institution.id"
                        :value="institution.id"
                      >
                        {{ institution.name }}
                      </option>
                    </select></el-form-item
                  >
                </div>
              </div>
              <div class="col-md-12">
                <div class="mb-3">
                  <label class="form-label">Credit Account Number</label>
                  <el-form-item prop="credit_account_no">
                    <input
                      v-model="request.credit_account_no"
                      type="text"
                      class="form-control"
                      placeholder="Enter Account Number to Transfer To E.g. 027XXXXXXX"
                      :disabled="loading"
                  /></el-form-item>
                </div>
              </div>
            </div>
            <hr />
            <div class="row">
              <div class="col-md-12">
                <div class="mb-3">
                  <label class="form-label">Amount</label>
                  <el-form-item prop="amount">
                    <input
                      v-model="request.amount"
                      type="text"
                      class="form-control"
                      placeholder="Enter amount"
                      :disabled="loading"
                  /></el-form-item>
                </div>
              </div>
              <div class="col-md-12">
                <div class="mb-3">
                  <label class="form-label">Reference (Optional)</label>
                  <input
                    v-model="request.external_reference"
                    type="text"
                    class="form-control"
                    placeholder="Enter reference"
                    :disabled="loading"
                  />
                </div>
              </div>
              <hr />
            </div>
            <div class="row">
              <div class="col-12 mb-3 text-right">
                <button
                  class="btn btn-success w-100"
                  type="submit"
                  @click.prevent="validateTransaction()"
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
                    <line x1="12" y1="18" x2="12" y2="22"></line>
                    <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
                    <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
                    <line x1="2" y1="12" x2="6" y2="12"></line>
                    <line x1="18" y1="12" x2="22" y2="12"></line>
                    <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
                    <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
                  </svg>
                  <span v-else>Validate Transfer</span>
                </button>
              </div>
            </div>
          </el-form>
        </div>
        <div
          v-if="form.step === 'validated'"
          class="col-md-12"
          style="font-size: 14px"
        >
          <div class="col-md-12 mb-3">
            <h5>General Details</h5>
            <div class="col-md-12">
              Transaction Type Code: <b>{{ validated.type_code }}</b>
            </div>
            <div class="col-md-12">
              Transaction Type Name: <b>{{ validated.type_name }}</b>
            </div>
            <div class="col-md-12">
              Debit Currency: <b>{{ validated.debit_currency }}</b>
            </div>
            <div class="col-md-12">
              Credit Currency: <b>{{ validated.credit_currency }}</b>
            </div>
            <div class="col-md-12">
              Rate: <b>{{ validated.rate }}</b>
            </div>
          </div>
          <hr />
          <div class="col-md-12 mb-3">
            <h5>Sender Details</h5>
            <div class="col-md-12">
              Institution:
              <b>{{ validated.debit_account_institution_name }}</b>
            </div>
            <div class="col-md-12">
              Account No: <b>{{ validated.debit_account_no }}</b>
            </div>
            <div class="col-md-12">
              Name on Account: <b>{{ validated.debit_account_name }}</b>
            </div>
            <div class="col-md-12">
              Account Type: <b>{{ validated.debit_account_type_name }}</b>
            </div>
          </div>
          <hr />
          <div class="col-md-12">
            <h5>Recipient Details</h5>
            <div class="col-md-12">
              Institution:
              <b>{{ validated.credit_account_institution_name }}</b>
            </div>
            <div class="col-md-12">
              Account No: <b>{{ validated.credit_account_no }}</b>
            </div>
            <div class="col-md-12">
              Name on Account: <b>{{ validated.credit_account_name }}</b>
            </div>
            <div class="col-md-12">
              Account Type: <b>{{ validated.credit_account_type_name }}</b>
            </div>
          </div>
          <hr />
          <div class="col-md-12">
            <h5>Amount</h5>
            <div class="col-md-12">
              Send Amount:
              <b>{{ validated.debit_currency }} {{ validated.debit_amount }}</b>
            </div>
            <div class="col-md-12">
              Charge: <b>{{ validated.charge_amount }}</b>
            </div>
            <div class="col-md-12 mb-2">
              Account to Charge: <b>{{ validated.charge_account }}</b>
            </div>
            <div class="col-md-12">
              Taxable Amount:
              <b>{{ validated.taxable_amount }}</b>
            </div>
            <div class="col-md-12">
              Tax: <b>{{ validated.tax_amount }}</b>
            </div>
            <div class="col-md-12">
              Account to Tax: <b>{{ validated.tax_account }}</b>
            </div>
          </div>
          <hr />
          <div class="row">
            <div class="col-12 mb-3 text-right">
              <button
                class="btn btn-warning w-100"
                type="submit"
                @click.prevent="form.step = 'input'"
                :disabled="loading"
              >
                <i class="mdi mdi-content-save"></i> Edit Details
              </button>
            </div>
            <div class="col-12 mb-3 text-right">
              <button
                class="btn btn-success w-100"
                type="submit"
                @click.prevent="confirmTransaction()"
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
                  <line x1="12" y1="18" x2="12" y2="22"></line>
                  <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
                  <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
                  <line x1="2" y1="12" x2="6" y2="12"></line>
                  <line x1="18" y1="12" x2="22" y2="12"></line>
                  <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
                  <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
                </svg>
                <span v-else> Confirm Transfer</span>
              </button>
            </div>
          </div>
        </div>
        <div
          v-if="form.step === 'confirmed'"
          class="col-md-12"
          style="font-size: 14px"
        >
          <div class="col-md-12">
            Status:
            <span v-if="confirmed.status === 1" class="badge badge-primary"
              >Created</span
            >
            <span v-if="confirmed.status === 2" class="badge badge-info"
              >Submitted</span
            >
            <span v-if="confirmed.status === 3" class="badge badge-warning"
              >Processing</span
            >
            <span v-if="confirmed.status === 4" class="badge badge-success"
              >Success</span
            >
            <span v-if="confirmed.status === 5" class="badge badge-danger"
              >Error</span
            >
            <span v-if="confirmed.status === 6" class="badge badge-danger"
              >Cancelled</span
            >
          </div>
          <div class="col-md-12">
            Reference: <b>{{ confirmed.reference }}</b>
          </div>
          <div v-if="confirmed.external_reference" class="col-md-12">
            External Reference: <b>{{ confirmed.external_reference }}</b>
          </div>
          <div class="col-md-12">
            Send Amount:
            <b>{{ confirmed.currency }} {{ confirmed.amount }}</b>
          </div>
          <div class="col-md-12">
            From:
            <b
              >{{ confirmed.debit_account_no }}
              {{ confirmed.debit_account_name }}</b
            >
          </div>
          <div class="col-md-12">
            Recipient Institution:
            <b>{{ validated.credit_account_institution_name }}</b>
          </div>
          <div class="col-md-12">
            Recipient Account No: <b>{{ confirmed.credit_account_no }}</b>
          </div>
          <div v-if="confirmed.credit_account_name" class="col-md-12">
            Recipient Name: <b>{{ confirmed.credit_account_name }}</b>
          </div>
          <div v-if="confirmed.charge" class="col-md-12">
            Charge: <b>{{ confirmed.charge.amount }}</b>
          </div>
          <div v-if="confirmed.tax" class="col-md-12">
            Taxable Amount: <b>{{ validated.taxable_amount }}</b>
          </div>
          <div v-if="confirmed.tax" class="col-md-12">
            Tax: <b>{{ confirmed.tax.amount }}</b>
          </div>
          <div class="row mt-3">
            <div class="col-12 mb-3 text-right">
              <router-link to="/transactions">
                <button class="btn btn-warning w-100">
                  <i class="mdi mdi-content-save"></i> View Transactions
                </button>
              </router-link>
            </div>
            <div class="col-12 mb-3 text-right">
              <a href="/transactions/initiate">
                <button class="btn btn-success w-100">
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
                    <line x1="12" y1="18" x2="12" y2="22"></line>
                    <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
                    <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
                    <line x1="2" y1="12" x2="6" y2="12"></line>
                    <line x1="18" y1="12" x2="22" y2="12"></line>
                    <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
                    <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
                  </svg>
                  <span v-else> Another Transaction</span>
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!--end::Card-->
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { useCustomerTransactionStore } from "@/stores/customer/transaction";
import { useCustomerAccountStore } from "@/stores/customer/account";
import { storeToRefs } from "pinia";
import type { iValidatedTransaction } from "@/models/transaction";

import Message from "vue-m-message";
import PermissionDenied from "@/components/PermissionDenied.vue";
import PageLoader from "@/components/PageLoader.vue";
import { hideModal } from "@/core/helpers/dom";
import useOutputFormat from "@/composables/useOutputFormat";

export default defineComponent({
  name: "manage-accounts",
  components: { PermissionDenied, PageLoader },
  setup() {
    //store
    const transactionStore = useCustomerTransactionStore();

    const { loadingTransactionData, institutions, unauthorized } =
      storeToRefs(transactionStore);
    const { getInstitutions } = useCustomerTransactionStore();

    const accountStore = useCustomerAccountStore();
    const { getAccounts } = useCustomerAccountStore();
    const { accounts } = storeToRefs(accountStore);

    //data variables
    const loadingPage = ref(true);
    const loading = ref(false);

    const params = ref({});

    const form = ref({
      step: "input",
      transaction_type: "payment",
      debit_institutions: [],
      credit_institutions: [],
      credit_account: "" as any,
      my_accounts: [],
      debit_account: "" as any,
    });

    const request = ref({
      debit_account_no: "",
      debit_account_institution: "" as any, // Set SP Pay as default.
      credit_account_no: "",
      credit_account_institution: "",
      amount: "",
      external_reference: "",
    });

    const validated = ref({} as iValidatedTransaction);

    const confirmed = ref({} as any);

    const instantiateForm = () => {
      if (form.value.transaction_type === "payment") {
        // set up credit account using default account
        request.value.credit_account_institution = "1"; // SP Pay
        form.value.credit_account = accounts.value.find(function (
          account: any
        ) {
          return account.is_default === 1;
        });

        if (form.value.credit_account) {
          request.value.credit_account_no = form.value.credit_account.id;
        }

        // clear debit details
        request.value.debit_account_institution = "";
        request.value.debit_account_no = "";
      } else {
        // set up debit account using default account
        request.value.debit_account_institution = 1; // SP Pay
        form.value.debit_account = accounts.value.find(
          (account: any) => account.is_default === 1
        );
        request.value.debit_account_no = form.value.debit_account.id;

        // clear debit details
        request.value.credit_account_institution = "";
        request.value.credit_account_no = "";
      }

      // populate debit institutions
      getInstitutions({ type_id: 3 }); // Not async, so will run in background :)
    };

    // const getMyAccounts = async (table_options) => {};

    const validateTransaction = () => {
      if (!paymentValidationRef.value) {
        return;
      }
      console.log(paymentValidationRef.value);

      paymentValidationRef.value.validate((valid) => {
        if (valid) {
          loading.value = true;

          transactionStore
            .validateTransaction(request.value)
            .then((response: iValidatedTransaction) => {
              validated.value = response;
              form.value.step = "validated";

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
            .finally(() => (loading.value = false));
        } else {
          return false;
        }
      });
    };

    // Confirm Transaction
    const confirmTransaction = () => {
      loading.value = true;
      console.log(request);
      transactionStore
        .submitTransaction(request.value)
        .then((response: any) => {
          confirmed.value = response.data;
          form.value.step = "confirmed";
          Message({
            message: "Transaction submitted successfully.",
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
    const paymentValidationRef = ref<null | HTMLFormElement>(null);
    const formValidateTransactionRules = ref({
      amount: [
        {
          required: true,
          message: "Amount is required",
          trigger: "change",
        },
      ],
      debit_account_no: [
        {
          required: true,
          message: "Debit account number is required",
          trigger: "change",
        },
      ],
      credit_account_no: [
        {
          required: true,
          message: "Credit account number is required",
          trigger: "change",
        },
      ],
      debit_account_institution: [
        {
          required: true,
          message: "Debit account institution number is required",
          trigger: "change",
        },
      ],
      credit_account_institution: [
        {
          required: true,
          message: "Credit account institution number is required",
          trigger: "change",
        },
      ],
    });

    onMounted(async () => {
      loadingPage.value = true;
      await getInstitutions({ type_id: 3 });
      await getAccounts({
        account: "",
        current_page: 1,
        page_size: 1000, // Get all accounts TODO :: Optimize
        search_text: "",
        sort: { column: "", direction: "" },
      });
      instantiateForm();
      loadingPage.value = false;
    });
    //output formatting
    let { formatCurrencyAmount, formatDateTime, formatTime, formatDate } =
      useOutputFormat();
    return {
      unauthorized,
      params,
      loadingPage,

      loading,
      form,
      request,
      validated,
      confirmed,
      confirmTransaction,
      validateTransaction,
      instantiateForm,

      //form
      formValidateTransactionRules,
      paymentValidationRef,
      //state
      institutions,
      accounts,
      loadingTransactionData,

      //composable
      formatCurrencyAmount,
      formatDateTime,
      formatTime,
      formatDate,
    };
  },
});
</script>
