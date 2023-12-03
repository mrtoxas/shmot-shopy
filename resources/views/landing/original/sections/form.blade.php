<form action="{{ route('order') }}" method="POST" class="w-2/3 space-y-6 mx-auto" id="orderForm">
  @csrf
  <select class="px-4 py-4 rounded-sm w-full" aria-label="Товар" name="variant" required>
    <option value="" selected disabled>Оберiть товар</option>
    @foreach($products as $product)
      @foreach($product->productVariants as $variant)
        @php
          $value = json_encode(
            [
              "productArticle"  => $product->article,
              "productName"     => $product->name,
              "variantName"     => $variant->name,
              "variantValue"    => $variant->value,
            ]
          );
        @endphp
        <option value="{{$value}}">{{$variant->name}}</option>
      @endforeach
    @endforeach
  </select>
  @isset($globalProduct->sizes)
    <select class="px-4 py-4 rounded-sm w-full" aria-label="Розмiр" name="size" required>
      <option value="" selected disabled>Оберiть розмiр</option>
        @php
          $sizes = explode(",", $globalProduct->sizes);
        @endphp
        @foreach($sizes as $size)
          <option value="{{trim($size)}}">{{trim($size)}}</option>
        @endforeach
    </select>
  @endisset
  <input class="px-4 py-4 rounded-sm w-full" placeholder="Вкажiть Вашi ПIБ" aria-label="ПIБ" name="name" required/>
  <input id="phone" class="px-4 py-4 rounded-sm w-full" placeholder="Вкажiть контактий телефон" aria-label="Телефон" name="phone" required/>
  <div class="text-center">
    <button type="submit" class="h-16 px-6 text-white bg-primary ring-4 focus:outline-none ring-gray-300 font-bold text-center me-2 my-2 rounded-full hover:bg-primary-darker">Залишити замовлення</button>
  </div>
</form>