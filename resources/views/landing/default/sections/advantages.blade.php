@php
if(!isset($advantage) || !count($advantage)){
  return;
}
$title_4 = $landingSettings->title_4 ?? '';
$title_5 = $landingSettings->title_5 ?? '';
@endphp

<div>
  <h2 class="text-center text-xl font-bold">{{$title_4}} - <span class="text-primary">{{$title_5}}</span></h2>
<div class="grid grid-cols-3 gap-12 px-4 mt-12">
  @foreach ($advantage as $index => $item)
  <div>
    <figure class="grid gap-2 text-center font-medium text-sm">
      <img src="images/landings/{{$landingId}}/advantages/{{$item->img_name}}" class='object-cover h-full w-full aspect-square display-block' alt="Product image">
      <figcaption class="px-1">{{$item->caption}}</figcaption>
    </figure>
  </div>
  @endforeach
</div>
</div>