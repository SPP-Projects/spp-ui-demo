<template>
  <div
    class="d-flex flex-column flex-lg-row flex-column-fluid stepper stepper-pills stepper-column stepper-multistep first"
  >
    <!--begin::Aside-->
    <div class="d-flex flex-column flex-lg-row-auto w-lg-350px w-xl-500px">
      <div
        class="d-flex flex-column position-lg-fixed top-0 bottom-0 w-lg-350px w-xl-500px scroll-y bgi-size-cover bgi-position-center"
        style="background-image: url('/media/misc/auth-bg.png')"
      >
        <!--begin::Header-->
        <div class="d-flex flex-center py-10 py-lg-20 mt-lg-20">
          <!--begin::Logo-->
          <router-link to="/">
            <img alt="Logo" src="/media/logos/custom-1.png" class="h-150px" />
          </router-link>
          <!--end::Logo-->
        </div>
        <!--end::Header-->
        <!--begin::Body-->
        <div class="d-flex flex-row-fluid justify-content-center p-10">
          <!--begin::Nav-->

          <!--end::Nav-->
        </div>
        <!--end::Body-->
        <!--begin::Footer-->
        <div class="d-flex flex-center flex-wrap px-5 py-10">
          <!--begin::Links-->
          <div class="d-flex fw-normal">
            <a
              href="https://sppaygh.com"
              class="text-success px-5"
              target="_blank"
              >Terms</a
            >
            <a
              href="https://sppaygh.com"
              class="text-success px-5"
              target="_blank"
              >Privacy</a
            >
            <a
              href="https://1.envato.market/EA4JP"
              class="text-success px-5"
              target="_blank"
              >Contact Us</a
            >
          </div>
          <!--end::Links-->
        </div>
        <!--end::Footer-->
      </div>
    </div>
    <!--begin::Aside-->

    <!--begin::Body-->
    <div class="d-flex flex-column flex-lg-row-fluid py-1">
      <!--begin::Content-->
      <div class="d-flex flex-column flex-column-fluid">
        <!--begin::Wrapper-->
        <div class="w-lg-700px p-10 p-lg-15 mx-auto">
          <router-view></router-view>
        </div>
      </div>

      <!--end::Content-->
    </div>
    <!--end::Body-->
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import LayoutService from "@/core/services/LayoutService";
import { useBodyStore } from "@/stores/body";

export default defineComponent({
  name: "auth-layout",
  components: {},
  setup() {
    const store = useBodyStore();

    onMounted(() => {
      LayoutService.emptyElementClassesAndAttributes(document.body);

      store.addBodyClassname("app-blank");
      store.addBodyClassname("bg-body");
    });
  },
});
</script>
