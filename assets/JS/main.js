const list_items = document.querySelector(".slide_show .list-item");
const items = document.querySelectorAll(".slide_show .list-item__item");
const vector_left = document.getElementById("button__vector--left");
const vector_right = document.getElementById("button__vector--right");
const dots = document.querySelectorAll(".button--dot span");

let active = 0;

let autoNext = setInterval(() => {
  autoSlide();
}, 7000);

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
  }, 7000);
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
let itemStore = document.querySelectorAll(
  ".slide_show_store_item .box_store--item"
);

// dùng mảng để lặp từng phần tử trong scrollContainer với chỉ số là index
scrollContainers.forEach((scrollContainer, index) => {
  // lấy chiều rộng tổng kể cả phần k thấy
  let scrollWidth = scrollContainer.scrollWidth;
  let nextBtn = nextBtns[index];
  let prevBtn = prevBtns[index];

  var Jump = 0;

  function scrollLoad() {
    scrollContainer.scrollLeft = Jump;
  }

  nextBtn.addEventListener("click", () => {
    scrollContainer.style.scrollBehavior = "smooth";
    let checkWidth = itemStore[0].offsetWidth;
    Jump += checkWidth + 20;
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
});

//========================================= phần sp banner lớn ==================================
let slideBanner = document.querySelector(".banner_box-products  .list-item");
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

// phần delay animation cho cả trang==========================
// const logoElement = document.querySelector("#phone_logo");
const element = document.querySelector(
  ".list-item__item--content.mobile_phone"
);

const ipWidget = document.querySelector(
  ".content_left-gallery .content_left-gallery--top .p-content"
);
const ipContent = document.querySelector(".content_left-gallery");
const ipImage = document.querySelector(".box-full--gallery");

// hàm chính
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    // Kiểm tra nếu phần tử đang trong viewport
    if (entry.isIntersecting) {
      // Thêm class để kích hoạt animation
      entry.target.classList.add("show");
    }
  });
});

// Bắt đầu quan sát phần tử

observer.observe(ipImage);
observer.observe(ipContent);
observer.observe(ipWidget);
observer.observe(element);

// -------------------phần sản phẩm iphone-------------------

const bgColor = document.querySelectorAll(".background_color .background_item");
let smIP = 0;

function autoSlideNext() {
  smIP++;
  const firstItem = document.querySelector(
    ".list_ip .list_ip__item:first-child"
  );
  document.querySelector(".list_ip").appendChild(firstItem);
  updateBG();
}

function updateBG() {
  bgColor.forEach((bg, index) => {
    if (smIP < 0) {
      smIP = bgColor.length - 1;
    } else {
      // sau nhấn lần đầu active=1%4=1 --> active vt 2
      if (index === smIP % bgColor.length) {
        bg.classList.add("active");
      } else {
        bg.classList.remove("active");
      }
    }
  });
}

function autoSlideBack() {
  smIP--;
  const lastItem = document.querySelector(".list_ip .list_ip__item:last-child");
  document.querySelector(".list_ip").prepend(lastItem);
  updateBG();
}

// phần màu sắc
const colorList = document.querySelectorAll(
  ".slide_last_ip .list_color_select .item_color"
);
const boxColor = document.querySelector(".slide_last_ip .list_color_select");

var tgColor = 0;

function colorActiveNext() {}

// phần nút bấm chuyển
const leftVector = document.getElementById("left-btn");
const rightVector = document.getElementById("right-btn");

rightVector.addEventListener("click", () => {
  const firstColor = document.querySelector(
    ".slide_last_ip .list_color_select .item_color:first-child"
  );
  document.querySelector(".list_color_select").appendChild(firstColor);
  autoSlideNext();
});
leftVector.addEventListener("click", () => {
  const lastColor = document.querySelector(
    ".slide_last_ip .list_color_select .item_color:last-child"
  );
  document.querySelector(".list_color_select").prepend(lastColor);
  autoSlideBack();
});

// phần giới thiệu tính năng ip15

const listItemIPmini = document.querySelectorAll(
  ".content_left-gallery--bottom li .box_li"
);
const imagesIP = document.querySelectorAll(".img_content img");

listItemIPmini.forEach((item, index) => {
  item.addEventListener("click", () => {
    listItemIPmini.forEach((item) => {
      item.classList.remove("active_ip");
      // Xóa lớp active khỏi tất cả các ảnh
      imagesIP.forEach((image) => {
        image.classList.remove("active_ip");
      });
    });

    // Thêm lớp active cho ảnh tương ứng với phần tử li được nhấp vào
    imagesIP[index].classList.add("active_ip");
    listItemIPmini[index].classList.add("active_ip");
  });
});

// cuộn lên che đi phần tử dùng cho nhiều phần tử từ sau banner giới thiệu =============================
const btnScroll = document.querySelector(".slide_last_ip .btn-bottom_more");
const bannerScroll = document.querySelector(".action_gallery");
const listPrScroll = document.querySelectorAll(".store_card-products");

btnScroll.addEventListener("click", () => {
  window.scrollBy({ top: 730, behavior: "smooth" });
  bannerScroll.classList.add("scroll_down");
  listPrScroll.forEach((item) => {
    item.classList.add("scroll_down");
  });
});

// =======================================================================
// phần list sản phẩm ip
let boxipProducts = document.querySelector(
  ".store_card-products .box_card_item"
);
let listProductsIP = document.querySelectorAll(
  ".store_card-products .apple_card .item_apple"
);
const nextProduct = document.querySelector(".btn_apple.right-product img");
const prevProduct = document.querySelector(".btn_apple.left-product img");

let TGindex = 0;

function updateScroll() {
  var checkLeft = listProductsIP[TGindex].offsetLeft;
  boxipProducts.style.scrollBehavior = "smooth";
  boxipProducts.scrollLeft = checkLeft - 50;
}

function updateButtons() {
  if (TGindex === 0) {
    prevProduct.parentElement.classList.remove("visible");
  } else {
    prevProduct.parentElement.classList.add("visible");
  }

  // mỗi lần chuyển sang item 2 bên dư, tổng thiếu 3 lần
  if (TGindex === listProductsIP.length - 3) {
    nextProduct.parentElement.classList.remove("visible");
  } else {
    nextProduct.parentElement.classList.add("visible");
  }
}

function nextProductIP() {
  if (TGindex < listProductsIP.length - 1) {
    TGindex++;
    updateScroll();
    updateButtons();
  }
}

function prevProductIP() {
  if (TGindex > 0) {
    TGindex--;
    updateScroll();
    updateButtons();
  }
}

nextProduct.addEventListener("click", () => {
  nextProductIP();
});

prevProduct.addEventListener("click", () => {
  prevProductIP();
});

// Cập nhật nút hiển thị ban đầu
updateButtons();
// phần drag
const carousel = document.querySelector(".store_card-products .box_card_item");

let dragStart = false,
  prevPageX,
  prevScrollLeft;

const dragStartEvent = (e) => {
  dragStart = true;
  prevPageX = e.pageX;
  prevScrollLeft = carousel.scrollLeft;
};

const draggingEvent = (e) => {
  if (!dragStart) return;
  e.preventDefault();
  let positionDiff = e.pageX - prevPageX;
  carousel.scrollLeft = prevScrollLeft - positionDiff;
};

const dragEndEvent = () => {
  dragStart = false;
};

carousel.addEventListener("mousemove", draggingEvent);
carousel.addEventListener("mousedown", dragStartEvent);
carousel.addEventListener("mouseup", dragEndEvent);
