let baseUrl = `https://api.flickr.com/services/rest`;
let method = "flickr.photos.search";
let text = "monkey";
let currentPage = 6;
let url = `${baseUrl}?api_key=${pubkey}&method=${method}&text=${text}&page=${currentPage}&format=json&nojsoncallback=1`;

async function monkeySearch() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    // let imgSize = "q";
    // let url = `https://farm${img.farm}.staticflickr.com/${img.server}/${img.id}_${img.secret}_${imgSize}.jpg`;
  } catch (error) {
    console.error("Error: " + error);
  }
}

monkeySearch();
