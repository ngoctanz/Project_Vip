// // khai báo biến active = 0
// let active = 0;
// // đếm thứ tự của item đánh số từ 0
// let lengthItems = items.length - 1;

// // sau 6s tự active nút chuyển phải
// let refreshSlider = setInterval(() => {
//   vector_right.click();
// }, 8000);

// // hàm chính
// function reloadSlide() {
//   // kiểm tra độ rộng của item
//   let checkLeft = items[active].offsetLeft;
//   //   dời item một khoảng bằng độ rộng để chuyển sang item sau
//   list_items.style.left = -checkLeft + "px";

//   //   lấy dots có class active
//   let lastActiveDot = document.querySelector(".button--dot span.active--dots");
//   //   xóa class active
//   lastActiveDot.classList.remove("active--dots");
//   //   thêm active vào dots hiện tại
//   dots[active].classList.add("active--dots");
//   //   reset quá trình đếm khi chuyển trang tự động
//   clearInterval(refreshSlider);
//   refreshSlider = setInterval(() => {
//     vector_right.click();
//   }, 8000);

const list_items = document.querySelector(".slide_show .list-item");
const items = document.querySelectorAll(".list-item__item");
const dots = document.querySelectorAll(".button--dot span");
const vector_left = document.getElementById("button__vector--left");
const vector_right = document.getElementById("button__vector--right");

let active = 0;
let lengthItems = items.length - 1;

// nút chuyển phải
vector_right.onclick = function () {
  if (active + 1 > lengthItems) {
    active = 0;
  } else {
    active = active + 1;
  }
  reloadSlide();
};

// nút chuyển trái
vector_left.onclick = function () {
  if (active - 1 < 0) {
    active = lengthItems;
  } else {
    active = active - 1;
  }
  reloadSlide();
};

// chuyển phải sau 6s
let refreshSlider = setInterval(() => {
  vector_right.click();
}, 6000);

function reloadSlide() {
  let checkLeft = items[active].offsetLeft;
  list_items.style.left = -checkLeft + "px";

  let lastActiveDot = document.querySelector(".button--dot span.active--dots");
  if (lastActiveDot) {
    lastActiveDot.classList.remove("active--dots");
  }
  dots[active].classList.add("active--dots");

  // reset dếm sau khi bấm chuyển
  clearInterval(refreshSlider);
  refreshSlider = setInterval(() => {
    vector_right.click();
  }, 6000);
}

dots.forEach((span, key) => {
  span.addEventListener("click", function () {
    active = key;
    reloadSlide();
  });
});

document.addEventListener("visibilitychange", function () {
  if (document.hidden) {
    // Nếu tab không hoạt động, dừng việc tự động chuyển slide
    clearInterval(refreshSlider);
  } else {
    // Nếu tab hoạt động, bắt đầu lại việc tự động chuyển slide
    clearInterval(refreshSlider);
    refreshSlider = setInterval(() => {
      vector_right.click();
    }, 6000);
  }
});

// Lấy danh sách các mục và các slide
var listItems = document.querySelectorAll(".products_list li");
var slides = document.querySelectorAll(
  ".slide_show--products .container--item-list"
);

// Thêm click cho mỗi mục
listItems.forEach(function (listItem, index) {
  listItem.addEventListener("click", function () {
    // Xóa class 'active' khỏi tất cả các slide
    slides.forEach(function (slide) {
      slide.classList.remove("active");
    });

    // Thêm class 'active' cho slide tương ứng
    slides[index].classList.add("active");
  });
});
