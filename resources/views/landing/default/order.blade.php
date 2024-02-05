@php
  /* $templateName - get from page props */
  $production = env('APP_ENV') === 'production';
  $googleTagId = $landingSettings->g_tag_id ?? null;
  $fbPixelKey = $landingSettings->fb_pixel_key ?? null;
@endphp

@extends('landing.' . $templateName . '.index')

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

<title>Вiтання!</title>
@endsection
@section('template_content')
<div class="py-6">
  <div class="flex justify-center">
    <img src="templates/{{$templateName}}/images/party.png" alt="Поздравляем!" width="150" height="150">
  </div>
  <h1 class="font-bold text-center mt-4">Ваше замовлення прийнято!</h2>
    <p class="py-6">Чекайте на дзвінок нашого оператора для підтвердження Вашого замовлення найближчим часом. Будь ласка, переконайтеся, що Ваш контактний телефон увімкнено та правильно вказано.</p>
    <p class="font-bold">Деталі замовлення:</p>
    <table class="mt-2">
      <tr>
        <td class="pr-4">Ім'я:</td>
        <td>
          {{$name}}
        </td>
      </tr>
      <tr>
        <td class="pr-4">Телефон:</td>
        <td>
          {{$phone}}
        </td>
      </tr>
      <tr>
        <td class="pr-4">Замовлення:</td>
        <td>
          {{$productName}} - {{$variantName}}
        </td>
      </tr>
      <tr>
        <td class="pr-4">Розмір:</td>
        <td>
          {{$size}}
        </td>
      </tr>
    </table>
    <div class="mt-6">
      <p>Здійснивши замовлення на нашому сайті будь-якого товару, Ви погоджуєтесь отримати смс-повідомлення про доставку
        купленого Вами товару у відповідне поштове відділення, згідно з вказаним Вами індексом.</p>
      <p class="py-4">
        <a class="text-blue-600 hover:underline" href="privacy.html" target="_blank" rel="noopener noreferrer">Політика конфіденційності</a>
      </p>
      <p>
        <a class="text-blue-600 hover:underline" href="./">Повернутись на сайт</a>
      </p>
    </div>
</div>
@endsection
