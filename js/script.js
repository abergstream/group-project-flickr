let baseUrl = `https://api.flickr.com/services/rest`;
let method = "flickr.photos.search";
let text = "monkey";
let currentPage = 6;
let url = `${baseUrl}?api_key=${pubkey}&method=${method}&text=${text}&page=${currentPage}&format=json&nojsoncallback=1`;
// let url = `${baseUrl}?api_key=${pubkey}&method=${method}&text=${text}&format=json&nojsoncallback=1`;

console.log(secretkey);

async function monkeySearch() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
  } catch(error) {
        console.error("Error: " + error);
  }
}

monkeySearch();