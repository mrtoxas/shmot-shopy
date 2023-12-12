@php
if (!$reviews) {
  return;
}
@endphp
<div>
  <h2 class="text-center text-xl font-bold">ВІДГУКИ <span class="text-primary">ПОКУПЦІВ</span></h2>
  <div class="grid grid-cols-3 gap-4 mt-6">
    @foreach ($reviews as $index => $review)  
    <div class="bg-white rounded-sm px-4 py-6 flex flex-col gap-4">
      <div class="flex justify-center">
        <img src="images/reviews/{{$review->img}}.jpg" class="rounded-full w-20 h-20" width="82" height="82" alt="review 1">
      </div>
      <div class="text-center">
        <div class="text-sm"><strong>{{$review->name}}</strong></div>
        <div class="text-sm">{{$review->info}}</div>
      </div>
      {{-- <div class="text-sm">{{ Carbon\Carbon::now()->subDays($index+1)->format('d.m.Y') }}</div> --}}
      <p>{{$review->review}}</p>      
    </div>
    @endforeach
  </div>
  
</div>
