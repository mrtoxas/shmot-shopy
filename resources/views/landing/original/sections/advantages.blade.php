@if(isset($advantage))
<div class="grid grid-cols-3 gap-6 mt-8">
  @foreach ($advantage as $item)
  <div>
    <figure class="grid gap-2 text-center font-medium   text-sm">
      <img src="storage/images/{{$item->img_name}}" class="w-[166px] h-[166px] object-cover" alt="">
      <figcaption class="px-1">{{$item->caption}}</figcaption>
    </figure>
  </div>
  @endforeach
</div>
@endif