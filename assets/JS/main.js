const list_items = document.querySelector(".slide_show .list-item");
const items = document.querySelectorAll(".slide_show .list-item__item");
const vector_left = document.getElementById("button__vector--left");
const vector_right = document.getElementById("button__vector--right");
const dots = document.querySelectorAll(".button--dot span");
const listNav = document.querySelectorAll(".nav ul li a");
const logoNav = document.querySelector(".nav .nav__content .logo_home_nav");
const nameBrandNav = document.querySelectorAll(
  ".nav .nav__content .name_brand_home"
);
const btnNav = document.querySelector(".btn.btn-header");
const textInBtn = document.querySelector(".header__right .text_in_btn ");
const textOutBtn = document.querySelector(".header__right .text_out_btn");

let active = 0;

let autoNext = setInterval(() => {
  nextSlide();
}, 7000);

// hàm chính
function autoSlide() {
  active++;
  const firstItem = document.querySelector(
    ".slide_show .list-item__item:first-child"
  );
  list_items.appendChild(firstItem);
  updateActiveDot();
  resetAutoSlide();
}

function updateActiveDot() {
  dots.forEach((dot, index) => {
    // sau nhấn lần đầu active=1%4=1 --> active vt 2
    if (index === active % dots.length) {
      dot.classList.add("active--dots");
    } else {
      dot.classList.remove("active--dots");
    }
    updateActiveNav();
  });
}
function updateActiveNav() {
  listNav.forEach((nav, index) => {
    if (active === 0 || active === 2) {
      textOutBtn.classList.add("active--nav");
      textInBtn.classList.add("active--nav");
      btnNav.classList.add("active--nav");
      logoNav.classList.add("active--nav");
      nameBrandNav.forEach((nav) => {
        nav.classList.add("active--nav");
      });
      listNav.forEach((nav) => {
        nav.classList.add("active--nav");
      });
    } else {
      textOutBtn.classList.remove("active--nav");
      textInBtn.classList.remove("active--nav");
      btnNav.classList.remove("active--nav");
      logoNav.classList.remove("active--nav");
      nameBrandNav.forEach((nav) => {
        nav.classList.remove("active--nav");
      });
      listNav.forEach((nav) => {
        nav.classList.remove("active--nav");
      });
    }
  });
}
function resetAutoSlide() {
  clearInterval(autoNext);
  autoNext = setInterval(() => {
    nextSlide();
  }, 7000);
}
function nextSlide() {
  if (active === dots.length - 1) {
    // active { 0 -> 3}
    active = -1;
  }
  autoSlide();
}
function prevSlide() {
  const lastItem = document.querySelector(
    ".slide_show .list-item__item:last-child"
  );
  document.querySelector(".list-item").prepend(lastItem);

  // cập nhật lại dots active
  if (active <= 0) {
    active = dots.length - 1;
  } else {
    active--;
  }
  updateActiveDot();
  resetAutoSlide();
}

// nút phải
vector_right.addEventListener("click", () => {
  nextSlide();
});

// nút trái
vector_left.addEventListener("click", () => {
  prevSlide();
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

function changeSlide() {
  slides.forEach((slide) => {
    slide.classList.remove("show");
  });
  slides[current].classList.add("show");
}
// đổi hiệu ứng active của danh mục
function changeActiveList() {
  listItems.forEach((li) => {
    li.classList.remove("active_sp");
  });
  listItems[current].classList.add("active_sp");
}
listItems.forEach((li, index) => {
  li.addEventListener("click", () => {
    current = index;
    changeActiveList();
    changeSlide();
  });
});

// ========================================phần sản phẩm đề xuất=====================================================
let nextBtns = document.getElementById("vector--right");
let prevBtns = document.getElementById("vector--left");
let boxFullItems = document.querySelector(".item_slide");

nextBtns.addEventListener("click", () => {
  let firstItem = document.querySelector(
    ".item_slide .box_store--item:first-child"
  );
  boxFullItems.appendChild(firstItem);
});
prevBtns.addEventListener("click", () => {
  let lastItem = document.querySelector(
    ".item_slide .box_store--item:last-child"
  );
  boxFullItems.prepend(lastItem);
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
  changeActiveBanner();
}
// đổi active
function changeActiveBanner() {
  productsBtn.forEach((li) => {
    li.classList.remove("active_sp");
  });
  productsBtn[numberTG].classList.add("active_sp");
}
productsBtn.forEach((li, key) => {
  li.addEventListener("click", () => {
    numberTG = key - 1;
    nextBannerActive();
  });
});

// phần delay animation cho cả trang==========================
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
      entry.target.classList.add("show");
    }
  });
});

// Bắt đầu quan sát phần tử
observer.observe(ipImage);
observer.observe(ipContent);
observer.observe(ipWidget);

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
      imagesIP.forEach((image) => {
        image.classList.remove("active_ip");
      });
    });
    imagesIP[index].classList.add("active_ip");
    listItemIPmini[index].classList.add("active_ip");
  });
});

// phần giới thiệu tính năng =============================
const btnScroll = document.querySelector(".slide_last_ip .btn-bottom_more");
const bannerScroll = document.querySelector(".action_gallery");

btnScroll.addEventListener("click", () => {
  window.scrollBy({ top: 730, behavior: "smooth" });
  bannerScroll.classList.add("scroll_down");
  btnScroll.classList.add("hide");
});

// =======================================================================
// phần list sản phẩm ip

const boxipProductsList = document.querySelectorAll(
  ".store_card-products .box_card_item"
);
const nextProductButtons = document.querySelectorAll(
  ".btn_apple.right-product img"
);
const prevProductButtons = document.querySelectorAll(
  ".btn_apple.left-product img"
);

boxipProductsList.forEach((boxipProducts, index) => {
  let listProductsIP = boxipProducts.querySelectorAll(
    ".apple_card .item_apple"
  );
  let TGindex = 0;

  function updateScroll() {
    const checkLeft = listProductsIP[TGindex].offsetLeft;
    boxipProducts.style.scrollBehavior = "smooth";
    boxipProducts.scrollLeft = checkLeft - 50;
  }

  function updateButtons() {
    if (TGindex === 0) {
      prevProductButtons[index].parentElement.classList.remove("visible");
    } else {
      prevProductButtons[index].parentElement.classList.add("visible");
    }

    if (TGindex >= listProductsIP.length - 3) {
      nextProductButtons[index].parentElement.classList.remove("visible");
    } else {
      nextProductButtons[index].parentElement.classList.add("visible");
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

  nextProductButtons[index].addEventListener("click", () => {
    nextProductIP();
  });

  prevProductButtons[index].addEventListener("click", () => {
    prevProductIP();
  });
});

// video trang chủ

function checkViewport() {
  var width = window.innerWidth;
  var videoSource = document.getElementById("videoSource");

  if (width <= 768) {
    videoSource.src = "./assets/image/Test/video2.mp4";
  } else {
    videoSource.src = "assets/image/Home/xiaomi.mp4";
  }

  videoSource.parentElement.load();
}
checkViewport();

window.addEventListener("resize", checkViewport);
