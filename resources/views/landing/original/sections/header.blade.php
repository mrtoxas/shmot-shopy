@isset($collection)
<header class="grid gap-1">
  @if ($collection->title)
  <div class="bg-primary py-4">
    <h1 class="text-white text-3xl font-bold text-center">{{$collection->title}}</h1>
  </div>
    @if ($collection->subtitle)
    <div class="py-4">
      <h2 class="text-primary text-2xl font-bold text-center">{{$collection->subtitle}}</h2>
    </div>
    @endif
  @endif
</header>
@endisset
