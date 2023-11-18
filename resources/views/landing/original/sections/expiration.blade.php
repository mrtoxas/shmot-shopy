@php
$start_date = date('d.m.Y', strtotime('-2 days'));
$end_date = date('d.m.Y', strtotime('+8 days'));
$rest = $globalProduct->rest;
@endphp

<section class="mt-6">
  <div class="bg-secondary py-5 text-center text-white flex flex-col gap-1">
    <p class="font-bold">Пропозиція дійсна з {{$start_date}} по {{$end_date}}</p>
    @if($rest)
      <p>Залишилось <strong>{{$rest}} шт.</strong> по акції</p>
    @endisset
  </div>
</section>