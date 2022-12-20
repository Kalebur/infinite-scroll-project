const imageContainer = document.getElementById("images");
const loader = document.getElementById("loader");
let photosArray = [];
let currentlyLoadingPhotos = false;
let imagesLoaded = 0;
let totalImages = 0;

const requestedImageCount = 30;
const apiKey = "";
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${requestedImageCount}&orientation=portrait`;

function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    currentlyLoadingPhotos = false;
  }
}

function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Create new child node and append to DOM
function displayPhotos() {
  totalImages += photosArray.length;

  photosArray.forEach((photo) => {
    const newImgLink = document.createElement("a");
    // newImgLink.setAttribute("href", photo.links.html);
    // newImgLink.setAttribute("target", "__blank");
    setAttributes(newImgLink, {
      href: photo.links.html,
      target: "__blank",
    });

    const newImg = document.createElement("img");
    const altText = photo.alt_description ? photo.alt_description : "";
    setAttributes(newImg, {
      src: photo.urls.regular,
      alt: altText,
      title: altText,
    });

    newImg.addEventListener("load", imageLoaded);
    newImgLink.appendChild(newImg);
    imageContainer.appendChild(newImgLink);
  });
}

async function getPhotosFromAPI() {
  currentlyLoadingPhotos = true;

  try {
    const response = await fetch(apiURL);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {}
}

// Pull in more photos if user has nearly scrolled to the bottom
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    !currentlyLoadingPhotos
  ) {
    getPhotosFromAPI();
  }
});

getPhotosFromAPI();
