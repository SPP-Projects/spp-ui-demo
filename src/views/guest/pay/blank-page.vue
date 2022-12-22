<template>
  <!--begin::Wrapper-->
  <div class="d-flex flex-column flex-center flex-column-fluid">
    <!--begin::Content-->
    <div class="d-flex flex-column flex-center p-10">
      <!--begin::Wrapper-->
      <div class="card card-flush w-lg-650px py-5">
        <div class="card-body py-10 py-lg-10">
          <div>
            <!--begin::Logo-->
            <div class="mb-10 text-center">
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
            <!--begin::Title-->
            <h1 class="fw-bolder text-gray-900 mb-5 text-center">
              Create An Account
            </h1>
            <!--end::Title-->
          </div>
          <div class="w-lg-600px">
            <PageLoader v-if="loadingPage"></PageLoader>
            <div v-else class="col-md-12 mx-auto mt-5">
              <h5>Welcome</h5>
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

export default defineComponent({
  name: "blank-page",
  components: { PageLoader },
  setup() {
    const storeBody = useBodyStore();
    const storeTheme = useThemeStore();
    const themeMode = computed(() => {
      return storeTheme.mode;
    });
    const bgImage = themeMode.value !== "dark" ? "bg5.png" : "bg1-dark.jpg";

    const loadingPage = ref(true);

    onMounted(() => {
      loadingPage.value = true;

      LayoutService.emptyElementClassesAndAttributes(document.body);

      storeBody.addBodyClassname("bg-body");
      storeBody.addBodyAttribute({
        qualifiedName: "style",
        value: `background-image: url("/media/auth/${bgImage}")`,
      });

      loadingPage.value = false;
    });
    return {
      getIllustrationsPath,
      bgImage,
      loadingPage,
    };
  },
});
</script>
