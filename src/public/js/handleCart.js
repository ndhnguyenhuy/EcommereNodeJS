const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

function handleCart() {
  handlePriceChange();
}

function handlePriceChange() {
  const paymentBtn = $(".cart-oder-payment");
  const containerItem = $(".card-info-content");
  var itemProducts = $$(".cart-list-item");
  // ham format number hang nghin thành co dau phay
  function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }
  function formatString(string) {
    return parseFloat(string.replace(",", ".").replace(" ", "")) * 1000000;
  }
  Array.from(itemProducts).forEach((item) => {
    // select các item cua san pham
    const clickLike = item.querySelector(".cart-list-icon");
    const btnClickLike = item.querySelector(".cart-list-like");
    var totalPrice = item.querySelector(".cart-total-price");
    const quantity = item.querySelector("#input-quantity");
    const price = item.querySelector(".cart-list-price").innerText;
    const nameProduct = item.querySelector(".cart-list-name").innerText;
    const deleteCart = item.querySelector(".cart-list-btn-trash");
    const itemSize = item.querySelector(".cart-list-size");
    const totalPayment = $(".cart-oder-total-title-price");
    // chuyen doi gia san pham thanh so
    const numberPrice = formatString(price);

    quantity.onchange = function () {
      totalPrice.innerText = formatNumber(
        Number(numberPrice * Number(quantity.value))
      );
    };
    btnClickLike.onclick = function () {
      btnClickLike.classList.toggle("active-btn");
      clickLike.classList.toggle("active-like");
      if (btnClickLike.classList.contains("active-btn")) {
        //tao phan tu
        var newInfo = document.createElement("div");
        var newInfoTitle = document.createElement("p");
        var newInfoPrice = document.createElement("p");
        var newSelect = document.createElement("div");
        var newSelectQuantity = document.createElement("p");
        var newSelectSize = document.createElement("p");
        var infoContent = document.createElement("div");

        // them class
        newInfo.classList.add("cart-oder-info");
        newSelect.classList.add("cart-info-select");
        newInfoTitle.classList.add("cart-oder-info-tiltle");
        newInfoPrice.classList.add("cart-oder-price");
        newSelectQuantity.classList.add("cart-oder-info-quantity");
        newSelectSize.classList.add("cart-oder-size");
        // them phan tu con
        containerItem.appendChild(infoContent);
        infoContent.appendChild(newInfo);
        infoContent.appendChild(newSelect);
        newInfo.appendChild(newInfoTitle);
        newInfo.appendChild(newInfoPrice);
        newSelect.appendChild(newSelectQuantity);
        newSelect.appendChild(newSelectSize);
        newInfoTitle.innerText = nameProduct;
        newInfoPrice.innerText = `${totalPrice.innerText} đ `;
        newSelectQuantity.innerText = `Số lượng : ${quantity.value} `;
        newSelectSize.innerText = `Size : ${itemSize.value} `;
        // dung reduce de tinh tong cac gia tri

        var allTotal = $$(".cart-oder-price");

        var arrPrice = Array.from(allTotal).map(function (price) {
          var textPrice = price.innerText.split(" ");
          return formatString(textPrice[0]);
        });
        var totalPriceValue = arrPrice.reduce(function (total, priceNumber) {
          return total + priceNumber;
        }, 0);

        totalPayment.innerText = `${formatNumber(totalPriceValue)} VND`;

        paymentBtn.onclick = function () {
          const data = {
            name: newInfoTitle.innerText,
            price: newInfoPrice.innerText,
            quantity: newSelectQuantity.innerText,
            size: newSelectSize.innerText,
          };
          fetch("http://localhost:3000/payment/order", {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(data),
          })
            .then((res) => res.json())
            .then(function (data) {
              console.log("thanh cong", data);
            })
            .catch(function (res) {
              console.log(res);
            });
        };
      } else {
        $(".card-info-content div").remove();
      }

      // xu li don dat hang
    };
    deleteCart.onclick = function () {
      const idTrash = deleteCart.getAttribute("id");

      fetch(`http://localhost:3000/cart/${idTrash}`, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer my-token",
          "My-Custom-Header": "foobar",
        },
      }).then(() => console.log("thành công"));
      location.reload();
    };
  });
}

handleCart();
