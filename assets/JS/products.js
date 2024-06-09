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
});

// phần chọn sản phẩm
var product = document.querySelectorAll(".box_img_ontop img");
var itemChoose = document.querySelectorAll(".color-box .color-item");

itemChoose.forEach((item, index) => {
  // active màu
  item.addEventListener("click", () => {
    itemChoose.forEach((item) => {
      item.classList.remove("active");
    });
    itemChoose[index].classList.add("active");
  });

  // active sản phẩm
  item.addEventListener("click", () => {
    product.forEach((item) => {
      item.classList.remove("active");
    });
    product[index].classList.add("active");
  });
});
