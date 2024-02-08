let baseUrl = `https://api.flickr.com/services/rest`;
let method = "flickr.photos.search";
let text = "monkey";
let currentPage = 6;
let url = `${baseUrl}?api_key=${pubkey}&method=${method}&text=${text}&page=${currentPage}&format=json&nojsoncallback=1`;
let imgContainer = document.getElementById("imgContainer");

async function monkeySearch() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    const photos = data.photos;
    let currentPage = photos.page;
    let totalPages = photos.pages;
    // let imgSize = "q";
    // let url = `https://farm${img.farm}.staticflickr.com/${img.server}/${img.id}_${img.secret}_${imgSize}.jpg`;
    console.log(data);
    console.log(currentPage);
    console.log(totalPages);
    for (const img of photos.photo) {
      let imgSize = "q";
      let url = `https://farm${img.farm}.staticflickr.com/${img.server}/${img.id}_${img.secret}_${imgSize}.jpg`;
      const imgElement = document.createElement("img");
      imgElement.src = url;
      imgContainer.appendChild(imgElement);
    }
  } catch (error) {
    console.error("Error: " + error);
  }
}

monkeySearch();
