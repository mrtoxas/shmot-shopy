import { PhoneMask } from './phoneMask';
import { Carousel } from './carousel';
import { GoToElem } from './goToElem';
import { Loader } from './loader';

new PhoneMask();
new Carousel();

new Loader('pageLoader');

window.addEventListener('DOMContentLoaded', ()=>{
  new GoToElem();
})
