window.addEventListener("load", function () {
  document.querySelector(".preloader").classList.add("opacity-0");
  this.setTimeout(function () {
    document.querySelector(".preloader").style.display = "none";
  }, 1000);
});

//portfolio Item Filter

const filterContainer = document.querySelector(".portfolio-filter"),
  filterBtns = filterContainer.children,
  totalFilterBtn = filterBtns.length,
  portfolioItems = document.querySelectorAll(".portfolio-item"),
  totalProtfolioItem = portfolioItems.length;

for (let i = 0; i < totalFilterBtn; i++) {
  filterBtns[i].addEventListener("click", function () {
    filterContainer.querySelector(".active").classList.remove("active");
    this.classList.add("active");

    const filterValue = this.getAttribute("data-filter");

    for (let k = 0; k < totalProtfolioItem; k++) {
      if (filterValue === portfolioItems[k].getAttribute("data-category")) {
        portfolioItems[k].classList.add("shows");
        portfolioItems[k].classList.remove("hides");
      } else {
        portfolioItems[k].classList.add("hides");
        portfolioItems[k].classList.remove("shows");
      }
      if (filterValue === "all") {
        portfolioItems[k].classList.add("shows");
        portfolioItems[k].classList.remove("hides");
      }
    }
  });
}

// portfolio lightbox

const lightbox = document.querySelector(".lightbox"),
  lightboxImg = lightbox.querySelector(".lightbox-img"),
  lightboxClose = lightbox.querySelector(".lightbox-close"),
  lightboxHeadText = lightbox.querySelector(".caption-head-text"),
  lightboxText = lightbox.querySelector(".caption-text"),
  lightboxCounter = lightbox.querySelector(".caption-counter");
let itemIndex = 0;

for (let i = 0; i < totalProtfolioItem; i++) {
  portfolioItems[i].addEventListener("click", function () {
    itemIndex = i;
    changeItem();
    toggleLightbox();
  });
}

function toggleLightbox() {
  lightbox.classList.toggle("open");
}

function changeItem() {
  imgSrc = portfolioItems[itemIndex]
    .querySelector(".portfolio-img img")
    .getAttribute("src");
  lightboxImg.src = imgSrc;
  lightboxHeadText.innerHTML = portfolioItems[itemIndex].querySelector(
    "h4"
  ).innerHTML;
  lightboxText.innerHTML = portfolioItems[itemIndex].querySelector(
    "p"
  ).innerHTML;
  lightboxCounter.innerHTML = itemIndex + 1 + " of " + totalProtfolioItem;
}

function nextItem() {
  if (itemIndex == totalProtfolioItem - 1) {
    itemIndex = 0;
  } else {
    itemIndex++;
  }
  changeItem();
}

function prevItem() {
  if (itemIndex == 0) {
    itemIndex = totalProtfolioItem - 1;
  } else {
    itemIndex--;
  }
  changeItem();
}

lightbox.addEventListener("click", function (e) {
  if (e.target === lightboxClose || e.target === lightbox) {
    toggleLightbox();
  }
});

// Aside Navbar

const nav = document.querySelector(".nav"),
  navList = nav.querySelectorAll("li"),
  totalNavList = navList.length,
  allSection = document.querySelectorAll(".section"),
  totalSection = allSection.length;

for (let i = 0; i < totalNavList; i++) {
  const a = navList[i].querySelector("a");
  a.addEventListener("click", function () {
    removeBackSectionClass();
    for (let j = 0; j < totalNavList; j++) {
      if (navList[j].querySelector("a").classList.contains("active")) {
        addBackSectionClass(j);
      }
      //   navList[j].querySelector("a").classList.remove("active");
    }
    // this.classList.add("active");
    updateNav(this);
    showSection(this);
    if (window.innerWidth < 1200) {
      asideSectionTogglerBtn();
    }
  });
}

function showSection(ele) {
  for (let i = 0; i < totalSection; i++) {
    allSection[i].classList.remove("active");
  }
  const target = ele.getAttribute("href").split("#")[1];
  document.querySelector("#" + target).classList.add("active");
}

function removeBackSectionClass() {
  for (let i = 0; i < totalSection; i++) {
    allSection[i].classList.remove("back-section");
  }
}

function addBackSectionClass(num) {
  allSection[num].classList.add("back-section");
}

function updateNav(element) {
  for (let j = 0; j < totalNavList; j++) {
    navList[j].querySelector("a").classList.remove("active");
    const target = element.getAttribute("href").split("#")[1];
    if (
      target ===
      navList[j].querySelector("a").getAttribute("href").split("#")[1]
    ) {
      navList[j].querySelector("a").classList.add("active");
    }
  }
}

document.querySelector(".hire-me").addEventListener("click", function () {
  const sectionIndex = this.getAttribute("data-section-index");
  removeBackSectionClass();
  addBackSectionClass(sectionIndex);
  showSection(this);
  updateNav(this);
});

const navTogglerBtn = document.querySelector(".nav-toggler"),
  aside = document.querySelector(".aside");

navTogglerBtn.addEventListener("click", asideSectionTogglerBtn);

function asideSectionTogglerBtn() {
  aside.classList.toggle("open");
  navTogglerBtn.classList.toggle("open");
}
