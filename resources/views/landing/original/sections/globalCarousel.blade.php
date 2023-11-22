@php

if (!isset($products)) return;

$imgNames = [];
	foreach($products as $product){
	  $images = $product->productImages;
	  foreach($images as $image){
	    $imgNames[] = $image->img_name;
	}
}

if (empty($imgNames)) return;
@endphp

@include("$template.components.carousel", [
	'images' => $imgNames,
	'discount' => $globalProduct->discount
])