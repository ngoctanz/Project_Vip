const list_items = document.querySelector(".slide_show .list-item");
const items = document.querySelectorAll(".slide_show.home .list-item__item");
const dots = document.querySelectorAll(".button--dot span");
const vector_left = document.getElementById("button__vector--left");
const vector_right = document.getElementById("button__vector--right");

let active = 0;
let lengthItems = items.length - 1;

// nút chuyển phải
vector_right.onclick = function () {
  if (active >= lengthItems) {
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
  let checkWidth = items[active].offsetWidth;
  list_items.style.left = -checkWidth * active + "px";

  // reset dếm sau khi bấm chuyển
  clearInterval(refreshSlider);
  refreshSlider = setInterval(() => {
    vector_right.click();
  }, 6000);

  // đổi vị trí active
  let lastActiveDot = document.querySelector(".button--dot span.active--dots");
  if (lastActiveDot) {
    lastActiveDot.classList.remove("active--dots");
  }
  dots[active].classList.add("active--dots");
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

let scrollContainers = document.querySelectorAll(".slide_show_store_item");
let nextBtns = document.querySelectorAll("#vector--right");
let prevBtns = document.querySelectorAll("#vector--left");

// dùng mảng để lặp từng phần tử trong scrollContainer với chỉ số là index
scrollContainers.forEach((scrollContainer, index) => {
  // lấy chiều rộng tổng kể cả phần k thấy
  let scrollWidth = scrollContainer.scrollWidth;
  let Jump = scrollContainer.scrollLeft;
  let nextBtn = nextBtns[index];
  let prevBtn = prevBtns[index];

  function scrollLoad() {
    scrollContainer.scrollLeft = Jump;
    clearInterval(autoScroll);
    autoScroll = setInterval(() => {
      nextBtn.click();
    }, 4000);
  }

  nextBtn.addEventListener("click", () => {
    scrollContainer.style.scrollBehavior = "smooth";
    Jump += scrollContainer.clientWidth / 4; //1/4 của phần đang được hiển thị(trên tổng độ rộng scroll)
    if (Jump >= scrollWidth - scrollContainer.clientWidth) {
      Jump = 0;
    }
    scrollLoad();
  });

  prevBtn.addEventListener("click", () => {
    scrollContainer.style.scrollBehavior = "smooth";
    Jump -= scrollContainer.clientWidth / 4;
    if (Jump < 0) {
      Jump = scrollWidth - scrollContainer.clientWidth;
    }
    scrollLoad();
  });

  let autoScroll = setInterval(() => {
    nextBtn.click();
  }, 4000);
});

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
