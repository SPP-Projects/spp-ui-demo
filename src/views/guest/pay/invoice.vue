<template>
  <!--begin::Layout-->
  <PageLoader v-if="refData.loadingPage" />
  <div class="d-flex flex-column flex-xl-row" v-else>
    <!--begin::Content-->
    <div class="flex-lg-row-fluid ms-lg-15">
      <div class="card pt-4">
        <!--begin::Card body-->
        <div class="card-body pt-0 pb-5">
          <div v-if="!invoiceData">No Data</div>
          <div class="flex-lg-row-fluid mb-10 mb-xl-0" v-else>
            <!--begin::Invoice 2 content-->
            <div class="mt-n1">
              <!--begin::Top-->
              <div class="d-flex flex-stack pb-10">
                <!--                TODO-->
                <!--begin::Logo-->
                <!--                <a href="#">-->
                <!--                  <img alt="Logo" src="/media/svg/brand-logos/code-lab.svg" />-->
                <!--                </a>-->
                <!--end::Logo-->
                <!--begin::Action-->

                <router-link
                  :to="`/pay/payment/${invoiceData.reference}/invoice`"
                >
                  <button class="btn btn-sm btn-success">
                    Pay for Invoice
                  </button>
                </router-link>

                <!--end::Action-->
              </div>
              <!--end::Top-->
              <!--begin::Wrapper-->
              <div class="m-0">
                <!--begin::Label-->
                <div class="fw-bold fs-3 text-gray-800 mb-8">
                  Invoice #{{ invoiceData.reference }} <br />
                  Customer Reference:
                  {{ invoiceData.user_reference }}
                </div>
                <!--end::Label-->
                <!--begin::Row-->
                <div class="row g-5 mb-11">
                  <!--end::Col-->
                  <div class="col-sm-6">
                    <!--end::Label-->
                    <div class="fw-semibold fs-7 text-gray-600 mb-1">
                      Issue Date:
                    </div>
                    <!--end::Label-->
                    <!--end::Col-->
                    <div class="fw-bold fs-6 text-gray-800">
                      {{ invoiceData.created_at }}
                    </div>
                    <!--end::Col-->
                  </div>
                  <!--end::Col-->
                  <!--end::Col-->
                  <div class="col-sm-6">
                    <!--end::Label-->
                    <div class="fw-semibold fs-7 text-gray-600 mb-1">
                      Due Date:
                    </div>
                    <!--end::Label-->
                    <!--end::Info-->
                    <div
                      class="fw-bold fs-6 text-gray-800 d-flex align-items-center flex-wrap"
                    >
                      <span class="pe-2"> {{ invoiceData.due_date }}</span>
                    </div>
                    <!--end::Info-->
                  </div>
                  <!--end::Col-->
                </div>
                <!--end::Row-->
                <!--begin::Row-->
                <div class="row g-5 mb-12">
                  <!--end::Col-->
                  <div class="col-sm-6">
                    <!--end::Label-->
                    <div class="fw-semibold fs-7 text-gray-600 mb-1">
                      Issue For:
                    </div>
                    <!--end::Label-->
                    <!--end::Text-->
                    <div class="fw-bold fs-6 text-gray-800">
                      {{ invoiceData.bill_to_name }}
                    </div>
                    <!--end::Text-->
                    <!--end::Description-->
                    <div class="fw-semibold fs-7 text-gray-600">
                      {{ invoiceData.bill_to_email }} <br />{{
                        invoiceData.bill_to_address
                      }}
                    </div>
                    <!--end::Description-->
                  </div>
                  <!--end::Col-->
                  <!--end::Col-->
                  <div class="col-sm-6">
                    <!--end::Label-->
                    <div class="fw-semibold fs-7 text-gray-600 mb-1">
                      Issued By:
                    </div>
                    <!--end::Label-->
                    <!--end::Text-->
                    <div class="fw-bold fs-6 text-gray-800">This Customer</div>
                    <!--end::Text-->
                    <!--end::Description-->
                    <div class="fw-semibold fs-7 text-gray-600">
                      this email <br />
                      this address
                    </div>
                    <!--end::Description-->
                  </div>
                  <!--end::Col-->
                </div>
                <!--end::Row-->
                <!--begin::Content-->
                <div class="flex-grow-1">
                  <!--begin::Table-->
                  <div class="table-responsive border-bottom mb-9">
                    <table class="table mb-3">
                      <thead>
                        <tr class="border-bottom fs-6 fw-bold text-muted">
                          <th class="min-w-175px pb-2">Description</th>
                          <th class="min-w-70px text-end pb-2">Qty</th>
                          <th class="min-w-80px text-end pb-2">Rate</th>
                          <th class="min-w-100px text-end pb-2">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          class="fw-bold text-gray-700 fs-5 text-end"
                          v-for="(item, index) in invoiceItems"
                          :key="index"
                        >
                          <td class="d-flex align-items-center pt-6">
                            <i
                              class="fa fa-genderless text-danger fs-2 me-2"
                            ></i
                            >{{ item.description }}
                          </td>
                          <td class="pt-6">{{ item.quantity }}</td>
                          <td class="pt-6">{{ item.rate }}</td>
                          <td class="pt-6 text-dark fw-bolder">
                            {{ item.amount }}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <!--end::Table-->
                  <!--begin::Container-->
                  <div class="d-flex justify-content-end">
                    <!--begin::Section-->
                    <div class="mw-300px">
                      <!--begin::Item-->
                      <div class="d-flex flex-stack mb-3">
                        <!--begin::Accountname-->
                        <div class="fw-semibold pe-10 text-gray-600 fs-7">
                          Subtotal:
                        </div>
                        <!--end::Accountname-->
                        <!--begin::Label-->
                        <div class="text-end fw-bold fs-6 text-gray-800">
                          {{ invoiceData.sub_total }}
                        </div>
                        <!--end::Label-->
                      </div>
                      <!--end::Item-->
                      <!--begin::Item-->
                      <div class="d-flex flex-stack mb-3">
                        <!--begin::Accountname-->
                        <div class="fw-semibold pe-10 text-gray-600 fs-7">
                          Discount
                        </div>
                        <!--end::Accountname-->
                        <!--begin::Label-->
                        <div class="text-end fw-bold fs-6 text-gray-800">
                          {{ invoiceData.discount }}
                        </div>
                        <!--end::Label-->
                      </div>
                      <!--end::Item-->
                      <!--begin::Item-->
                      <div class="d-flex flex-stack mb-3">
                        <!--begin::Accountnumber-->
                        <div class="fw-semibold pe-10 text-gray-600 fs-7">
                          Tax
                        </div>
                        <!--end::Accountnumber-->
                        <!--begin::Number-->
                        <div class="text-end fw-bold fs-6 text-gray-800">
                          {{ invoiceData.tax }}
                        </div>
                        <!--end::Number-->
                      </div>
                      <div class="d-flex flex-stack mb-3">
                        <!--begin::Accountnumber-->
                        <div class="fw-semibold pe-10 text-gray-600 fs-7">
                          Shipping
                        </div>
                        <!--end::Accountnumber-->
                        <!--begin::Number-->
                        <div class="text-end fw-bold fs-6 text-gray-800">
                          {{ invoiceData.shipping }}
                        </div>
                        <!--end::Number-->
                      </div>
                      <!--end::Item-->
                      <!--begin::Item-->
                      <div class="d-flex flex-stack">
                        <!--begin::Code-->
                        <div class="fw-semibold pe-10 text-gray-600 fs-7">
                          Total
                        </div>
                        <!--end::Code-->
                        <!--begin::Label-->
                        <div class="text-end fw-bold fs-6 text-gray-800">
                          {{ invoiceData.total }}
                        </div>
                        <!--end::Label-->
                      </div>
                      <!--end::Item-->
                    </div>
                    <!--end::Section-->
                  </div>
                  <!--end::Container-->
                </div>
                <!--end::Content-->
              </div>
              <!--end::Wrapper-->
            </div>
            <!--end::Invoice 2 content-->
          </div>
        </div>
        <!--end::Card body-->
      </div>
    </div>
    <!--end::Content-->
  </div>

  <!--end::Layout-->
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import { useGuestPaymentStore } from "@/stores/guest/payment";
import { useRoute } from "vue-router";
import PageLoader from "@/components/PageLoader.vue";

export default defineComponent({
  name: "pay-invoice-details",
  components: { PageLoader },
  setup() {
    //guest payment store
    const paymentStore = useGuestPaymentStore();
    const { invoiceData, invoiceItems, loadingPaymentData } =
      storeToRefs(paymentStore);
    const { getInvoice } = useGuestPaymentStore();

    //data variables
    const refData = ref({
      unauthorized: false,
      noDataMessage: ["No Data"],

      //loading
      loadingPage: true,
      loadingData: false,
      loadingAction: false,
    });

    //invoice items
    const invoiceReference = ref("" as any);

    const route = useRoute();
    onMounted(async () => {
      refData.value.loadingPage = true;
      await getInvoice(route.params.reference);
      refData.value.loadingPage = false;
    });

    const formUpdateInvoiceRef = ref<null | HTMLFormElement>(null);

    const UpdateInvoiceModalRef = ref<null | HTMLElement>(null);

    return {
      refData,

      invoiceReference,
      formUpdateInvoiceRef,
      UpdateInvoiceModalRef,

      //state
      loadingPaymentData,
      invoiceData,
      invoiceItems,
    };
  },
});
</script>
