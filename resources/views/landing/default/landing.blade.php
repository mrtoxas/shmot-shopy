@php
  if(!$landingSettings->is_pub){
    @abort(404);
  }
  $template = "landing.$templateName";

  if(!$template) {
    echo('Error: Template not found');
    exit();
  }
  
@endphp

@extends($template . '.index')
@section('template_head')
  <title>{{ $landingSettings->meta_title }}</title>
  <meta property="og:title" content="{{ $landingSettings->meta_title }}">
  <meta property="og:description" content="{{ $landingSettings->meta_description }}">
  <meta property="og:type" content="product.group">
  <meta property="og:url" content="{{"https://" . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI']}}">
  <meta property="og:image" content="fav/apple-touch-icon.png">
  <meta property="product:original_price:amount" content="{{$globalProduct->price}}">
  <meta property="product:original_price:currency" content="UAH">
  <meta property="product:price:amount" content="{{$globalProduct->price - ($globalProduct->discount / 100) * $globalProduct->price}}">
  <meta property="product:price:currency" content="UAH">
  <meta name="description" content="{{ $landingSettings->meta_description }}">
@endsection
@section('template_content')
  <div class="mt-4">
    @include("$template.sections.pageTags")
  </div>
  <div class="flex flex-col gap-14 mt-6">    
    @include("$template.sections.globalProductCard")
    @include("$template.sections.advantages")
    @include("$template.sections.expiration")
    @include("$template.sections.products")
    @include("$template.sections.reviews")
    @include("$template.sections.howToOrder")    
    <div class="mt-1">
      @include("$template.sections.rest")
    </div>
    @include("$template.sections.form")
    
    <div class="mt-4">
      @include("$template.sections.footer")
    </div>
  </div>
  @include("$template.sections.loader")
  

@endsection
