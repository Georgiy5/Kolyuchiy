document.addEventListener('DOMContentLoaded', () => {
  const sliders = document.querySelectorAll('[data-splide-slider]');

  if (!window.Splide) {
    console.error('Splide не подключен. Проверь CDN-скрипт в index.html.');
    return;
  }

  sliders.forEach((slider) => {
    new Splide(slider, {
      type: 'slide',
      rewind: true,
      perPage: 1,
      perMove: 1,
      gap: 0,
      speed: 350,
      arrows: false,
      pagination: true,
      drag: true,
      keyboard: true,
      waitForTransition: true,
    }).mount();
  });
});