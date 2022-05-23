// import file site.js
const SiteRouter = require("./site");
// import file detail.js
const DetailRouter = require("./detail");
// import file login.js
const LoginRouter = require("./login");
//import file cart.js
const CartRouter = require("./cart");
//import file register.js
const RegisterRouter = require("./register");
const accountRouter = require("./account");
const payrouter = require("./payment");

function route(app) {
  //   sử dụng các biến đã dược định nghĩa theo đường dẫn mình mong muốn , luôn đặt path / dưới cùng , khi không bắt được sự trùng lặp => khởi chạy file home

  // Sử dụng slug cho path product
  app.get("/product", SiteRouter);
  app.use("/product", DetailRouter);
  // app.post("/product", DetailRouter);
  //
  // router add cartRouter
  app.get("/cart", CartRouter);
  app.use("/cart", CartRouter);

  //
  app.get("/login", LoginRouter);
  app.use("/login", LoginRouter);
  app.get("/private", LoginRouter);

  //
  app.get("/show", accountRouter);
  // router thanh toán
  app.get("/payment", payrouter);
  app.use("/payment", payrouter);

  app.get("/register", RegisterRouter);
  app.use("/register", accountRouter);
  //

  app.use("/", SiteRouter);
}
module.exports = route;
