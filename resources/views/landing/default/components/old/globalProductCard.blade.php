@php
$discountAmount = ($discount / 100) * $globalProduct->price;
$discountedPrice = $globalProduct->price - $discountAmount;

@endphp
<div class="grid md:grid-cols-2 gap-4">
  <div class="min-w-0 w-full max-h-96">
    @include("{$template}.components.carousel")
  </div>
  <div class="bg-white rounded-sm py-4 px-4 min-w-0 w-full">
    <div class="font-bold text-xl">{{ $landingSettings->meta_title }}</div>
    <div class="mt-2">
      @include("{$template}.components.starRating")
    </div>
    <div class="mt-6 flex items-center">
      <div class="text-3xl font-bold">{{ $discountedPrice }} грн.</div>
      <div class="line-through ml-4 text-slate-400 text-2xl">{{$price}} грн.</div>
    </div>
    <div class="text-sm text-gray-400 mt-2">
      Знижка {{ $discount }}%, дiйсна до 20.11.2023
    </div>
    <div class="mt-6">
      <div class="font-bold">Опис коллекцiї</div>
      <p class="text-sm">Далеко-далеко за словесними горами в країні голосних і приголосних живуть рибні тексти. Текст скотився, підступних смажених, пустився, буквоград рекламних свого одного разу знову, за що переписали? Семантика погляд сумний мовного, вони рибними, життя!</p>
    </div>
    <div class="mt-6">
      <button class="bg-black text-sm hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full">
        Зробити замовлення
      </button>
    </div>
  </div>
</div>
