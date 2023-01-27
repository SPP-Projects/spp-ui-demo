import dayjs from "dayjs";
import moment from "moment";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

moment.suppressDeprecationWarnings = true;
dayjs.extend(utc);
dayjs.extend(timezone);

export default function useOutputFormat() {
  const timeZone = "Africa/Accra";
  const timeFormat = "h:mm A";
  const dateFormat = "D MMM YYYY";
  const dateTimeFormat = "MMM D, YYYY h:mm A";

  const formatCurrencyAmount = (amount) => {
    return parseFloat(amount)
      .toFixed(1)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const formatDate = (date) => {
    if (date == undefined) {
      return dayjs().tz(timeZone).format(dateFormat);
    } else {
      return dayjs(date).tz(timeZone).format(dateFormat);
    }
  };

  const formatTime = (date) => {
    if (date == undefined) {
      return dayjs().tz(timeZone).format(timeFormat);
    } else {
      return dayjs(date).tz(timeZone).format(timeFormat);
    }
  };

  const formatDateTime = (dateTime) => {
    if (dateTime == undefined) {
      return dayjs().tz(timeZone).format(dateTimeFormat);
    } else {
      return dayjs(dateTime).tz(timeZone).format(dateTimeFormat);
    }
  };

  return {
    formatCurrencyAmount,
    formatDateTime,
    formatDate,
    formatTime,
  };
}
