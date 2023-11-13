<div class="flex justify-around">
  @isset($advantage)
  @foreach ($advantage as $item)
  <div>
    <img width="200" height="200" src="storage/images/{{ $item->img_name }}" class="object-cover w-[200px] h-[200px]" alt="{{$item->caption}}" />
    <div class="font-bold w-full text-center mt-4 px-2">{{ $item->caption }}</div>
  </div>
  @endforeach
  @endisset
</div>
