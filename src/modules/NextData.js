import { format } from "date-fns";

export class NextDay {
  constructor(date, icon, temp) {
    this.date = format(new Date(date), "E, MMM d");
    this.icon = icon;
    this.temp = temp;
  }
}
