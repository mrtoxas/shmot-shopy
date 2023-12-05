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
  <div class="mt-4">
    @include("$template.sections.pageTags")
  </div>
  <div class="flex flex-col gap-14 mt-6">    
    @include("$template.sections.globalProductCard")
    @include("$template.sections.advantages")
    @include("$template.sections.expiration")
    @include("$template.sections.products")
    @include("$template.sections.reviews")
    <div class="mt-1">
      @include("$template.sections.rest")
    </div>
    @include("$template.sections.form")
    
    <div class="mt-4">
      @include("$template.sections.footer")
    </div>
  </div>
  

@endsection
