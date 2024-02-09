let baseUrl = `https://api.flickr.com/services/rest`;
let method = "flickr.photos.search";
// Default amount of photos per page
let photosPerPage = 20;
let currentPage;
let query;
//Created variables for DOM-elements
const imgContainer = document.getElementById("imgContainer");
const searchBox = document.getElementById("search-box");
const searchForm = document.getElementById("search-form");
// Ta bort sen

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
    for (const img of photos.photo) {
      loadImage(img);
    }
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
// const firstPage = document.getElementById("button-first-page");
// firstPage.addEventListener("click", () => {
//   fetchImage(query, 1);
// });
// const lastPage = document.getElementById("button-last-page");
// lastPage.addEventListener("click", () => {
//   fetchImage(query, totalPages);
// });

function loadImage(img) {
  let imgSize = "q";
  let imgUrl = `https://farm${img.farm}.staticflickr.com/${img.server}/${img.id}_${img.secret}_${imgSize}.jpg`;
  //Element is created and value is given to a variable
  const imgElement = document.createElement("img");
  const lotsOfImages = document.createElement("picture");
  //Src of the img element is given the value of url
  imgElement.src = imgUrl;
  //Appending the new element to the div container
  imgElement.setAttribute("alt", img.title);
  lotsOfImages.appendChild(imgElement);
  imgContainer.appendChild(lotsOfImages);
}

function loadPagination(page, pages, keyword) {
  //TODO
  currentPage = page;
  query = keyword;

  const pageList = document.querySelector(".page-list");

  console.log(page);

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
