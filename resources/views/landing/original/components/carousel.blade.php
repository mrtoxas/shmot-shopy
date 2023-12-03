@php
  // $images, $discount - comes in with props
@endphp

@if (isset($images))
<div class="relative overflow-hidden h-carousel">
  @if($discount)
  <div class="absolute p2 bg-red-600 text-white text-sm z-10 right-[-110px] top-10 w-80 text-center rotate-45">
    Знижка -{{ $discount }}%
  </div>
  @endif
  <div class="swiper max-w-[100%] h-full">
    <div class="swiper-wrapper">
      @foreach($images as $image)
      <div class="swiper-slide">
        <img src="{{ $image }}" alt="{{$image}}" class="w-full h-full object-cover">
      </div>
      @endforeach
    </div>
    <div class="swiper-pagination"></div>
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</div>
@endif