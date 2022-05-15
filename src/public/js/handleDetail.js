const imgProduct = document.querySelector(".detail-img").src;
const nameProduct = document.querySelector(".product-heading").innerText;
const priceProduct = document.querySelector(".product-price").innerText;
const addCart = document.querySelector(".btn-add");
const btnlike = document.querySelector(".like-product");
const iconLike = document.querySelector(".icon-like");
const notification = document.querySelector(".notification");
const idProduct = document.querySelector(".product-img");
const setProduct = idProduct.getAttribute("id");

var key1 = localStorage.getItem("carts");
var obj = JSON.parse(key1);

const cartProduct = {
  name: nameProduct,
  img: imgProduct,
  price: priceProduct,
  quantity: 1,
};

addCart.onclick = function () {
  const data = {};
  fetch(`http://localhost:3000/product/${setProduct}`, {
    method: "POST", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  notification.style.display = "flex";
  setTimeout(() => {
    notification.style.display = "none";
  }, 1000);
};
btnlike.onclick = function () {
  iconLike.classList.toggle("active-like");
};
