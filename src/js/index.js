const pathname = window.location.pathname;
const showBtn = document.getElementById("hideShow");
const inputs = document.querySelectorAll(".input-content");

const users = JSON.parse(localStorage.getItem("users"));

console.log(users, ">>>>");

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

if (pathname !== "/src/home/home.html") {
  showBtn.addEventListener("click", () => {
    handlePasswordViewAndHide();
  });
}

const generateToken = () => {
  const upperCaseChars = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
  ];
  const specialChars = ["&", "^", "%", "@", "*", "_"];
  let lowerCaseChars = [];
  // generating lowercase letters
  for (let char of upperCaseChars) {
    lowerCaseChars = [...lowerCaseChars, char.toLowerCase()];
  }

  // concatating arrays
  const chars = [...upperCaseChars, ...lowerCaseChars, ...specialChars].join(
    ""
  );

  // generating the token
  let token = "";

  for (let index = 0; index <= chars.length - 1; index++) {
    let tokenIndex = Math.round(Math.random() * 100);
    if (tokenIndex >= chars.length) {
      tokenIndex = Math.ceil(Math.random() * 10) + 10;
    }

    token += chars[tokenIndex];
  }

  return token.slice(0, 20);
};

if (pathname !== "/src/home/home.html") {
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
      // checking for the password incase the user exists
      if (exists.password !== person.password) {
        alert("Incorrectt password, please try again.");

        return;
      }

      const token = generateToken();
      window.location.href = "/src/home/home.html";
      localStorage.setItem(
        "loggedInUser",
        JSON.stringify({ username: exists.username, token })
      );
      return {
        token,
      };
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
        window.location.href = "/src/index.html";
      } else {
        console.log("An unexpected error has occured");
      }
    }
  });
}

if (pathname === "/src/home/home.html") {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  document.getElementById("user").innerHTML = loggedInUser.username;

  document.getElementById("logoutbtn").addEventListener("click", () => {
    localStorage.removeItem("loggedInUser");
    window.location.href = "/src/index.html";
  });
}
