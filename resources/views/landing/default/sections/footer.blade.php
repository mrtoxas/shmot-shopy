@php
   $url = $siteUrl = $_SERVER['HTTP_HOST'];
   $year = date('Y');
@endphp

<div class="py-4 text-center bg-backplate grid gap-1 text-sm px-4">
  <div>{{$siteUrl}}, {{$year}} </div>
  <a class="text-grey-600 hover:underline" href="#">Політика конфіденційності</a>
</div>
