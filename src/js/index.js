const pathname = window.location.pathname;
const showBtn = document.getElementById("hideShow");
const inputs = document.querySelectorAll(".input-content");

const users = JSON.parse(localStorage.getItem("users"));

console.log(users, "::::", pathname, "PPPP");

const handlePasswordViewAndHide = () => {
  const text = showBtn.innerHTML;
  switch (text) {
    case "show":
      showBtn.innerHTML = "hide";
      inputs[inputs.length - length - 1].type = "text";
      break;

    default:
      inputs[inputs.length - length - 1].type = "password";
      showBtn.innerHTML = "show";
      break;
  }
};

showBtn.addEventListener("click", () => {
  handlePasswordViewAndHide();
});

document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();
  const inputs = document.querySelectorAll("input");
  let person = {};
  person = Object.assign(person, {
    username: inputs[0].value,
    password: inputs[1].value,
  });
  const exists = users?.find((user) => user.username === person.username);
  if (pathname === "/src/index.html") {
    if (!exists) {
      alert("This account is not recognized");
      return;
    }
  } else {
    if (exists) {
      alert(`${exists.username} already exists`);
      return;
    }
    users.push(person);
    localStorage.setItem("users", JSON.stringify(users));
    if (person.username !== "") {
      alert(`${person.username} is successfully registered`);
      person = {};
      for (let input of inputs) {
        input.value = "";
      }
    } else {
      console.log("An unexpected error has occured");
    }
  }
});
