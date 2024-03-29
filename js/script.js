const baseUrl = `https://api.flickr.com/services/rest`;
const method = "flickr.photos.search";

// Global Variables
let photosPerPage = 20;
let currentPage;
let query;
let photoArray;
let prevIndex;
let nextIndex;

// DOM-elements with their corresponding EventListeners
const imgContainer = document.getElementById("imgContainer");

const imagePerPage = document.querySelector(".img-per-page");
imagePerPage.addEventListener("change", () => {
  photosPerPage = imagePerPage.value;
  fetchImage(query, currentPage);
});
const prevPage = document.getElementById("button-prev-page");
prevPage.addEventListener("click", () => {
  fetchImage(query, currentPage - 1);
});
const nextPage = document.getElementById("button-next-page");
nextPage.addEventListener("click", () => {
  fetchImage(query, currentPage + 1);
});
const prevArrow = document.getElementById("prevArrow");
prevArrow.addEventListener("click", () => {
  openLightbox(photoArray[prevIndex], prevIndex);
});
const nextArrow = document.getElementById("nextArrow");
nextArrow.addEventListener("click", () => {
  openLightbox(photoArray[nextIndex], nextIndex);
});
const searchBox = document.getElementById("search-box");
const searchForm = document.getElementById("search-form");
searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  searchImages();
});
const lightboxEffect = document.getElementById("lightbox-effect");
lightboxEffect.addEventListener("click", (e) => {
  if (e.target == e.currentTarget) {
    lightboxEffect.style.display = "none";
  }
});

// Main function
async function fetchImage(keyword, currentPage) {
  const apiUrl = `${baseUrl}?api_key=${pubkey}&method=${method}&text=${keyword}&page=${currentPage}&per_page=${photosPerPage}&format=json&nojsoncallback=1&media=photos`;
  try {
    const response = await fetch(apiUrl);
    // Fetches photos from our data (data.photos)
    const { photos } = await response.json();
    photoArray = photos.photo;
    // Calls our pagination function
    loadPagination(currentPage, photos.pages, keyword);
    // Clears our images when we change the page or when we do a new search
    imgContainer.innerHTML = "";
    // Loops through the photoArray and appends our images to the current page
    photoArray.forEach((img, index) => {
      loadImage(img, index);
    });
  } catch (error) {
    console.error("Error: " + error);
    alert("An error has occurred! Please try again later!")
  }
}

function loadImage(img, index) {
  const imgUrl = `https://farm${img.farm}.staticflickr.com/${img.server}/${img.id}_${img.secret}_q.jpg`;
  const imgElement = document.createElement("img");
  imgElement.classList.add("image");
  // Our API response gives imgElement the sourceimage, and we add alt-text functionality
  imgElement.src = imgUrl;
  imgElement.setAttribute("alt", img.title);
  imgContainer.appendChild(imgElement);

  // Adds an EventListener to our images for lightbox functionality
  imgElement.addEventListener("click", () => {
    openLightbox(img, index);
  });
}

function openLightbox(img, index) {
  const imgUrl = `https://farm${img.farm}.staticflickr.com/${img.server}/${img.id}_${img.secret}_b.jpg`;
  const lightboxPhoto = document.getElementById("lightboxPhoto");
  const lightboxThumbnail = document.getElementById("lightboxThumbnail");
  const lightbox = document.querySelector(".lightbox");

  // API response gives our lightboxPhoto its source like in loadImage(), and removes our previous lightbox thumbnails
  lightboxPhoto.src = imgUrl;
  lightboxPhoto.classList.add("lightbox__image");
  lightboxThumbnail.innerText = "";

  // These are used to point to the index of our thumbnails
  prevIndex = index - 1;
  nextIndex = index + 1;

  // We create our thumbnails and append, and we use if-statements for the first & last thumbnail to avoid conflicts with the index
  if (index > 0) {
    const lightboxThumb1 = createThumbnail(photoArray[prevIndex], prevIndex);
    lightboxThumbnail.appendChild(lightboxThumb1);
  }
  const lightboxThumb2 = createThumbnail(img, index);
  lightboxThumbnail.appendChild(lightboxThumb2);
  lightboxThumb2.classList.add("lightbox__thumb--active");

  if (nextIndex < photoArray.length) {
    const lightboxThumb3 = createThumbnail(photoArray[nextIndex], nextIndex);
    lightboxThumbnail.appendChild(lightboxThumb3);
  }

  // This will change the display from none to flex, which will show our lightbox
  lightbox.style.display = "flex";
}

// Creates thumbnails for the lightbox, and returns thumb to be used by openLightbox
function createThumbnail(img, index) {
  const thumbUrl = `https://farm${img.farm}.staticflickr.com/${img.server}/${img.id}_${img.secret}_t.jpg`;
  const thumb = document.createElement("img");
  thumb.classList.add("lightbox__thumb");
  thumb.addEventListener("click", () => {
    openLightbox(photoArray[index], index);
  });
  thumb.src = thumbUrl;
  return thumb;
}

// Function used to navigate through our pages
function loadPagination(page, pages, keyword) {
  const pageList = document.querySelector(".page-list");
  currentPage = page;
  query = keyword;
  pageList.innerHTML = "";

  for (let i = page - 1; i <= page + 1; i++) {
    if (i > 0 && i < pages) {
      const liElement = document.createElement("li");
      liElement.classList.add("page-list__item");
      liElement.innerHTML = i;

      if (i == page) {
        liElement.classList.add("page-list__item--current");
      }
      pageList.appendChild(liElement);
    }
  }
}

// calls fetchImage when you search
function searchImages() {
  search = searchBox.value;
  fetchImage(search, 1);
}

// Default load query
fetchImage("monkey", 1);
