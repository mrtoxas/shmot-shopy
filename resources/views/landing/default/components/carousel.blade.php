@php
  $imgNames = [];
  foreach($products as $product){
    $images = $product->productImages;
    foreach($images as $image){
      $imgNames[] = $image->img_name;
    }
  }
@endphp

<div class="swiper max-w-[100%] h-[400px]">
  <div class="swiper-wrapper">
    @foreach($imgNames as $imageName)
    <div class="swiper-slide">
      <img src="{{ Storage::url('public/images/' . $imageName) }}" alt="Image" class="w-full h-full object-cover">
    </div>
    @endforeach
  </div>
  <!-- If we need pagination -->
  <div class="swiper-pagination"></div>

  <!-- If we need navigation buttons -->
  <div class="swiper-button-prev"></div>
  <div class="swiper-button-next"></div>

  <!-- If we need scrollbar -->
  
</div>