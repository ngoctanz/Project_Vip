const list_items = document.querySelector(".slide_show .list-item");
const items = document.querySelectorAll(".slide_show .list-item__item");
const vector_left = document.getElementById("button__vector--left");
const vector_right = document.getElementById("button__vector--right");
const dots = document.querySelectorAll(".button--dot span");

let active = 0;

let autoNext = setInterval(() => {
  autoSlide();
}, 6000);

// hàm chính
function autoSlide() {
  active++;
  const firstItem = document.querySelector(
    ".slide_show .list-item__item:first-child"
  );
  list_items.appendChild(firstItem);

  // cập nhật dots active
  updateActiveDot();

  // reset auto chuyển
  clearInterval(autoNext);
  autoNext = setInterval(() => {
    autoSlide();
  }, 6000);
}

// hàm cập nhật dots active
// duyệt qua từng dot với mỗi phần tử mang tên dot và có chỉ số là index(0,1,2..)
function updateActiveDot() {
  dots.forEach((dot, index) => {
    // sau nhấn lần đầu active=1%4=1 --> active vt 2
    if (index === active % dots.length) {
      dot.classList.add("active--dots");
    } else {
      dot.classList.remove("active--dots");
    }
  });
}

// nút phải
vector_right.addEventListener("click", () => {
  autoSlide();
});

// nút trái
vector_left.addEventListener("click", () => {
  const lastItem = document.querySelector(
    ".slide_show .list-item__item:last-child"
  );
  document.querySelector(".list-item").prepend(lastItem);

  // cập nhật lại dots active
  active--;
  if (active < 0) {
    active = dots.length - 1;
  }
  updateActiveDot();
  // reset auto chuyển
  clearInterval(autoNext);
  autoNext = setInterval(() => {
    autoSlide();
  }, 6000);
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
