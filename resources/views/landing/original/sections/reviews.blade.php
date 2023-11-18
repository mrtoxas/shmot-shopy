@php
$review1_date = date('d.m.Y', strtotime('-1 days'));
$review2_date = date('d.m.Y', strtotime('-2 days'));
$review3_date = date('d.m.Y', strtotime('-3 days'));
@endphp
<h2 class="text-center text-2xl font-bold">ВІДГУКИ <span class="text-primary">ПОКУПЦІВ</span></h2>
<div class="grid pap-4 mt-6">
  <!-- item -->
  <div>
    <div class="grid grid-cols-[auto,1fr,auto] gap-8 items-center">
      <div>
        <img src="templates/{{$templateName}}/images/review1.jpg" class="rounded-full w-16" width="64" height="64" alt="review 1">
      </div>
      <div>
        <div>
          <div class="text-sm"><strong>Марія Коваленко</strong></div>
          <div class="text-sm">27 років, м. Черкаси</div>
        </div>
      </div>
      <div class="text-sm">{{$review1_date}}</div>
    </div>
    <div class="pl-24">
      <p>Взяла на подарунок хлопцеві, він спортсмен. Реакція була неймовірна, йому костюм сподобався. Планую взяти ще один батьку. Дякую вам, порадувала ціна та якість</p>
    </div>
  </div>
  <!-- END item -->
  <div class="my-6 border-b-[1px] border-primary-lighter"></div>
  <!-- item -->
  <div>
    <div class="grid grid-cols-[auto,1fr,auto] gap-8 items-center">
      <div>
        <img src="templates/{{$templateName}}/images/review2.jpg" class="rounded-full w-16" width="64" height="64" alt="review 2">
      </div>
      <div>
        <div>
          <div class="text-sm"><strong>Григорій Бабенко</strong></div>
          <div class="text-sm">29 років, м. Чернігів</div>
        </div>
      </div>
      <div class="text-sm">{{$review2_date}}</div>
    </div>
    <div class="pl-24">
      <p>Не сильно люблю багато речей в шафі, але такий костюм це просто мастхев для всіх чоловіків. Дякую за швидку відправку</p>
    </div>
  </div>
  <!-- END item -->
  <div class="my-6 border-b-[1px] border-primary-lighter"></div>
  <!-- item -->
  <div>
    <div class="grid grid-cols-[auto,1fr,auto] gap-8 items-center">
      <div>
        <img src="templates/{{$templateName}}/images/review3.jpg" class="rounded-full w-16" width="64" height="64" alt="review 2">
      </div>
      <div>
        <div>
          <div class="text-sm"><strong>Петро Шкуренко</strong></div>
          <div class="text-sm">32 роки, м. Київ</div>
        </div>
      </div>
      <div class="text-sm">{{$review3_date}}</div>
    </div>
    <div class="pl-24">
      <p>Взяв собі для спортзалу, дуже зручний при виконанні вправ, а також чудово дихає!</p>
    </div>
  </div>
  <!-- END item -->
</div>
