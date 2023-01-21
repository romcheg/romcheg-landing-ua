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
  snackbar.classList.add("show")
  setTimeout(() => {
    snackbar.classList.remove("show")
  }, 2500);
});


const bankModal = document.getElementById("bankModal");
const bankOpenModalBtn = document.getElementById("openBankModal");
const bankCloseModalBtn = document.getElementById("closeBankModalBtn")

bankOpenModalBtn.onclick = function() {
  bankModal.style.display = "block";
}

bankCloseModalBtn.onclick = function() {
  bankModal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target != modal) {
    bankModal.style.display = "none";
  }
}