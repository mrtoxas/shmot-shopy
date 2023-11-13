@php
	$imgNames = [];
	  foreach($products as $product){
	    $images = $product->productImages;
	    foreach($images as $image){
	      $imgNames[] = $image->img_name;
	 	}
	}

	$price = $globalProduct->price;
  $discount = $globalProduct->discount;
  $discountAmount = ($discount / 100) * $price;
	$discountedPrice = $price - $discountAmount;
@endphp

<div class="grid grid-cols-2 bg-white rounded-sm py-6 ">
	<div class="translate-x-[-2rem] rounded-sm">
		@include("$template.components.productCarousel", [
			'discount' => $globalProduct->dicsount,
			'images' => $imgNames
		])
	</div>
	<div class="pr-6">
		<div class="font-bold text-xl">{{ $landingSettings->meta_title }}</div>
    <div class="mt-2">
      @include("{$template}.components.starRating", [
      	'reviews' => 224
      ])
    </div>
    <div class="mt-6 flex items-center">
      <div class="text-3xl font-bold">{{ $discountedPrice }} грн.</div>
      <div class="line-through ml-4 text-slate-400 text-2xl">{{ $price }} грн.</div>
    </div>
    <div class="text-sm text-gray-400 mt-2">
      Знижка {{ $discount }}%, дiйсна до 20.11.2023
    </div>
    <div class="mt-6">
      <div class="font-bold">Опис коллекцiї</div>
      <p class="text-sm">Далеко-далеко за словесними горами в країні голосних і приголосних живуть рибні тексти. Текст скотився, підступних смажених, пустився, буквоград рекламних свого одного разу знову, за що переписали? Семантика погляд сумний мовного, вони рибними, життя!</p>
    </div>
    <div class="mt-6">
      <button class="bg-black text-sm hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full">
        Зробити замовлення
      </button>
    </div>
	</div>
</div>