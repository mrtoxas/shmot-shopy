@php
  /* $templateSettings, $landingSettings, $templateName - get from page props */
  
  $current_url =  url()->to('/');
  $fbPixelKey = $landingSettings->fb_pixel_key ?? null;
@endphp

@extends('landing')

@section('head')
  <meta name="viewport" content="width=768">
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&family=Roboto&display=swap" rel="stylesheet">
  <link href='{{ asset("templates/$templateName/app.css") }}' rel="stylesheet">   
  <meta property="og:image" content="{{$current_url}}/images/ogg.jpg">
  <link rel="apple-touch-icon" sizes="180x180" href="{{$current_url}}/fav/apple-touch-icon.png">
  <link rel="icon" type="image/png" sizes="32x32" href="{{$current_url}}/fav/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="{{$current_url}}/fav/favicon-16x16.png">
  <link rel="manifest" href="{{$current_url}}/fav/site.webmanifest">
  <link rel="mask-icon" href="{{$current_url}}/fav/safari-pinned-tab.svg" color="#5bbad5">
  <meta name="msapplication-TileColor" content="#da532c">
  <meta name="theme-color" content="var(--primary)" />

  @if($fbPixelKey)
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
    <div class="md:max-w-[768px] mx-auto px-4 py-4">
      @yield('template_content')
    </div>
  </div>
@endsection
@section('scripts')
<script src='{{ asset("templates/$templateName/app.js") }}'></script>
@endsection
