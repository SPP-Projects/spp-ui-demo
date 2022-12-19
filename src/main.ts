import { createApp } from "vue";
import { createPinia } from "pinia";
import { Tooltip } from "bootstrap";
import App from "./App.vue";

import router from "./router";
import ElementPlus from "element-plus";
import i18n from "@/core/plugins/i18n";

//imports for app initialization
import ApiService from "@/core/services/ApiService";
import { initApexCharts } from "@/core/plugins/apexcharts";
import { initInlineSvg } from "@/core/plugins/inline-svg";
import { initVeeValidate } from "@/core/plugins/vee-validate";

import "@/core/plugins/prismjs";
const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(ElementPlus);

ApiService.init(app);
initApexCharts(app);
initInlineSvg(app);
initVeeValidate();

app.use(i18n);

app.directive("tooltip", (el) => {
  new Tooltip(el);
});

//TODO - TODO
//SPP - imports for app initialization
//vue message
import Message from "vue-m-message";
import "vue-m-message/dist/style.css";
app.use(Message);

//TODO - move this to a helper file
import moment from "moment";
app.mixin({
  methods: {
    formatNumber: (value) => {
      if (value) {
        return parseFloat(value).toLocaleString();
      }
    },
    formatDate: (value) => {
      return moment(String(value)).format("MM/DD/YYYY - hh:mm a");
    },

    timeAgo: function (date) {
      if (date) {
        return moment(date).fromNow();
      }
    },
  },
});

//SPP - imports for app initialization

app.mount("#app");
