
// applications card carousel logic
const carousel = document.querySelector(".applicationsCarousel");
const leftArrow = document.getElementById("leftArrow");
const rightArrow = document.getElementById("rightArrow");
console.log(carousel,leftArrow,rightArrow);

const scrollAmount = 470; 

rightArrow.addEventListener("click", () => {
    console.log("right arrow clicked");
  carousel.scrollBy({
    left: scrollAmount,
    behavior: "smooth"
  });
});

leftArrow.addEventListener("click", () => {
        console.log("right arrow clicked");
  carousel.scrollBy({
    left: -scrollAmount,
    behavior: "smooth"
  });
});

// Frequently asked question accordion close/open logic
const accordionHeaders = document.querySelectorAll(".accordionItemHeader");

accordionHeaders.forEach(header => {
  header.addEventListener("click", () => {

    const item = header.parentElement;
    const content = item.querySelector(".accordionItemContent");
    const icon = header.querySelector("img");

    if (content.style.maxHeight) {
      content.style.maxHeight = null;
      icon.src = "assets/icons/ArrowDown.svg";
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
      icon.src = "assets/icons/ArrowUp.svg";
    }

  });
});


// Home page image selection logic 
const mainImage = document.getElementById("mainImage");
const thumbnails = document.querySelectorAll(".carouselImage");

const mainLeftArrow = document.getElementById("mainLeftArrow");
const mainRightArrow = document.getElementById("mainRightArrow");

let currentIndex = 0;

// update image
function updateImage(index){

  mainImage.classList.add("imageFadeOut");

  setTimeout(() => {
    mainImage.src = thumbnails[index].src;
    mainImage.classList.remove("imageFadeOut");
  }, 200);

  leftArrow.disabled = index === 0;
  rightArrow.disabled = index === thumbnails.length - 1;
}

// thumbnail click
thumbnails.forEach((img, index) => {
  img.addEventListener("click", () => {
    currentIndex = index;
    updateImage(currentIndex);
  });
});

// right arrow
mainRightArrow.addEventListener("click", () => {
  if(currentIndex < thumbnails.length - 1){
    currentIndex++;
    updateImage(currentIndex);
  }
});

// left arrow
mainLeftArrow.addEventListener("click", () => {
  if(currentIndex > 0){
    currentIndex--;
    updateImage(currentIndex);
  }
});

// initial state
updateImage(currentIndex);

// Home page image zoom logic
const zoomPreview = document.getElementById("zoomPreview");

let zoomActive = false;

mainImage.addEventListener("dblclick", () => {

  zoomActive = !zoomActive;

  if (zoomActive) {
    zoomPreview.classList.add("active");
    zoomPreview.style.backgroundImage = `url(${mainImage.src})`;
  } else {
    zoomPreview.classList.remove("active");
  }

});

mainImage.addEventListener("mousemove", (e) => {

  if (!zoomActive) return;

  const rect = mainImage.getBoundingClientRect();

  const x = ((e.clientX - rect.left) / rect.width) * 100;
  const y = ((e.clientY - rect.top) / rect.height) * 100;

  zoomPreview.style.backgroundPosition = `${x}% ${y}%`;

});

document.addEventListener("click", (e) => {

  const imageViewer = document.querySelector(".homePageImage");

  if (zoomActive && !imageViewer.contains(e.target)) {
    zoomPreview.classList.remove("active");
    zoomActive = false;
  }

});

// sticky header scroll logic 
let lastScrollY = window.scrollY;

const stickyHeader = document.querySelector(".stickyHeader");
const heroSection = document.querySelector(".mainPage");

window.addEventListener("scroll", () => {

  const heroBottom = heroSection.offsetHeight;
  const currentScroll = window.scrollY;

  if (currentScroll > heroBottom && currentScroll > lastScrollY) {
    // scrolling down
    stickyHeader.classList.add("active");
  } else {
    // scrolling up
    stickyHeader.classList.remove("active");
  }

  lastScrollY = currentScroll;

});

// Modal open and close logic for download datasheet
const downloadBtn = document.getElementById("downloadBtn");
const modal = document.getElementById("downloadModal");
const closeBtn = document.getElementById("modalClose");

downloadBtn.addEventListener("click", () => {

  modal.classList.add("active");

  document.body.style.overflow = "hidden"; // freeze background

});

closeBtn.addEventListener("click", closeModal);

modal.addEventListener("click", (e) => {

  if (e.target === modal) {
    closeModal();
  }

});

function closeModal(){

  modal.classList.remove("active");

  document.body.style.overflow = "auto";

}

// Modal open and close logic for request quote
const quoteBtn = document.getElementById("quoteBtn");
const quoteModal = document.getElementById("quoteModal");
const quoteCloseBtn = document.getElementById("quoteModalClose");

quoteBtn.addEventListener("click", () => {

  quoteModal.classList.add("active");
  document.body.style.overflow = "hidden";

});

quoteCloseBtn.addEventListener("click", closeQuoteModal);

quoteModal.addEventListener("click", (e) => {

  if (e.target === quoteModal) {
    closeQuoteModal();
  }

});

function closeQuoteModal(){
  quoteModal.classList.remove("active");
  document.body.style.overflow = "auto";

}


document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeQuoteModal();
    closeModal();
  }
});