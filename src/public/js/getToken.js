const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
function getToken() {
  const data = {
    useremail: $("#useremail").value,
    password: $("#password").value,
  };
  document.forms["form-regis"].addEventListener("submit", (event) => {
    // TODO do something here to show user that form is being submitted
    fetch(event.target.action, {
      method: "POST",
      body: new URLSearchParams(new FormData(event.target)), // event.target is the form
    })
      .then((resp) => {
        return resp.json(); // or resp.text() or whatever the server sends
      })
      .then((body) => {
        // TODO handle body
        var getToken = body.token;
        document.cookie = Cookies.set("token", `${getToken}`, {
          expires: 1,
          path: "",
        });
        window.location = "http://localhost:3000/private";
      })
      .catch((error) => {
        console.log(error);
      });
  });
}
