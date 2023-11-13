@php
  // $discount - comes in with props
  // $images  - comes in with props
@endphp


<div class="relative overflow-hidden h-full">
  <div class="absolute p2 bg-red-600 text-white text-sm z-10 right-[-110px] top-10 w-80 text-center rotate-45">
    Знижка -{{ $discount }}%
  </div>
  <div class="swiper max-w-[100%] h-full">
    <div class="swiper-wrapper">
      @foreach($images as $image)
      <div class="swiper-slide">
        <img src="{{ Storage::url('public/images/' . $image) }}" alt="{{$image}}" class="w-full h-full object-cover">
      </div>
      @endforeach
    </div>
    <div class="swiper-pagination"></div>
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</div>