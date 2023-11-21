@php
  if (!$products) {
      return;
  }
  $discount = $globalProduct->discount ?? '';
  $price = $globalProduct->price ?? '';
  $d_price = $globalProduct->discounted_price ?? '';
  $head = $landingSettings->title_3;
@endphp

@if ($head)
  <h2 class="text-primary text-2xl font-bold text-center mb-8">{{ $head }}</h2>
@endif

@foreach ($products as $product)
  @php
    $imgNames = [];
    foreach ($product->productImages as $image) {
        $imgNames[] = $image->img_name;
    }
  @endphp

  @if (!empty($imgNames))
    <div class="mb-6">
      @include("$template.components.carousel", [
          'images' => $imgNames,
          'discount' => $discount,
      ])
    </div>
  @endif

  <div class="grid grid-cols-[1fr,auto] gap-1 items-start">
    <h3 class="text-xl font-bold border-l-4 px-2 border-primary">{{ $product->name }}</h3>
    <div class="flex gap-3 items-end">
      <div class="bg-primary rounded-md inline-block py-1 px-2 text-white text-sm font-bold">-{{ $discount }}%
      </div>
      <div>
        <div class="line-through text-right">{{ $price }}грн.</div>
        <div class="font-bold text-2xl">{{ $d_price }}грн.</div>
      </div>
    </div>
  </div>
  @isset($product->productFeatures)
    <table class="product-info-table mt-6 w-full">
      <tbody>
        @foreach ($product->productFeatures as $feature)
          <tr class="odd:bg-backplate">
            <th class="align-top px-2 py-3 align-top">
              <div class="whitespace-nowrap flex gap-2 items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"
                  class="lucide lucide-check-square">
                  <path d="m9 11 3 3L22 4" />
                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                </svg>
                <span class="title">{{ $feature->name }}:</span>
              </div>
            </th>
            <td class="pl-4 w-full px-2 py-3">{{ $feature->value }}</td>
          </tr>
        @endforeach
      </tbody>
    </table>
  @endisset
  <div class="text-center mt-8">
    <button type="button" class="h-16 px-8 text-xl text-white bg-primary ring-4 focus:outline-none ring-primary/25 font-bold text-center me-2 my-2 rounded-full hover:bg-primary-darker">Залишити замовлення</button>
  </div>
@endforeach
