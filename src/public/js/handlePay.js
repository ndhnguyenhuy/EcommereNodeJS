function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}
function formatString(string) {
  return parseFloat(string.replace(",", ".").replace(" ", "")) * 1000000;
}
const payBtn = document.querySelector(".cart-oder-payment");
const $$ = document.querySelectorAll.bind(document);
const $ = document.querySelector.bind(document);
var totalPayment = document.querySelector(".cart-oder-total-title-price");
var allTotal = $$(".cart-oder-price");

var arrPrice = Array.from(allTotal).map(function (price) {
  var textPrice = price.innerText.split(" ");
  return formatString(textPrice[0]);
});
var totalPriceValue = arrPrice.reduce(function (total, priceNumber) {
  return total + priceNumber;
}, 0);

totalPayment.innerText = `${formatNumber(totalPriceValue)} VND`;
const inputE = $$("input");
console.log(inputE);
