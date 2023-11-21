@if(isset($advantage))
<div class="grid grid-cols-3 gap-6 mt-8">
  @foreach ($advantage as $index => $item)
  @php
    $imageHeight = ($index === 1) ? 218 : 175;
  @endphp
  <div>
    <figure class="grid gap-2 text-center font-medium text-sm">
      <img width="166px" height='{{$imageHeight}}px' src="storage/images/{{$item->img_name}}" class='h-[{{$imageHeight}}px] object-cover display-block' alt="Product image">
      <figcaption class="px-1">{{$item->caption}}</figcaption>
    </figure>
  </div>
  @endforeach
</div>
@endif