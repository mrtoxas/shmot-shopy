@php
  $templateJson = json_decode(
    file_get_contents(
    resource_path('views/landing/original/template.json')
    ), true
  );

  $templateName = $templateJson["name"];
  $templateVariables = $templateJson["variables"] ?? [];
  $userVariables = json_decode($landingSettings->template_settings);
@endphp
@extends('landing')
@section('head')
  <meta name="viewport" content="width=546">
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&family=Roboto&display=swap" rel="stylesheet">
  <link href='{{ asset("templates/$templateName/app.css") }}' rel="stylesheet">
  <style>
    :root{
      @foreach($userVariables as $key => $value)
        --{{$key}}: {{$value}};
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
