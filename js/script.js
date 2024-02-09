let baseUrl = `https://api.flickr.com/services/rest`;
let method = "flickr.photos.search";
let text = "monkey";
let currentPage = 6;
let apiUrl = `${baseUrl}?api_key=${pubkey}&method=${method}&text=${text}&page=${currentPage}&format=json&nojsoncallback=1`;

//Created a variable from the captured div with Id imgContainer
let imgContainer = document.getElementById("imgContainer");

async function monkeySearch() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    //Created a variable shortcut
    const photos = data.photos;
    let currentPage = photos.page;
    let totalPages = photos.pages;

    //Created a loop to loop all the photos from data.photos.photo
    for (const img of photos.photo) {
      let imgSize = "q";
      let imgUrl = `https://farm${img.farm}.staticflickr.com/${img.server}/${img.id}_${img.secret}_${imgSize}.jpg`;
      //Element is created and value is given to a variable
      const imgElement = document.createElement("img");
      //Src of the img element is given the value of url
      imgElement.src = imgUrl;
      //Appending the new element to the div container
      imgContainer.appendChild(imgElement);
    }
  } catch (error) {
    console.error("Error: " + error);
  }
}

monkeySearch();
