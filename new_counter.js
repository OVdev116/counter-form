const submitForm = document.querySelectorAll(".form_block");
const lsKey = "timerEnd";
const savedTime = parseInt(window.localStorage.getItem(lsKey));
const counter = 30;
let contextBtn=[];
let btnsArray=document.querySelectorAll(".form_block .btn");
function pushText(array){
array.forEach(item=>contextBtn.push({btn:item,content:item.querySelector('span').textContent}))}
pushText(btnsArray)
if (savedTime) {
  let D = new Date();
  D.setTime(savedTime);
  timerStart(D);
}
submitForm.forEach((item) => {
  item.addEventListener("submit", function () {
    if (!item.querySelector(".btn").classList.contains("disabled")) {
      localStorage.setItem("btn", true);     
    }
    if (localStorage.getItem("btn")) {
      let D = new Date();
      D.setTime(D.getTime() + 1000 * counter);
      timerStart(D);
    }
  });
});
function timerStart(finishDate) {
  let LS = window.localStorage;
  LS.setItem(lsKey, finishDate.getTime());
  let timerId = setInterval(() => {
    let seconds = Math.round((finishDate - new Date()) / 1000);
    if (seconds <= 0) {
      LS.removeItem(lsKey);
      LS.removeItem("btn");
      clearInterval(timerId);
    }
    seconds <= 0
      ? btnContent(contextBtn,  false)
      : btnContent(contextBtn, `Отправлено (${seconds})`, true);
  }, 1000);
}

let btnContent = function (array, content='undefined', classAttrAdd) {
  array.forEach((item) => {
     if (classAttrAdd) {
      item.btn.querySelector('span').textContent=content;
      item.btn.classList.add("shipped");
      item.btn.setAttribute("disabled", true);
    } else {
      item.btn.querySelector('span').textContent=item.content;
      item.btn.classList.remove("shipped");
      item.btn.removeAttribute("disabled", true);
    }
  });
};

