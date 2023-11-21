@if (isset($landingSettings->title_4))
  <div class="bg-primary py-4 text-white text-xl font-bold text-center">
    {{ $landingSettings->title_4 }}
  </div>
@endif
@if (isset($landingSettings->title_5))
  <div class="text-primary py-4 text-xl font-bold text-center">
    {{ $landingSettings->title_5 }}
  </div>
@endif
