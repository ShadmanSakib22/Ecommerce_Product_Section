const images = [0, 1, 2, 3]; // Can load image name from a database or API
const thumbnailCarousel = document.getElementById("thumbnailCarousel");
const mainImage = document.getElementById("mainImage");

const thumbnails = images
  .map((image) => {
    const imagePath = `./Assets/Product/${image}.png`;
    return `
      <img
        src="${imagePath}"
        alt="Product Image"
        class="thumbnail-image"
        onclick="updateMainImage('${imagePath}')"
      />
  `;
  })
  .join("");

thumbnailCarousel.innerHTML = thumbnails;

function updateMainImage(imagePath) {
  mainImage.src = imagePath;
}
