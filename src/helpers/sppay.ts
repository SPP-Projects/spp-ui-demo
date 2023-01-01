import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";
import moment from "moment";
import dayjs from "dayjs";

const sppay = () => {
  const route = useRoute();

  const orderReference = ref(route.meta.reference);

  onMounted(() => {
    if (route.meta && route.meta.orderType) {
      orderReference.value = route.meta.reference;
    } else {
      orderReference.value = "online-orders";
    }
  });

  const statusColors = {
    enabled: "success",
    disabled: "error",
  };

  const disabledDate = (current) => {
    return current && current > moment().endOf("day");
  };

  const formatDateTime = (date) => {
    if (date == undefined) {
      return dayjs().format(`MMMM D, YYYY h:mm A`);
    } else {
      return dayjs(date).format(`MMMM D, YYYY h:mm A`);
    }
  };

  const formatAmount = (amount) => {
    return parseFloat(parseFloat(amount).toFixed(2));
  };

  const convertToPositive = (amount) => {
    return amount < 0 ? amount * -1 : amount;
  };

  return {
    statusColors,
    //  user,
    disabledDate,
    formatAmount,
    convertToPositive,
    orderReference,
    formatDateTime,
    //  authorisedUser,
  };
};

export default sppay;
