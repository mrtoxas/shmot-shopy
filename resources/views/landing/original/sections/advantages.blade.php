@if(isset($advantage))
<div class="grid grid-cols-3 gap-6 mt-8">
  @foreach ($advantage as $index => $item)
  <div>
    <figure class="grid gap-2 text-center font-medium text-sm">
      <img width="166" height='44' src="storage/landings/{{$landingId}}/advantages/{{$item->img_name}}" class='{{$index === 1 ? "h-52" : "h-44"}} object-cover display-block' alt="Product image">
      <figcaption class="px-1">{{$item->caption}}</figcaption>
    </figure>
  </div>
  @endforeach
</div>
@endif