@php
  $price = $globalProduct->price;
  $discount = $globalProduct->discount;
  $discountAmount = ($discount / 100) * $price;
  $discountedPrice = $price - $discountAmount;
@endphp

<div class="grid gap-6">
  @foreach ($products as $product)

  <div class="grid grid-cols-2 bg-white rounded-sm py-6 ">
  	<div class="translate-x-[-2rem] rounded-sm">
      @php
        $imgNames = [];
          foreach($product->productImages as $image){
            $imgNames[] = $image->img_name;
          }
      @endphp
  		@include("$template.components.productCarousel", [
  			'discount' => $globalProduct->dicsount,
  			'images' => $imgNames
  		])
  	</div>
  	<div class="pr-6">
  		<div class="font-bold text-xl">{{ $product->name }}</div>
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

      @isset ($product->productFeatures)
      <div class="mt-6 text-sm">
        <div class="font-bold">Характеристики</div>
        @foreach ($product->productFeatures as $feature )
          <div class="flex item-start mt-2">
            <div class="mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check"><path d="M20 6 9 17l-5-5"/></svg>
          </div>
            <div>{{ $feature->value }}</div>
          </div>
        @endforeach
      </div>
      @endisset
      <div class="mt-6">
        <button class="bg-black text-sm hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full">
          Зробити замовлення
        </button>
      </div>
  	</div>
  </div>
@endforeach

</div>