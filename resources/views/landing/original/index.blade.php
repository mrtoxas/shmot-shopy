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
<link href='{{ asset("templates/$templateName/app.css") }}' rel="stylesheet">
@endsection
@section('content')
<div class="h-full font-montserrat">
  <div class="max-w-[546px] mx-auto">
    <header>
      @include("$template.sections.header")
    </header>
    <main>
      @include("$template.sections.globalCarousel")
      <section class="mt-12" aria-label="Цiна зi знижкою">
        @include("$template.sections.price")
      </section>
      <section class="mt-12" aria-label="Переваги">
        @include("$template.sections.advantages")
      </section>
      <section class="mt-12" aria-label="Термін дії акцiї">
        @include("$template.sections.expiration")
      </section>
      <section class="mt-12" aria-label="Термін дії акцiї">
        @include("$template.sections.products")
      </section>
      <section class="mt-12">
        @include("$template.sections.reviews")
      </section>
      <section class="mt-12">
        @include("$template.sections.delivery")
      </section>
      <section class="mt-12">
        @include("$template.sections.action")
      </section>
      <section class="mt-12" aria-label="Переваги">
        @include("$template.sections.advantages")
      </section>
      <section class="mt-12" aria-label="Термін дії акцiї">
        @include("$template.sections.expiration")
      </section>
      <section class="mt-12" aria-label="Форма замовлення">
        @include("$template.sections.form")
      </section>      
      <section aria-label="Залишок товару">
        @include("$template.sections.rest")
      </section>
    </main>
    <footer>
      @include("$template.sections.footer")
    </footer>
    <div>
      {{-- @include("$template.sections.globalCarousel") --}}
    </div>
  </div>
</div>
@endsection
@section('scripts')
<script src='{{ asset("templates/$templateName/app.js") }}'></script>
@endsection
