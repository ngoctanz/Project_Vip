var rightBtn = document.querySelector(".vector-right");
var leftBtn = document.querySelector(".vector-left");
var Slider = document.querySelector(".box_slide_bottom .slide");

rightBtn.addEventListener("click", () => {
  let firstChild = document.querySelector(
    ".box_slide_bottom .slide .item:first-child"
  );
  Slider.appendChild(firstChild);
});
leftBtn.addEventListener("click", () => {
  let lastChild = document.querySelector(
    ".box_slide_bottom .slide .item:last-child"
  );
  Slider.prepend(lastChild);
})
