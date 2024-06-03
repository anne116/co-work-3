import { updatePage } from "./updateES.js";

const array = new Array(10).fill(null);
array.forEach((item, index) => {
  updatePage(index + 1);
});
