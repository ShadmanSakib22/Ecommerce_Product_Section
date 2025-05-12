// Image Carousel
const images = [0, 1, 2, 3]; // array of product image names
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

document.addEventListener("DOMContentLoaded", () => {
  // Price and Quantity elements
  const discountedPriceElement = document.querySelector(".discounted-price");
  const originalPriceElement = document.querySelector(
    ".price > div > span:first-child"
  );

  const basePrice = parseFloat(
    originalPriceElement.textContent.replace("$", "")
  );
  const discountPrice = parseFloat(
    discountedPriceElement.textContent.replace("$", "")
  );

  // Function to update the displayed total price
  const updateTotalPrice = (quantity) => {
    const total = (discountPrice * quantity).toFixed(2);
    discountedPriceElement.textContent = `$${total}`;

    const totalOriginal = (basePrice * quantity).toFixed(2);
    originalPriceElement.textContent = `$${totalOriginal}`;
  };

  // Select all quantity display elements and buttons
  const quantityDisplays = document.querySelectorAll(".quantity > div");
  const minusButtons = document.querySelectorAll(".quantity .minus");
  const plusButtons = document.querySelectorAll(".quantity .plus");

  let currentQuantity = 1;

  // Function to update all quantity displays
  const updateQuantityDisplays = (quantity) => {
    quantityDisplays.forEach((display) => {
      display.textContent = quantity;
    });
  };

  // Initialize quantity displays
  updateQuantityDisplays(currentQuantity);
  updateTotalPrice(currentQuantity); // Initialize the price based on initial quantity

  minusButtons.forEach((button) => {
    button.addEventListener("click", () => {
      if (currentQuantity > 1) {
        currentQuantity--;
        updateQuantityDisplays(currentQuantity);
        updateTotalPrice(currentQuantity);
      }
    });
  });

  plusButtons.forEach((button) => {
    button.addEventListener("click", () => {
      currentQuantity++;
      updateQuantityDisplays(currentQuantity);
      updateTotalPrice(currentQuantity);
    });
  });
});
