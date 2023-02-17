<template>
  <div class="py-5 w-100">
    <!--begin::Information-->
    <div class="d-flex align-items-center rounded py-5 px-5 bg-light-success">
      <!--begin::Icon-->
      <!--begin::Svg Icon | path: icons/duotune/general/gen044.svg-->
      <span class="svg-icon svg-icon-3x svg-icon-success me-5"
        ><svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            opacity="0.3"
            x="2"
            y="2"
            width="20"
            height="20"
            rx="10"
            fill="currentColor"
          ></rect>
          <rect
            x="11"
            y="14"
            width="7"
            height="2"
            rx="1"
            transform="rotate(-90 11 14)"
            fill="currentColor"
          ></rect>
          <rect
            x="11"
            y="17"
            width="2"
            height="2"
            rx="1"
            transform="rotate(-90 11 17)"
            fill="currentColor"
          ></rect>
        </svg>
      </span>
      <!--end::Svg Icon-->
      <!--end::Icon-->
      <!--begin::Description-->
      <div class="text-gray-700 fw-bold fs-6">{{ message }}</div>
      <!--end::Description-->
    </div>
    <!--end::Information-->
  </div>
</template>

<script lang="ts">
export default {
  name: "payment-success",
  props: {
    message: String,
  },
};
</script>

<style scoped></style>
