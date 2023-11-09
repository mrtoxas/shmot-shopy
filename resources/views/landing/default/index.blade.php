@php
  $template = 'landing.default';
@endphp

@extends('landing')

@section('head')
  <title>{{ $landingSettings->meta_title }}</title> 
  <meta name="description" content={{ $landingSettings->meta_description }}> 
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&family=Roboto&display=swap" rel="stylesheet">
  <link href="{{ asset('templates/default/css/swiper-bundle.min.css') }}" rel="stylesheet">
  <link href="{{ asset('templates/default/css/main.css') }}" rel="stylesheet">
@endsection

  @section('content')
    <div class="bg-secondary h-full">
      <div class="max-w-6xl mx-auto font-montserrat pt-4 grid grid-cols-2 gap-4">
        <!-- @include("$template.components.header") -->

        @include("{$template}.components.carousel")
        @include("{$template}.components.mainInfo")
      </div>
    </div>
  @endsection


@section('scripts')
    <script src="{{ asset('templates/default/js/swiper-bundle.min.js') }}"></script>
    <script src="{{ asset('templates/default/js/main.js') }}"></script>
@endsection
