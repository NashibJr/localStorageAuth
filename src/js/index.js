const pathname = window.location.pathname;
const showBtn = document.getElementById("hideShow");
const inputs = document.querySelectorAll(".input-content");

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

if (pathname === "/src/signup/signup.html") {
  showBtn.addEventListener("click", () => {
    handlePasswordViewAndHide();
  });
}
