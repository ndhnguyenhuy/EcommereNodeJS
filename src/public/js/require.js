Validator({
  form: "#form-regis",
  errSelector: ".form-message",
  formGroupSelector: ".auth-form__group",
  rules: [
    Validator.isRequired("#useremail", "Vui lòng nhập email"),
    Validator.isEmail("#useremail", "Vui lòng nhập email hợp lệ"),
    Validator.isRequired("#password", "Vui lòng nhập mật khẩu của bạn "),
    Validator.minLength("#password", 8),
  ],
  onSubmit: function (data) {
    console.log("data");
  },
});
