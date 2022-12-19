<template>
  <!--begin::Login Layout-->
  <div class="d-flex flex-column flex-root" id="kt_app_root">
    <!--begin::Authentication - Sign-in -->
    <div class="d-flex flex-column flex-column-fluid flex-lg-row">
      <!--begin::Aside-->
      <div class="d-flex flex-center w-lg-50 pt-15 pt-lg-0 px-10">
        <!--begin::Aside-->
        <div class="d-flex flex-center flex-lg-start flex-column">
          <!--begin::Logo-->
          <a href="/" class="mb-7">
            <img alt="Logo" src="/media/logos/default-dark-2.svg" />
          </a>
          <!--end::Logo-->
          <!--begin::Title-->
          <h2 class="text-white fw-normal m-0">Safe, Secure and Reliable</h2>
          <!--end::Title-->
        </div>
        <!--begin::Aside-->
      </div>
      <!--begin::Aside-->
      <!--begin::Body-->
      <div class="d-flex flex-center w-lg-50 p-10">
        <!--begin::Card-->
        <div class="card rounded-3 w-md-550px">
          <!--begin::Card body-->
          <div class="card-body p-10 p-lg-20">
            <!--begin::Form-->
            <router-view></router-view>
            <!--end::Form-->
          </div>
          <!--end::Card body-->
        </div>
        <!--end::Card-->
      </div>
      <!--end::Body-->
    </div>
    <!--end::Authentication - Sign-in-->
  </div>
  <!--end::Login Layout-->
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { useBodyStore } from "@/stores/body";

export default defineComponent({
  name: "system-layout",
  components: {},
  setup() {
    const store = useBodyStore();

    onMounted(() => {
      store.addBodyClassname("app-blank");
      store.addBodyClassname("bgi-size-cover");
      store.addBodyClassname("bgi-position-center");
      store.addBodyClassname("bgi-no-repeat");
    });
  },
});
</script>
