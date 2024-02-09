@php
  /* $templateSettings, $landingSettings, $templateName - get from page props */
  
  $current_url =  url()->to('/');
@endphp

@extends('landing')

@section('head')
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&family=Roboto&display=swap" rel="stylesheet">
  <link href='{{ asset("templates/$templateName/app.css") }}' rel="stylesheet" async>
  <meta property="og:image" content="{{$current_url}}/images/ogg.jpg">
  <link rel="apple-touch-icon" sizes="180x180" href="{{$current_url}}/fav/apple-touch-icon.png">
  <link rel="icon" type="image/png" sizes="32x32" href="{{$current_url}}/fav/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="{{$current_url}}/fav/favicon-16x16.png">
  <link rel="manifest" href="{{$current_url}}/fav/site.webmanifest">
  <link rel="mask-icon" href="{{$current_url}}/fav/safari-pinned-tab.svg" color="#5bbad5">
  <meta name="msapplication-TileColor" content="#da532c">
  <meta name="theme-color" content="var(--primary)" />

  <style>
    @if(isset($templateSettings))
    :root{
      @foreach($templateSettings as $variable)
        --{{$variable["name"]}}: {{$variable["value"]}};
      @endforeach
    }
    @endif
  </style>
  @yield('template_head')
@endsection
@section('content')
  <div class="bg-backplate min-h-screen font-montserrat">
    <div class="md:max-w-[768px] mx-auto py-4">
      @yield('template_content')
    </div>
  </div>
@endsection
@section('scripts')
<script src='{{ asset("templates/$templateName/app.js") }}'></script>
@endsection
