@php
$template = 'landing.default';
@endphp
@extends('landing')
@section('head')
<title>{{ $landingSettings->meta_title }}</title>
<meta name="description" content={{ $landingSettings->meta_description }}>
<!-- <meta name="viewport" content="width=546"> -->
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&family=Roboto&display=swap" rel="stylesheet">
<link href="{{ asset('templates/default/css/swiper-bundle.min.css') }}" rel="stylesheet">
<link href="{{ asset('templates/default/css/main.css') }}" rel="stylesheet">
@endsection
@section('content')
<div class="bg-secondary h-full font-montserrat">
  <div class="max-w-[422px] md:max-w-[768px] mx-auto px-4">
    <!-- mx-auto font-montserrat -->
    <div class="pt-4">
      @include("$template.components.pageTags", [
        'tags' => [
          "КОЛЕКЦIЇ",
          "РОЗПРОДАЖ",
          "СПОРТИВНИЙ ОДЯГ"
        ]
      ])
    </div>
    <div class="pt-4">
      @include("$template.components.globalProductCard")
    </div>
    <div class="pt-8">
      @include("$template.components.productCards")
    </div>
  </div>
</div>
@endsection

@section('scripts')
<script src="{{ asset('templates/default/js/swiper-bundle.min.js') }}"></script>
<script src="{{ asset('templates/default/js/main.js') }}"></script>
@endsection

{{--
@include("$template.components.globalProductCard", [
'price' => $globalProduct->price,
'discount' => $globalProduct->discount
])
@include("$template.components.productCards")
@include("$template.components.header")
@include("{$template}.components.carousel")
@include("{$template}.components.formOrder")
@include("$template.components.globalAdvantages")
--}}
