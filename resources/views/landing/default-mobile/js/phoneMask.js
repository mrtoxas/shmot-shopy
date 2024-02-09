import Inputmask from "inputmask";

export const PhoneMask = () => {
  const phoneInput = document.getElementById('phone');

  if(!phoneInput) return;

  Inputmask({
    mask: '38 (999) 999 99 99',
  }).mask(phoneInput);
}