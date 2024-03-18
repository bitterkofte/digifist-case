const productSlider = document.querySelector('.product-slider');
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
  let clientX;

  if (event.type === 'touchmove') clientX = event.touches[0].clientX; //touch evert
  else clientX = event.clientX; //mouse event

  const deltaX = clientX - startX;
  startX = clientX;
  scrollX -= deltaX;

  //preventing excessive scrolling 
  scrollX = Math.max(0, scrollX);
  const maxScroll = sliderTrack.offsetWidth - productSlider.offsetWidth;
  scrollX = Math.min(maxScroll, scrollX);

  sliderTrack.style.transform = `translateX(-${scrollX}px)`;  //adjusting scrolling
}

function dropHandler (event) {
  if (event.type === 'touchstart') {
    event.preventDefault();
    startX = event.touches[0].clientX;
  } else {
    startX = event.clientX;
  }
  isDragging = true;
}

function scrollRightHandler() {
  const newPosition = -scrollX - 100;

  //preventing excessive scrolling 
  if (-newPosition-20 > sliderTrack.scrollWidth - productSlider.offsetWidth) return
  scrollX = -newPosition;
  sliderTrack.style.transform = `translateX(${newPosition}px)`; //adjusting scrolling
}

// EVENT LISTENERS
productSlider.addEventListener('mousedown', (event) => dropHandler(event));
productSlider.addEventListener('touchstart', dropHandler);

document.addEventListener('mouseup', () => isDragging = false);
document.addEventListener('touchend', () => isDragging = false);

document.addEventListener('mousemove', dragHandler);
document.addEventListener('touchmove', dragHandler);

scrollRight.addEventListener("click", scrollRightHandler);