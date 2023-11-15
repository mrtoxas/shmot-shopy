@php
  $template = "landing.$templateName";  
  $templateJson = json_decode(
    file_get_contents(
      resource_path('views/landing/original/template.json')
    ), true
  );

  $templateVariables = $templateJson["variables"] ?? [];
  $userVariables = $landingSettings->template_settings ?? [];
@endphp
@extends('landing')
@section('head')
<meta name="viewport" content="width=546">
<title>{{ $landingSettings->meta_title }}</title>
<meta name="description" content="{{ $landingSettings->meta_description }}">
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&family=Roboto&display=swap" rel="stylesheet">
<link href='{{ asset("templates/$templateName/css/swiper-bundle.min.css") }}' rel="stylesheet">
<link href='{{ asset("templates/$templateName/css/main.css") }}' rel="stylesheet">
<style>
    :root{{!! implode(' ', array_map(function ($key, $value) {
        return sprintf('--%s: %s;', str_replace('_', '-', $key), trim($value));
    }, array_keys($templateVariables), $templateVariables)) !!}}
</style>

@endsection
@section('content')
<div class="bg-secondary h-full font-montserrat">
    <div class="max-w-[546px] mx-auto">
      <header>
        @include("$template.sections.header")
      </header>
      <div>
        @include("$template.sections.globalCarousel")
      </div>
      <div>
        @include("$template.sections.priceSkew")
      </div>

    </div>
    
</div>
@endsection

@section('scripts')
<script src='{{ asset("templates/$templateName/js/swiper-bundle.min.js") }}'></script>
<script src='{{ asset("templates/$templateName/js/main.js") }}'></script>
@endsection