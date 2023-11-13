@php
	$sizes = [];

  if ($globalProduct->sizes !== null) {
    $sizes = explode(",", $globalProduct->sizes);
  }
@endphp


<form>
	<div class="p-4">
		<div>
			<label class="block text-gray-700 text-sm font-bold mb-2" for="password">
        Iм'я
    </label>
    <input type="text" placeholder="Вкажiть ваше iм'я" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline">
		</div>
		<div>
			<label class="block text-gray-700 text-sm font-bold mb-2" for="password">
        Телефон
    </label>
    <input type="text" placeholder="Вкажiть ваш телефон" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline">
		</div>
		<div>
			<label class="block text-gray-700 text-sm font-bold mb-2" for="password">
        Варiант
    </label>
		<select name="" id="" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline">
			<option value="" selected disabled>Оберiть варiант</option>
			@foreach ($products as $product)
		    @foreach ($product->productVariants as $variant)
		    	<option value="{{$variant->name}}">{{$product->name}}-{{$variant->value}}</option>
		    @endforeach
			@endforeach
		</select>
		</div>
		@if (!empty($sizes))
			<div>
				<label class="block text-gray-700 text-sm font-bold mb-2" for="password">
	        Розмiр
	    	</label>
				<select name="" id="" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline">
					<option value="" selected disabled>Оберiть розмiр</option>
					@foreach ($sizes as $size)
        		<option value="{{ $size }}">{{ $size }}</option>
    			@endforeach
				</select>
			</div>
		@endif
	</div>
</form>