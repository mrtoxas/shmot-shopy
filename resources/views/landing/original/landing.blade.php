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
<meta name="description" content="{{ $landingSettings->meta_description }}">
@endsection
@section('template_content')
<header>
  @include("$template.sections.header")
</header>
<main class="flex flex-col gap-12">
  @include("$template.sections.globalCarousel")
  <section aria-label="Цiна зi знижкою">
    @include("$template.sections.price")
  </section>
  <section aria-label="Переваги">
    @include("$template.sections.advantages")
  </section>
  <section aria-label="Термін дії акцiї">
    @include("$template.sections.expiration")
  </section>
  <section aria-label="Термін дії акцiї">
    @include("$template.sections.products")
  </section>
  <section>
    @include("$template.sections.reviews")
  </section>
  <section>
    @include("$template.sections.delivery")
  </section>
  <section>
    @include("$template.sections.action")
  </section>
  <section aria-label="Переваги">
    @include("$template.sections.advantages")
  </section>
  <section aria-label="Термін дії акцiї">
    @include("$template.sections.expiration")
  </section>
  <section aria-label="Форма замовлення">
    @include("$template.sections.form")
  </section>
  <section aria-label="Залишок товару">
    @include("$template.sections.rest")
  </section>
</main>
<footer>
  @include("$template.sections.footer")
</footer>

@include("$template.sections.loader") 

@endsection
