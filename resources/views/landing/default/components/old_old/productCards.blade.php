@foreach($products as $product)
 <div class="grid md:grid-cols-2 gap-4">
  <div class="min-w-0 w-full max-h-96">
    @include("$template.components.productCarousel", [
      'discount' => $globalProduct->discount,
      'images' => $product->productImages,
    ])
  </div>
  <div class="bg-white rounded-sm py-4 px-4 min-w-0 w-full">
    product card
  </div>
</div>
@endforeach