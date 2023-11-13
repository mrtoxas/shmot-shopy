@foreach ($products as $product)
	@php
	$name = $product->name;
	$price = $globalProduct->price;
	$discount = $globalProduct->discount;
	$discountAmount = ($discount / 100) * $price;
	$discountedPrice = $price - $discountAmount;
	$images = $product->productImages;

	print_r($images);
	@endphp

<div class="grid md:grid-cols-2 gap-4">
  <div class="min-w-0 w-full max-h-96">
    @include("{$template}.components.carousel", [
    "discount" => $discount,
    "images" => $images
    ])
  </div>
  <div class="bg-white rounded-sm py-4 px-4 min-w-0 w-full">
    <div class="font-bold text-xl">{{ $name }}</div>
    <div class="mt-2">
      @include("{$template}.components.starRating")
    </div>
    <div class="mt-6 flex items-center">
      <div class="text-3xl font-bold">{{ $discountedPrice }} грн.</div>
      <div class="line-through ml-4 text-slate-400 text-2xl">{{ $price }} грн.</div>
    </div>
    <div class="text-sm text-gray-400 mt-2">
      Знижка {{ $discount }}%, дiйсна до 20.11.2023
    </div>
  </div>
</div>
@endforeach
