@php
  if (isset($landingSettings)) {
      $title_1 = $landingSettings->title_1;
      $title_2 = $landingSettings->title_2;
  } else {
      return;
  }
@endphp

@isset($landingSettings)
  <header class="grid gap-1">
    @if ($title_1)
      <div class="bg-primary py-4">
        <h1 class="text-white text-3xl font-bold text-center">{{ $title_1 }}</h1>
      </div>
      @if ($title_2)
        <div class="py-4">
          <h2 class="text-primary text-2xl font-bold text-center">{{ $title_2 }}</h2>
        </div>
      @endif
    @endif
  </header>
@endisset
