@php
  if (!$products || !count($products)) {
    return;
  }
  $price = $globalProduct->price;
  $discount = $globalProduct->discount;
  $discountAmount = ($discount / 100) * $price;
	$discountedPrice = $price - $discountAmount;
  $end_date = date('d.m.Y', strtotime('+8 days'));
@endphp

@foreach ($products as $product)
  @php
    $imgNames = [];
    foreach ($product->productImages as $image) {
      $imgNames[] = '/images/landings/' . $landingId . '/products/' . $product->id . '/' . $image->img_name;
    };        
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
        <div class="font-bold text-2xl">{{ $product->name }}</div>               
        <div class="mt-4 flex items-center">
          <div class="text-2xl md:text-3xl font-bold">{{ $discountedPrice }} грн.</div>
          <div class="line-through ml-4 text-slate-400 text-xl md:text-2xl">{{ $price }} грн.</div>
        </div>
        <div class="text-sm text-secondary mt-2">
          Знижка {{ $discount }}%, дiйсна до {{$end_date}}
        </div>
      </div>
      
      @if(count($product->productFeatures))
        <div class="mt-6">
          <dl>
            @foreach ($product->productFeatures as $feature)
              <dt class="font-bold text-sm flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check"><path d="M20 6 9 17l-5-5"/></svg>
                {{ $feature->name }}:
              </dt>
              <dd class="mb-2 mt-1 text-sm">{{ $feature->value }}</dd>                   
            @endforeach
          </dl>
        </div>
      @endif
      <div class="mt-6">
        <button data-scroll-to="orderForm" class="bg-black text-sm hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full ring-white ring-2">
          Зробити замовлення
        </button>
      </div>
    </div>
  </div>
@endforeach