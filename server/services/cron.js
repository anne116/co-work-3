import cron from "node-cron";
import { updatePage } from "../scripts/updateES.js";

cron.schedule("0 0 * * *", () => {
  const array = new Array(25).fill(null);
  array.forEach((item, index) => {
    updatePage(index + 1);
  });
});
