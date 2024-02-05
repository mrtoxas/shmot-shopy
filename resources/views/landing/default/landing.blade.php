@php
  if(!$landingSettings->is_pub){
    @abort(404);
  }
  $template = "landing.$templateName";  

  if(!$template) {
    echo('Error: Template not found');
    exit();
  }

  $production = env('APP_ENV') === 'production';
  $googleTagId = $landingSettings->g_tag_id ?? null;
  $fbPixelKey = $landingSettings->fb_pixel_key ?? null;
@endphp

@extends($template . '.index')
@section('template_head')

  @if($googleTagId && $production)
  <!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=<?= $googleTagId ?>"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '<?= $googleTagId ?>', {'cookie_domain': 'auto', 'cookie_flags': 'SameSite=None;Secure'});
  </script>
  <!-- END Google tag (gtag.js) -->
  @endif

  @if($fbPixelKey && $production)
  <!-- Meta Pixel Code --> 
  <script> 
    !function(f,b,e,v,n,t,s) 
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod? 
    n.callMethod.apply(n,arguments):n.queue.push(arguments)}; 
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0'; 
    n.queue=[];t=b.createElement(e);t.async=!0; 
    t.src=v;s=b.getElementsByTagName(e)[0]; 
    s.parentNode.insertBefore(t,s)}(window, document,'script', 
    'https://connect.facebook.net/en_US/fbevents.js'); 
    fbq('init', '<?= $fbPixelKey ?>'); 
    fbq('track', 'PageView'); 
  </script> 
  <noscript><img height="1" width="1" style="display:none" 
    src="https://www.facebook.com/tr?id=<?= $fbPixelKey ?>&ev=PageView&noscript=1" 
  /></noscript> 
  <!-- End Meta Pixel Code -->
  @endif

  <title>{{ $landingSettings->meta_title }}</title>
  <meta property="og:title" content="{{ $landingSettings->meta_title }}">
  <meta property="og:description" content="{{ $landingSettings->meta_description }}">
  <meta property="og:type" content="product.group">
  <meta property="og:url" content="{{'https://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI']}}">
  <meta property="og:image" content="fav/apple-touch-icon.png">
  <meta property="product:original_price:amount" content="{{$globalProduct->price}}">
  <meta property="product:original_price:currency" content="UAH">
  <meta property="product:price:amount" content="{{$globalProduct->price - ($globalProduct->discount / 100) * $globalProduct->price}}">
  <meta property="product:price:currency" content="UAH">
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
    @include("$template.sections.howToOrder")    
    <div class="mt-1">
      @include("$template.sections.rest")
    </div>
    @include("$template.sections.form")
    
    <div class="mt-4">
      @include("$template.sections.footer")
    </div>
  </div>
  @include("$template.sections.loader")
  

@endsection
