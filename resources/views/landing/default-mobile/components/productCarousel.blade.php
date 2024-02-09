@php
  // $discount - comes in with props
  // $images  - comes in with props
@endphp


<div class="relative overflow-hidden h-full"> 
  <div class="swiper w-full h-full">
    <div class="swiper-wrapper h-full ">
      @foreach($images as $image)
      <div class="swiper-slide h-full">
        <img src="{{ $image }}" alt="{{$image}}" class="absolute left-0 top-0 display-block w-full h-full object-cover max-h-full" loading="lazy">
      </div>
      @endforeach
    </div>
    <div class="swiper-pagination"></div>
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</div>