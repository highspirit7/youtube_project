import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

const extendedDayjs = dayjs.extend(relativeTime);
export default extendedDayjs;
