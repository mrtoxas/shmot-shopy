import { PhoneMask } from './phoneMask';
import { Carousel, AdvantageCarousel } from './carousel';
import { GoToElem } from './goToElem';
import { Loader } from './loader';

new PhoneMask();
new Carousel();
new AdvantageCarousel();

new Loader('pageLoader');

window.addEventListener('DOMContentLoaded', ()=>{
  new GoToElem();
})
