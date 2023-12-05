<form action="{{ route('order') }}" method="POST" class="w-2/3 mx-auto flex flex-col gap-4" id="orderForm">
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
  <div class="text-center mt-2">
    <button type="submit" class="bg-black hover:bg-gray-700 text-white font-bold py-4 px-6 rounded-full ring-white ring-2">Залишити замовлення</button>    
  </div>
</form>