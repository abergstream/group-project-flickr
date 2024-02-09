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
    // fetches data.photos
    const {photos} = await response.json();
    //Created a variable shortcut
    loadPagination(currentPage, photos.pages)
    //Created a loop to loop all the photos from data.photos.photo
    for (const img of photos.photo) {
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
  } catch (error) {
    console.error("Error: " + error);
  }
}

fetchImage("monkeys", 1);

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
})
