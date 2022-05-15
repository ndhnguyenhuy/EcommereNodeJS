async function callAPI() {
  var select = document.querySelector(".form-select");
  var district = document.getElementById("district");
  var ward = document.getElementById("ward");

  let apiURL = `https://vapi.vnappmob.com//api/province/`;
  let data = await fetch(apiURL).then((res) => res.json());
  var result = data.results;
  select.onfocus = function () {
    var htmls = result.map(function (province) {
      return `
            <option value="${province.province_id}">${province.province_name}</option>
          </select>
        `;
    });
    select.innerHTML = htmls.join("");
  };

  select.onchange = async function (e) {
    var provinceValue = e.target.value;
    console.log(provinceValue);

    let districtUrl = `https://vapi.vnappmob.com//api/province/district/${provinceValue}`;
    let newData = await fetch(districtUrl).then((res) => res.json());
    var result = newData.results;
    district.onfocus = function () {
      var optionDistrict = result.map(function (district) {
        return `

              <option value="${district.district_id}">${district.district_name}</option>
            </select>

          `;
      });
      district.innerHTML = optionDistrict.join("");
    };
  };
  district.onchange = async function (e) {
    var districtValue = e.target.value;
    console.log(districtValue);
    let wardUrl = `https://vapi.vnappmob.com//api/province/ward/${districtValue}`;
    let wardData = await fetch(wardUrl).then((res) => res.json());
    var result = wardData.results;
    ward.onfocus = function () {
      var optionWard = result.map(function (ward) {
        return `

              <option value="${ward.ward_id}">${ward.ward_name}</option>
            </select>

          `;
      });
      ward.innerHTML = optionWard.join("");
    };
  };
}
callAPI();
