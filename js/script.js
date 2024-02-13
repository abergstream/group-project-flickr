const baseUrl = `https://api.flickr.com/services/rest`;
const method = "flickr.photos.search";
// Default amount of photos per page
let photosPerPage = 20;
let currentPage;
let query;

let photoArray;
let prevIndex;
let nextIndex;
//Created variables for DOM-elements
const imgContainer = document.getElementById("imgContainer");
const searchBox = document.getElementById("search-box");
const searchForm = document.getElementById("search-form");
const imagePerPage = document.querySelector(".img-per-page");
// Ta bort sen

imagePerPage.addEventListener("change", () => {
  photosPerPage = imagePerPage.value;
  fetchImage(query, currentPage);
});

async function fetchImage(keyword, currentPage) {
  imgContainer.innerHTML = "";
  let apiUrl = `${baseUrl}?api_key=${pubkey}&method=${method}&text=${keyword}&page=${currentPage}&per_page=${photosPerPage}&format=json&nojsoncallback=1`;

  try {
    const response = await fetch(apiUrl);
    // fetches photos from our data (data.photos)
    const { photos } = await response.json();
    //Created a variable shortcut for pagination
    loadPagination(currentPage, photos.pages, keyword);
    // clears our images when we change the page or when we do a new search
    imgContainer.innerHTML = "";
    // Starts a loop and calls a function to load and append images to the HTML doc
    photoArray = photos.photo;
    photos.photo.forEach((img, index) => {
      loadImage(img, index);
    });
  } catch (error) {
    console.error("Error: " + error);
  }
}

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

function loadImage(img, index) {
  let imgSize = "q";
  let imgUrl = `https://farm${img.farm}.staticflickr.com/${img.server}/${img.id}_${img.secret}_${imgSize}.jpg`;
  //Element is created and value is given to a variable
  const imgElement = document.createElement("img");
  //Src of the img element is given the value of url
  imgElement.src = imgUrl;
  //Appending the new element to the div container
  imgElement.setAttribute("alt", img.title);
  imgContainer.appendChild(imgElement);
  imgElement.addEventListener("click", () => {
    openLightbox(img, index);
  });
}

function openLightbox(img, index) {
  const lightboxPhoto = document.getElementById("lightboxPhoto");
  const lightboxThumbnail = document.getElementById("lightboxThumbnail");
  const lightbox = document.querySelector(".lightbox");

  const imgUrl = `https://farm${img.farm}.staticflickr.com/${img.server}/${img.id}_${img.secret}_b.jpg`;
  lightboxPhoto.src = imgUrl;
  lightboxPhoto.classList.add("lightbox__image");
  lightboxThumbnail.innerText = "";

  prevIndex = index - 1;
  nextIndex = index + 1;

  if (index > 0) {
    const lightboxThumb1 = createThumbnail(photoArray[prevIndex], prevIndex);
    lightboxThumbnail.appendChild(lightboxThumb1);
  }

  const lightboxThumb2 = createThumbnail(img, index);
  lightboxThumbnail.appendChild(lightboxThumb2);
  lightboxThumb2.classList.add("active-thumb");

  if (nextIndex < photoArray.length) {
    const lightboxThumb3 = createThumbnail(photoArray[nextIndex], nextIndex);
    lightboxThumbnail.appendChild(lightboxThumb3);
  }
  lightbox.style.display = "flex";
}

const lightboxEffect = document.getElementById("lightbox-effect");
lightboxEffect.addEventListener("click", (e) => {
  if(e.target == e.currentTarget){
    lightboxEffect.style.display = "none";
  }
})

function createThumbnail(img, index) {
  const thumbUrl = `https://farm${img.farm}.staticflickr.com/${img.server}/${img.id}_${img.secret}_t.jpg`;
  const thumb = document.createElement("img");
  thumb.addEventListener("click", () => {
    openLightbox(photoArray[index], index);
  });
  thumb.src = thumbUrl;
  return thumb;
}

function loadPagination(page, pages, keyword) {
  currentPage = page;
  query = keyword;

  const pageList = document.querySelector(".page-list");

  pageList.innerHTML = "";
  if (page > 3) {
    const listItemFirstPage = document.createElement("li");
    listItemFirstPage.classList.add("page-list__item");
    listItemFirstPage.innerHTML = 1;
    pageList.appendChild(listItemFirstPage);

    const listItemDots = document.createElement("li");
    listItemDots.innerHTML = "...";
    pageList.appendChild(listItemDots);
  }
  for (let i = page - 2; i <= page + 2; i++) {
    if (i > 0 && i < pages) {
      const liElement = document.createElement("li");
      liElement.classList.add("page-list__item");
      liElement.innerHTML = i;
      liElement.addEventListener("click", () => {
        fetchImage(keyword, i);
      });
      if (i == page) {
        liElement.classList.add("page-list__item--current");
      }
      pageList.appendChild(liElement);
    }
  }
}

function searchImages() {
  keyword = searchBox.value;
  fetchImage(keyword, 1);
}

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  searchImages();
});

fetchImage("monkey", 1);
