const sliderContainer = document.querySelector('.product-slider');
const sliderTrack = document.querySelector('.slider-track');

let isDragging = false;
let startX = 0;
let scrollX = 0;

sliderContainer.addEventListener('mousedown', (event) => {
  isDragging = true;
  startX = event.clientX;
});

document.addEventListener('mouseup', () => isDragging = false);

document.addEventListener('mousemove', (event) => {
  if (!isDragging) return;

  const deltaX = event.clientX - startX; // Calculate mouse movement
  startX = event.clientX; // Update start position for next move
  scrollX -= deltaX; // Update scroll position
  // Prevent scrolling beyond slider content boundaries
  scrollX = Math.max(0, scrollX); // Minimum scroll at the beginning
  const maxScroll = sliderTrack.offsetWidth - sliderContainer.offsetWidth;
  scrollX = Math.min(maxScroll, scrollX); // Maximum scroll at the end

  sliderTrack.style.transform = `translateX(-${scrollX}px)`;
});
