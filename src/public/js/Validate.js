//  Mong muốn Output

//  Định nghĩa rules
//  Nguyên tắc của các rules ;
//  1.Khi có lỗi trả về mes lỗi
// 2. Đúng thì không trả gì
//  hàm thực hiện validate
function Validator(options) {
  function getParent(element, selector) {
    while (element.parentElement) {
      if (element.parentElement.matches(selector)) {
        return element.parentElement;
      }
      element = element.parentElement;
    }
  }
  // Object chứa các rule
  var selectorRule = {};

  // hàm thực hiện valid
  function validate(inputElement, rule) {
    var parentE = getParent(inputElement, options.formGroupSelector);
    var errElement = parentE.querySelector(options.errSelector);

    var errMessage;
    // lấy ra các rule của selector
    var rules = selectorRule[rule.selector];

    // lặp qua từng rule và kiểm ra
    //  nếu có lỗi thì dừng việc kiểm tra

    for (var i = 0; i < rules.length; ++i) {
      switch (inputElement.type) {
        case "radio":
        case "checkbox":
          errMessage = rules[i](
            formElement.querySelector(rule.selector + ":checked")
          );

          break;
        default:
          errMessage = rules[i](inputElement.value);
      }

      if (errMessage) break;
    }

    if (errMessage) {
      parentE.classList.add("invalid");
      errElement.innerHTML = errMessage;
    } else {
      parentE.classList.remove("invalid");
      errElement.innerHTML = "";
    }
    return !errMessage;
  }

  // lấy form element
  var formElement = document.querySelector(options.form);
  //
  if (formElement) {
    formElement.onsubmit = function (e) {
      e.preventDefault();
      var isFormValid = false;
      options.rules.forEach(function (rule) {
        var inputElement = document.querySelector(rule.selector);
        var isValid = validate(inputElement, rule);
        if (!isValid) {
          isFormValid = true;
        }
      });

      if (isFormValid) {
        if (typeof options.onSubmit === "function") {
          var enabledInput = formElement.querySelectorAll(
            "[name]:not([disabled])"
          );
          var formValues = Array.from(enabledInput).reduce(function (
            values,
            input
          ) {
            switch (input.type) {
              case "radio":
                values[input.name] = formElement.querySelector(
                  'input[name="' + input.name + '"]:checked'
                ).value;
                break;
              case "checkbox":
                if (!input.matches(":checked")) {
                  values[input.name] = "";
                  return values;
                }
                if (!Array.isArray(values[input.name])) {
                  values[input.name] = [];
                }
                break;
              case "file":
                values[input.name] = input.files;
              default:
                values[input.name] = input.value;
            }
            return values;
          },
          {});
          // options.onSubmit(isFormValid);
          console.log("ivalid");
        }
        // trường hợp k submit bằng JS
      } else if (typeof options.onSubmit === "function") {
        const submitBtn = document.querySelector(".submit-btn");
        submitBtn.onclick = function () {
          formElement.submit();
        };
      }
    };

    //   // thực  hiện lặp qua từng rule và valid

    // xử lí lặp qua mỗi rule và lắng nghe sự kiện

    options.rules.forEach(function (rule) {
      // Lưu lại các rule cho mỗi inputElement

      if (Array.isArray(selectorRule[rule.selector])) {
        selectorRule[rule.selector].push(rule.test);
      } else {
        selectorRule[rule.selector] = [rule.test];
      }
      var inputElements = formElement.querySelectorAll(rule.selector);
      // chuyển đổi qua mảng
      Array.from(inputElements).forEach(function (inputElement) {
        var parentE = getParent(inputElement, options.formGroupSelector);
        if (inputElement) {
          // xử lí blur ra khỏi input
          inputElement.onblur = function () {
            validate(inputElement, rule);
          };
          // xử lí mỗi khi người dùng nhập
          inputElement.oninput = function () {
            var errElement = parentE.querySelector(".form-message");
            parentE.classList.remove("invalid");
            errElement.innerHTML = "";
          };
        }
      });
    });
  }
}

//
// Nguyên tắc của các rule
// có lỗi => trả ra mess lỗi
// Hợp lệ ==> undefined
Validator.isRequired = function (selector, message) {
  return {
    selector: selector,
    test: function (value) {
      return value ? undefined : message || "vui lòng nhập trường này";
    },
  };
};

//
Validator.isEmail = function (selector, message) {
  return {
    selector: selector,
    test: function (value) {
      var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      return regex.test(value)
        ? undefined
        : message || "Trường này phải là email";
    },
  };
};

//  Xử lí form nhập mật khẩu
Validator.minLength = function (selector, min, message) {
  return {
    selector: selector,
    test: function (value) {
      return value.length >= min
        ? undefined
        : message || `Vui lòng nhập tối thiểu ${min} kí tự`;
    },
  };
};

// rules nhap lai mat khau
Validator.isConfirmed = function (selector, getConfirmValue, message) {
  return {
    selector: selector,
    test: function (value) {
      return value === getConfirmValue()
        ? undefined
        : message || "Giá trị nhập vào không chính xác";
    },
  };
};
