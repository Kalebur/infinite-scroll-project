const requestedImageCount = 30;
const apiKey = "";
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${requestedImageCount}&orientation=portrait`;

async function getPhotosFromAPI() {
  try {
    const response = await fetch(apiURL);
    const data = await response.json();

    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

getPhotosFromAPI();
