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

<div class="grid grid-cols-2 bg-white rounded-sm py-6 min-h-carousel">
	<div class="translate-x-[-2rem] rounded-sm shadow-xl h-carousel">
    @include("$template.components.productCarousel", [
      'discount' => $globalProduct->dicsount,
      'images' => $imgNames
    ])   
	</div>
	<div class="pr-6 flex flex-col justify-between">
    <div>
      <div class="font-bold text-2xl">{{ $landingSettings->title_1 }}</div>
      <div class="font-semibold text-md mt-2">{{ $landingSettings->title_2 }}</div>
      <div class="mt-1">
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