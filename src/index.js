// import "./index.html"
// console.log("test");
import "./style.sass";
import "./fireworks.css";
import "./snackbar.css";
import "./index.html";
import "./index_en.html";
import "./index_pl.html";
import ClipboardJS from "clipboard";

const clipboard = new ClipboardJS(".btn-copy");
clipboard.on("success", () => {
  const snackbar = document.getElementById("snackbar");
  const pyro = document.querySelector(".pyro")
  pyro.classList.remove("hidden");
  snackbar.classList.add("show")
  setTimeout(() => {
    snackbar.classList.remove("show")
    pyro.classList.add("hidden");
  }, 5000);
});
