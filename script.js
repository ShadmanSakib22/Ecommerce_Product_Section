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
  const productName = document.querySelector(".title").textContent;
  const cartSidebar = document.getElementById("cartSidebar");
  const cartItemsContainer = document.getElementById("cart-items");
  const addToCartButton = document.querySelector(".add-to-cart-btn");
  const quantityDisplays = document.querySelectorAll(".quantity > div");
  const minusButtonsProductPage = document.querySelectorAll(".quantity .minus");
  const plusButtonsProductPage = document.querySelectorAll(".quantity .plus");
  const closeCartButton = document.getElementById("closeCartButton");
  const cartItemTemplate = document.getElementById("cartItemTemplate");
  const emptyCartMessage = document.getElementById("emptyCartMessage");

  let currentQuantity = parseInt(quantityDisplays[0].textContent, 10) || 1;
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const updateTotalPrice = (quantity) => {
    const total = (discountPrice * quantity).toFixed(2);
    discountedPriceElement.textContent = `$${total}`;
    const totalOriginal = (basePrice * quantity).toFixed(2);
    originalPriceElement.textContent = `$${totalOriginal}`;
  };

  const updateQuantityDisplays = (quantity) => {
    quantityDisplays.forEach((display) => {
      display.textContent = quantity;
    });
  };

  const openCartSidebar = () => {
    cartSidebar.style.right = "0";
  };

  const closeCartSidebar = () => {
    cartSidebar.style.right = "-300px";
  };

  const renderCartItems = () => {
    cartItemsContainer.innerHTML = "";
    if (cart.length === 0) {
      emptyCartMessage.style.display = "block";
      return;
    }
    emptyCartMessage.style.display = "none";
    cart.forEach((item, index) => {
      const cartItemNode = cartItemTemplate.content.cloneNode(true);
      const cartItemElement = cartItemNode.querySelector(".cart-item");
      const itemNameElement = cartItemElement.querySelector(".item-name");
      const quantityDisplayElement =
        cartItemElement.querySelector(".quantity-display");
      const priceElement = cartItemElement.querySelector(".item-price");
      const minusButton = cartItemElement.querySelector(".minus");
      const plusButton = cartItemElement.querySelector(".plus");

      itemNameElement.textContent = item.name;
      quantityDisplayElement.textContent = item.quantity;
      priceElement.textContent = `$${(item.price * item.quantity).toFixed(2)}`;

      minusButton.addEventListener("click", () => {
        if (item.quantity > 1) {
          item.quantity--;
          updateCart(index, item.quantity);
        } else {
          removeItemFromCart(index);
        }
      });

      plusButton.addEventListener("click", () => {
        item.quantity++;
        updateCart(index, item.quantity);
      });

      cartItemsContainer.appendChild(cartItemElement);
    });
  };

  const updateCart = (index, newQuantity) => {
    cart[index].quantity = newQuantity;
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCartItems();
  };

  const removeItemFromCart = (index) => {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCartItems();
  };

  const addItemToCart = () => {
    const existingItemIndex = cart.findIndex(
      (item) => item.name === productName
    );

    if (existingItemIndex > -1) {
      cart[existingItemIndex].quantity += currentQuantity;
    } else {
      cart.push({
        name: productName,
        quantity: currentQuantity,
        price: discountPrice,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    openCartSidebar();
    renderCartItems();
  };

  updateQuantityDisplays(currentQuantity);
  updateTotalPrice(currentQuantity);
  renderCartItems();

  minusButtonsProductPage.forEach((button) => {
    button.addEventListener("click", () => {
      if (currentQuantity > 1) {
        currentQuantity--;
        updateQuantityDisplays(currentQuantity);
        updateTotalPrice(currentQuantity);
      }
    });
  });

  plusButtonsProductPage.forEach((button) => {
    button.addEventListener("click", () => {
      currentQuantity++;
      updateQuantityDisplays(currentQuantity);
      updateTotalPrice(currentQuantity);
    });
  });

  addToCartButton.addEventListener("click", addItemToCart);
  closeCartButton.addEventListener("click", closeCartSidebar);
});
