const sliderContainer = document.querySelector('.product-slider');
const sliderTrack = document.querySelector('.slider-track');
const scrollRight = document.getElementById("scroll-right");

// IMPLEMENTINGPRODUCT CARDS
const implementProducts = (products) => {
  const productCards = products.map((product,i) => {
    return `
      <div id="prd-${product.id}" class='card'>
        <img class="prd-img" src="${product.imgSrc}" alt="product-${i+1}">
        <div class='prd-info'>
          <h3 class="prd-name">${product.title}</h3>
          <div class='prd-details'>
            <p class="prd-price">${product.price}</p>
            <div class='prd-colors'>
              <button id="blue" class="color-btn"></button>
              <button id="red" class="color-btn"></button>
              <button id="purple" class="color-btn"></button>
              <button id="green" class="color-btn"></button>
            </div>
          </div>
        </div>
      </div>
    `
  });
  productCards.reverse().forEach((element) => {
    sliderTrack.insertAdjacentHTML("afterbegin", element)
  });
};
implementProducts(products);

// DRAG SCROLL
let isDragging = false;
let startX = 0;
let scrollX = 0;

function dragHandler (event) {
  if (!isDragging) return;

  const deltaX = event.clientX - startX;
  startX = event.clientX;
  scrollX -= deltaX;

  // Preventing excessive scrolling 
  scrollX = Math.max(0, scrollX);
  const maxScroll = sliderTrack.offsetWidth - sliderContainer.offsetWidth;
  scrollX = Math.min(maxScroll, scrollX);

  sliderTrack.style.transform = `translateX(-${scrollX}px)`;
}

function dropHandler (event) {
  isDragging = true;
  startX = event.clientX;
}

function scrollRightHandler() {
  const currentPosition = parseFloat(sliderTrack.style.transform.replace('translateX(', '').replace('px)', '')) || 0;
  const newPosition = -scrollX - 100;
  if (-newPosition-20 > sliderTrack.scrollWidth - sliderContainer.offsetWidth) return
  scrollX = -newPosition;
  sliderTrack.style.transform = `translateX(${newPosition}px)`;
}

// EVENT LISTENERS
sliderContainer.addEventListener('mousedown', (event) => dropHandler(event));
document.addEventListener('mouseup', () => isDragging = false);
document.addEventListener('mousemove', (event) => dragHandler(event));
scrollRight.addEventListener("click", scrollRightHandler);