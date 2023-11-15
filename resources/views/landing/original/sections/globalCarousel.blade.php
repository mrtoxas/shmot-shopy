@php
$imgNames = [];
	foreach($products as $product){
	  $images = $product->productImages;
	  foreach($images as $image){
	    $imgNames[] = $image->img_name;
	}
}
@endphp

<div>
    @include("$template.components.carousel", [
      'images' => $imgNames
    ])
</div>