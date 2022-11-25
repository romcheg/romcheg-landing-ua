// import "./index.html"
// console.log("test");
import "./style.sass";
import "./fireworks.css";
import ClipboardJS from "clipboard";

const clipboard = new ClipboardJS(".btn");
clipboard.on("success", () => {
  document.querySelector(".pyro").classList.remove("hidden");
  setTimeout(() => {
    document.querySelector(".pyro").classList.add("hidden");
  }, 5000);
});
