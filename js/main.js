const sliders = document.querySelectorAll('[data-slider]');

sliders.forEach((slider) => {
  const track = slider.querySelector('.slider__track');
  const slides = Array.from(slider.querySelectorAll('.slider__slide'));
  const dots = Array.from(slider.querySelectorAll('.slider-dot'));

  if (!track || slides.length === 0) {
    return;
  }

  let currentIndex = 0;
  let startX = 0;
  let startY = 0;
  let deltaX = 0;
  let deltaY = 0;
  let isPointerDown = false;

  const setActive = (index) => {
    currentIndex = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${currentIndex * 100}%)`;

    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle('is-active', slideIndex === currentIndex);
    });

    dots.forEach((dot, dotIndex) => dot.classList.toggle('is-active', dotIndex === currentIndex));
  };

  dots.forEach((dot, index) => {
    dot.addEventListener('click', (event) => {
      event.preventDefault();
      setActive(index);
    });
  });

  const onPointerDown = (event) => {
    isPointerDown = true;
    startX = event.clientX;
    startY = event.clientY;
    deltaX = 0;
    deltaY = 0;
  };

  const onPointerMove = (event) => {
    if (!isPointerDown) {
      return;
    }

    deltaX = event.clientX - startX;
    deltaY = event.clientY - startY;
  };

  const onPointerUp = () => {
    if (!isPointerDown) {
      return;
    }

    isPointerDown = false;

    if (Math.abs(deltaX) < 35 || Math.abs(deltaX) <= Math.abs(deltaY)) {
      return;
    }

    if (deltaX < 0) {
      setActive(currentIndex + 1);
    } else {
      setActive(currentIndex - 1);
    }
  };

  slider.addEventListener('pointerdown', onPointerDown);
  slider.addEventListener('pointermove', onPointerMove);
  slider.addEventListener('pointerup', onPointerUp);
  slider.addEventListener('pointercancel', onPointerUp);
  slider.addEventListener('pointerleave', onPointerUp);

  setActive(0);
});
