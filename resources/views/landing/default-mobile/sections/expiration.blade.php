@php
$start_date = date('d.m.Y', strtotime('-2 days'));
$end_date = date('d.m.Y', strtotime('+8 days'));
$title = $landingSettings->title_2 || '';
$title = $landingSettings->title_2 ?? '';
$discount = $globalProduct->discount ?? '';
$rest = $globalProduct->rest ?? '';
@endphp

<section>
  <div class="px-4">
    <div class="bg-white p-4">
      <div class="text-center flex flex-col gap-1 border p-4 border-backplate">
        <div>
          <div class="font-bold text-secondary text-xl">{{$title}}</div>
          <div class="font-bold text-primary text-3xl mt-4">Знижка {{$discount}}%</div>
        </div>    
        <p class="font-bold mt-4">Пропозиція дійсна з {{$start_date}} по {{$end_date}}</p>
        <p>Залишилось <strong><span class="bg-primary font-bold rounded-md inline-block px-2 mb-1 text-white text-sm">{{$rest}} шт.</span></strong> по акції</p>
      </div>
    </div>
  </div>
</section>