@php
if(!isset($advantage) || !count($advantage)){
  return;
}
$title_4 = $landingSettings->title_4 ?? '';
$title_5 = $landingSettings->title_5 ?? '';
@endphp

<div class="px-4">
  <h2 class="text-center text-xl font-bold">{{$title_4}} - <span class="text-primary">{{$title_5}}</span></h2>
  <!-- <div class="grid sm:grid-cols-3 gap-6 sm:gap-12 px-12 sm:px-4 mt-10 sm:mt-12">
    @foreach ($advantage as $index => $item)
    <div>
      <figure class="grid gap-2 text-center font-medium text-sm">
        <img src="images/landings/{{$landingId}}/advantages/{{$item->img_name}}" class='object-cover h-full w-full aspect-square display-block' alt="Product image">
        <figcaption class="px-1">{{$item->caption}}</figcaption>
      </figure>
    </div>
    @endforeach
  </div> -->
  <div class="relative overflow-hidden h-full flex justify-center mt-10"> 
    <div class="advantage-swiper h-full w-2/3 md:w-full overflow-hidden md:overflow-visible">
      <div class="swiper-wrapper h-full">
        @foreach ($advantage as $index => $item)
        <div class="swiper-slide h-full">
          <div class="swiper-lazy-preloader"></div>
          <figure class="grid gap-2 text-center font-medium text-sm">
            <img src="images/landings/{{$landingId}}/advantages/{{$item->img_name}}" class='object-cover h-full w-full aspect-square display-block' alt="Product image" loading="lazy">
            <figcaption class="px-1">{{$item->caption}}</figcaption>
          </figure>
        </div>
        @endforeach
      </div>
    </div>
</div>
</div>

