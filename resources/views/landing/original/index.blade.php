@php
  $templateJson = json_decode(
    file_get_contents(
    resource_path('views/landing/original/template.json')
    ), true
  );

  $templateName = $templateJson["name"];
  $templateVariables = $templateJson["variables"] ?? [];
  $userVariables = json_decode($landingSettings->template_settings, true);
  
  $landingVariables = isset($userVariables) ? $userVariables : $templateVariables;  
@endphp
@extends('landing')
@section('head')
  <meta name="viewport" content="width=546">
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&family=Roboto&display=swap" rel="stylesheet">
  <link href='{{ asset("templates/$templateName/app.css") }}' rel="stylesheet">
  <meta property="og:image" content="fav/apple-touch-icon.png">
  <meta property="og:image:width" content="180">
  <meta property="og:image:height" content="180">
  <link rel="apple-touch-icon" sizes="180x180" href="fav/apple-touch-icon.png">
  <link rel="icon" type="image/png" sizes="32x32" href="fav/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="fav/favicon-16x16.png">
  <link rel="manifest" href="fav/site.webmanifest">
  <link rel="mask-icon" href="fav/safari-pinned-tab.svg" color="#5bbad5">
  <meta name="msapplication-TileColor" content="#da532c">
  <meta name="theme-color" content="var(--primary)" />
  <style>
    :root{
      @foreach($landingVariables as $variable)
        --{{$variable["name"]}}: {{$variable["value"]}};
      @endforeach
    }
  </style>
  @yield('template_head')
@endsection
@section('content')
<div class="h-full font-montserrat">
  <div class="max-w-[546px] mx-auto">
    @yield('template_content')
  </div>
</div>
@endsection
@section('scripts')
<script src='{{ asset("templates/$templateName/app.js") }}'></script>
@endsection
