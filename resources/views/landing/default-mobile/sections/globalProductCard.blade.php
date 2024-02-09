@php
	$imgNames = [];
	foreach($products as $product){
	  $images = $product->productImages;
	  foreach($images as $image){	  	
	    $imgNames[] = '/images/landings/' . $landingId . '/products/' . $product->id . '/' . $image->img_name;
	}
}

	$price = $globalProduct->price;
  $discount = $globalProduct->discount;
  $discountAmount = ($discount / 100) * $price;
	$discountedPrice = $price - $discountAmount;
  $end_date = date('d.m.Y', strtotime('+8 days'));
@endphp

<div class="md:grid md:grid-cols-2 bg-white rounded-sm py-2 md:py-6 min-h-carousel md:px-4">
	<div class="md:translate-x-[-2rem] rounded-sm md:shadow-xl h-carousel">
    @include("$template.components.productCarousel", [
      'discount' => $globalProduct->dicsount,
      'images' => $imgNames
    ])   
	</div>
	<div class="px-4 py-6 md:pr-6 flex flex-col justify-between">
    <div>
      <div class="font-bold text-xl md:text-2xl">{{ $landingSettings->title_1 }}</div>
      <div class="font-semibold text-sm md:text-md mt-2">{{ $landingSettings->title_2 }}</div>
      <div class="mt-4 md:mt-1">
        @include("{$template}.components.starRating", [
          'reviews' => 224
        ])
      </div>
      <div class="mt-6 flex items-center">
        <div class="text-3xl font-bold">{{ $discountedPrice }} грн.</div>
        <div class="line-through ml-4 text-slate-400 text-2xl">{{ $price }} грн.</div>
      </div>
      <div class="text-sm text-gray-400 mt-2">
        Знижка {{ $discount }}%, дiйсна до {{$end_date}}
      </div>
    </div>
		
    <div class="mt-6">
      <div class="font-bold">Опис коллекцiї</div>
      <p class="text-sm">{{$landingSettings->collection_description}}</p>
    </div>
    <div class="mt-6">
      <button data-scroll-to="orderForm" class="bg-black text-sm hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full ring-white ring-2">
        Зробити замовлення
      </button>
    </div>
	</div>
</div>