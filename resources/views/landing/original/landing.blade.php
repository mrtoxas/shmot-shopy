@php
$template = "landing.$templateName";
@endphp
@extends('landing.original.index')
@section('template_head')
<title>{{ $landingSettings->meta_title }}</title>
<meta name="description" content="{{ $landingSettings->meta_description }}">
@endsection
@section('template_content')
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
@endsection
