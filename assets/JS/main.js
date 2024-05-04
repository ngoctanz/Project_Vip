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

// video
var videoElement = document.querySelector("video");

// Thêm sự kiện 'mouseover' để bắt đầu phát video
videoElement.addEventListener("mouseover", function () {
  videoElement.play();
});

// ================================================js cho trang sản phẩm====================================================
// Lấy danh sách các mục và các slide
var listItems = document.querySelectorAll(
  ".slide_show--products .products_list li"
);
var slides = document.querySelectorAll(
  ".slide_show--products .container--item-list"
);
var list_slides = document.querySelector(
  ".slide_show--products .js-content-slide"
);
const length = slides.length;
current = 0;

function changeSlideItem() {
  if (current == length - 1) {
    current = 0;
    let width = slides[0].offsetWidth;
    list_slides.style.transform = `translateX(0)`;
  } else {
    current++;
    let width = slides[0].offsetWidth;
    list_slides.style.transform = `translateX(${width * -1 * current}px)`;
  }

  // đổi hiệu ứng active của danh mục
  let lastActivelist = document.querySelector(
    ".slide_show--products .products_list li.active_sp"
  );
  if (lastActivelist) {
    lastActivelist.classList.remove("active_sp");
  }
  listItems[current].classList.add("active_sp");
}

listItems.forEach((li, key) => {
  li.addEventListener("click", function () {
    current = key;
    // khi truyền biến current = 0 vào changeSlideItem thì current trong đó sẽ được +1
    //  nên slide 2 sẽ xuất hiện
    changeSlideItem((current -= 1));
  });
});

// ========================================phần sản phẩm đề xuất=====================================================
let scrollContainer = document.querySelector(".slide_show_store_item");
let nextBtn = document.getElementById("vector--right");
let prevBtn = document.getElementById("vector--left");

// tổng chiều rộng scroll
let scrollWidth = scrollContainer.scrollWidth;

// bước nhảy sang trái một khoảng ....
let Jump = scrollContainer.scrollLeft;

function scrollLoad() {
  scrollContainer.scrollLeft = Jump;
  //  reset auto
  clearInterval(autoScroll);
  autoScroll = setInterval(() => {
    nextBtn.click();
  }, 4000);
}

nextBtn.addEventListener("click", () => {
  scrollContainer.style.scrollBehavior = "smooth";
  Jump += 320;
  // so sánh với khoảng rộng mà các item đang được hiển thị
  if (Jump >= scrollWidth - scrollContainer.clientWidth) {
    Jump = 0; // đưa lại về vị trí ban đầu
  }
  scrollLoad();
});

prevBtn.addEventListener("click", () => {
  scrollContainer.style.scrollBehavior = "smooth";
  Jump -= 320;
  if (Jump < 0) {
    // trừ đi trang ban đầu, vị trí mới sẽ là từ đầu trang tiếp theo
    Jump = scrollWidth - scrollContainer.clientWidth;
  }
  scrollLoad();
});

let autoScroll = setInterval(() => {
  nextBtn.click();
}, 4000);

//========================================= phần sp banner lớn ==================================
let slideBanner = document.querySelector(".banner_box-products .list-item");
let bannerItems = document.querySelectorAll(
  ".banner_box-products .list-item__item"
);
let productsBtn = document.querySelectorAll(
  ".banner_box-products .products_list li"
);

let numberTG = 0;

function nextBannerActive() {
  numberTG += 1;
  let width = bannerItems[numberTG].offsetWidth;
  slideBanner.style.left = width * -1 * numberTG + "px";

  // đổi active
  let activeClass = document.querySelector(
    ".banner_box-products .products_list li.active_sp"
  );
  if (activeClass) {
    activeClass.classList.remove("active_sp");
  }
  productsBtn[numberTG].classList.add("active_sp");
}

productsBtn.forEach((li, key) => {
  li.addEventListener("click", () => {
    numberTG = key;
    nextBannerActive((numberTG -= 1));
  });
});
