<template>
  <PermissionDenied v-if="refData.unauthorized" />
  <PageLoader v-else-if="refData.loadingPage" />
  <!--begin::Card-->
  <div class="card" v-else>
    <!--begin::Card header-->
    <div class="card-header border-0 pt-6">
      <!--begin::Card title-->
      <div class="card-title">
        <!--begin::Search-->
        <div class="d-flex align-items-center position-relative my-1">
          <h1>KYC</h1>
        </div>
        <!--end::Search-->
      </div>
      <!--begin::Card title-->

      <!--begin::Card toolbar-->
      <div class="card-toolbar">
        <!--begin::Group actions-->
        <div class="d-flex justify-content-end align-items-center">
          <div class="fw-bold me-5">
            <span class="me-2"> </span>
          </div>
        </div>
        <!--end::Group actions-->
      </div>
      <!--end::Card toolbar-->
    </div>
    <!--end::Card header-->

    <!--begin::Card body-->
    <div class="card-body pt-0">
      <el-tabs
        tab-position="left"
        class="kyc-tabs"
        @tab-click="handleClick"
        model-value="Identity & Profile"
      >
        <el-tab-pane
          v-for="(group, key) in refData.kyc"
          :title="key"
          :key="key"
          :label="key"
          :name="key"
        >
          <h4 class="mb-4">{{ key }}</h4>

          <hr />

          <el-form @submit="processKYCUpdate()">
            <div
              v-for="requirement in group"
              :key="requirement.id"
              :id="'requirement-group-' + requirement.id"
              :label="requirement.name"
              :label-for="'requirement-' + requirement.id"
              class="mt-2"
            >
              <h6>{{ requirement.name }}</h6>

              <el-select
                v-if="requirement.form_type === 'select'"
                class="m-2"
                v-model="refData.request[requirement.form_name]"
              >
                <el-option
                  v-for="item in requirement.options"
                  :key="item.value"
                  :label="item.text"
                  :value="item.value"
                />
              </el-select>

              <input
                v-else-if="requirement.form_type === 'file'"
                type="file"
                placeholder="Choose a file or drop it here..."
                drop-placeholder="Drop file here..."
                class="mb-4 form-control-file"
                :ref="requirement.form_name"
                :id="requirement.form_name"
                @change="handleFileUpload($event)"
              />
              <el-input
                v-else
                :id="'requirement-' + requirement.id"
                v-model="refData.request[requirement.form_name]"
              />

              <a
                v-if="
                  requirement.form_type === 'file' &&
                  requirement.detail !== null &&
                  requirement.detail.file !== null
                "
                target="_blank"
                :href="
                  'https://sppay.dev/uploads/files/kyc_detail_files/' +
                  requirement.detail.file.file_name
                "
              >
                <small
                  style="color: black"
                  :id="requirement.form_name + '_help'"
                  class="form-text text-muted mt-0"
                  >Current File:
                  {{ requirement.detail.file.original_name }}</small
                >
              </a>
            </div>
            <div class="row">
              <div class="col-md-12 text-right mt-3">
                <button
                  v-if="!refData.loadingForm"
                  class="btn-primary btn"
                  @click="processKYCUpdate"
                  :disabled="refData.loadingForm"
                >
                  Update Details
                </button>
                <button
                  v-else
                  class="btn btn-primary"
                  :disabled="refData.loadingForm"
                >
                  Processing ...
                </button>
              </div>
            </div>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!--end::Card body-->
  </div>
  <!--end::Card-->
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";

import type { TabsPaneContext } from "element-plus";
import Message from "vue-m-message";
import PermissionDenied from "@/components/PermissionDenied.vue";
import PageLoader from "@/components/PageLoader.vue";
import { useCustomerTransactionStore } from "@/stores/customer/transaction";
import { useCustomerAccountStore } from "@/stores/customer/account";
import { storeToRefs } from "pinia";
import { useCustomerKycStore } from "@/stores/customer/kyc";

export default defineComponent({
  name: "manage-kyc",
  components: { PermissionDenied, PageLoader },
  setup() {
    //store
    const kycStore = useCustomerKycStore();
    const { kycRequirements, loadingData } = storeToRefs(kycStore);
    const { getKycRequirements } = useCustomerKycStore();

    //data variables
    const refData = ref({
      unauthorized: false,
      noDataMessage: ["No Data"],

      //loading
      loadingPage: true,
      loadingData: false,
      loadingAction: false,
      loadingForm: false,

      active_tab: 0,
      kyc: {} as any,
      request: {},
    });

    const getKycDetails = async (): Promise<void> => {
      refData.value.loadingData = true;

      kycStore
        .getKycDetails()

        .then((response) => {
          refData.value.kyc = response;

          initiateSection(0);

          refData.value.loadingPage = false;
        })
        .catch((error) => {
          if (error.response.status === 403) {
            // unauthorized.
            refData.value.unauthorized = true;
          }
        })
        .finally(() => {
          refData.value.loadingPage = false;
          refData.value.loadingData = false;
        });
    };

    onMounted(() => {
      refData.value.loadingPage = true;
      getKycDetails();
    });

    const activeName = ref("first");
    const handleClick = (tab: TabsPaneContext) => {
      console.log(tab);
      initiateSection(Number(tab.index));
    };

    const setUpActiveTab = (newTabIndex) => {
      initiateSection(newTabIndex);
    };

    const initiateSection = (index) => {
      //  Empty request
      refData.value.request = {};

      // get values for that index.
      refData.value.kyc[Object.keys(refData.value.kyc)[index]].forEach(
        (requirement) => {
          if (requirement.form_type === "file") {
            refData.value.request[requirement.form_name] = null;
          } else {
            refData.value.request[requirement.form_name] = requirement.detail
              ? requirement.detail.value
              : null;
          }
        }
      );
    };

    const handleFileUpload = (event) => {
      refData.value.request[event.target.id] = event.target.files[0];
    };
    const processKYCUpdate = () => {
      refData.value.loadingForm = true;

      // prepare payload
      let kycFormData = new FormData();

      for (let key in refData.value.request) {
        if (refData.value.request[key] != null) {
          kycFormData.append(key, refData.value.request[key]);
        }
      }

      kycStore
        .updateKYC(kycFormData)
        .then(() => {
          Message({
            message: "Details updated successfully.",
            position: "bottom-right",
            type: "success",
            duration: 5000,
            zIndex: 99999,
          });
        })
        .catch((error) => {
          // get errors from state
          let response = error.response.data;

          if (response.errors) {
            let errors = response.errors;
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
        .finally(() => {
          // update loading status
          refData.value.loadingForm = false;
        });
    };
    return {
      refData,
      handleClick,
      activeName,
      setUpActiveTab,
      getKycDetails,
      processKYCUpdate,
      handleFileUpload,
    };
  },
});
</script>
<style>
.kyc-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-weight: 600;
}
.el-tabs--right .el-tabs__content,
.el-tabs--left .el-tabs__content {
  height: 100%;
}
</style>
