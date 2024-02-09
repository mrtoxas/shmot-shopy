import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';

export const Carousel = () => {
  const swiper = new Swiper('.swiper', {
    modules: [Navigation, Pagination, Autoplay],
    loop: true,
    autoHeight: false,
    spaceBetween: 10,
    pagination: {
      el: '.swiper-pagination',
    },
    autoplay: {
      delay: 3000,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    scrollbar: {
      el: '.swiper-scrollbar',
    },
    slidesPerView: 'auto', 

    breakpoints: {
      768: {
        slidesPerView: 1,
      },
    }
  });
}

export const AdvantageCarousel = () => {
  const swiper = new Swiper('.advantage-swiper', {
    modules: [Autoplay],
    loop: true,
    autoHeight: false,
    autoplay: {
      delay: 2000,
    },
    slidesPerView: 1, 

    breakpoints: {
      768: {
        slidesPerView: 3,
        spaceBetween: 30,
        autoplay: false,
      },
    }
  });
}
