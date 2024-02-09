let baseUrl = `https://api.flickr.com/services/rest`;
let method = "flickr.photos.search";
// Default amount of photos per page
let photosPerPage = 20;

//Created variables for DOM-elements
const imgContainer = document.getElementById("imgContainer");
const searchBox = document.getElementById("search-box");
const searchForm = document.getElementById("search-form");

async function fetchImage(keyword, currentPage) {
  let apiUrl = `${baseUrl}?api_key=${pubkey}&method=${method}&text=${keyword}&page=${currentPage}&per_page=${photosPerPage}&format=json&nojsoncallback=1`;

  try {
    const response = await fetch(apiUrl);
    // fetches photos from our data (data.photos)
    const { photos } = await response.json();
    //Created a variable shortcut for pagination
    loadPagination(currentPage, photos.pages);
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

function loadPagination(page, pages) {
  //TODO
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
