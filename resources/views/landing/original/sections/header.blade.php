@isset($landingCollection)
<header class="grid gap-1">
  @if ($landingCollection->title)
  <div class="bg-primary py-4">
    <h1 class="text-white text-3xl font-bold text-center">{{$landingCollection->title}}</h1>
  </div>
    @if ($landingCollection->subtitle)
    <div class="py-4">
      <h2 class="text-primary text-2xl font-bold text-center">{{$landingCollection->subtitle}}</h2>
    </div>
    @endif
  @endif
</header>
@endisset
