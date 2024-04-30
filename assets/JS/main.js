// const list_items = document.querySelector(".slide_show .list-item");
// const items = document.querySelectorAll(".list-item__item");
// const dots = document.querySelectorAll(".button--dot span");
// const vector_left = document.getElementById("button__vector--left");
// const vector_right = document.getElementById("button__vector--right");
// // khai báo biến active = 0
// let active = 0;
// // đếm thứ tự của item đánh số từ 0
// let lengthItems = items.length - 1;

// // nút chuyển phải
// vector_right.onclick = function () {
//   if (active + 1 > lengthItems) {
//     active = 0;
//   } else {
//     active = active + 1;
//   }
//   reloadSlide();
// };

// // nút chuyển trái
// vector_left.onclick = function () {
//   if (active - 1 < 0) {
//     active = lengthItems;
//   } else {
//     active = active - 1;
//   }
//   reloadSlide();
// };
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
// }

// // active cho dots
// dots.forEach((span, key) => {
//   span.addEventListener("click", function () {
//     active = key;
//     reloadSlide();
//   });
// });

const list_items = document.querySelector(".slide_show .list-item");
const items = document.querySelectorAll(".list-item__item");
const dots = document.querySelectorAll(".button--dot span");
const vector_left = document.getElementById("button__vector--left");
const vector_right = document.getElementById("button__vector--right");

let active = 0;
let lengthItems = items.length - 1;

vector_right.onclick = function () {
  if (active + 1 > lengthItems) {
    active = 0;
  } else {
    active = active + 1;
  }
  reloadSlide();
};

vector_left.onclick = function () {
  if (active - 1 < 0) {
    active = lengthItems;
  } else {
    active = active - 1;
  }
  reloadSlide();
};

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

const videos = document.querySelectorAll(".list-item__item video");

videos.forEach((video) => {
  video.addEventListener("click", function () {
    video.play();
  });

  video.addEventListener("mouseover", function () {
    video.play();
  });

  video.addEventListener("ended", function () {
    vector_right.click();
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
