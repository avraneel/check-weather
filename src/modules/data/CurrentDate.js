import { format } from "date-fns";

export function currentDate(datetime) {
  return format(new Date(datetime), "d MMMM, hh:mm b");
}
