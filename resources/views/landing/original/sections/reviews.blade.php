@php
if (!$reviews) {
  return;
}
@endphp
<h2 class="text-center text-2xl font-bold">ВІДГУКИ <span class="text-primary">ПОКУПЦІВ</span></h2>
<div class="grid pap-4 mt-6">
  @foreach ($reviews as $index => $review)  
  <div>
    <div class="grid grid-cols-[auto,1fr,auto] gap-8 items-center">
      <div>
        <img src="templates/{{$templateName}}/images/review{{$review->img}}.jpg" class="rounded-full w-16" width="64" height="64" alt="review 1">
      </div>
      <div>
        <div>
          <div class="text-sm"><strong>{{$review->name}}</strong></div>
          <div class="text-sm">{{$review->info}}</div>
        </div>
      </div>
      <div class="text-sm">{{ Carbon\Carbon::now()->subDays($index+1)->format('d.m.Y') }}</div>
    </div>
    <div class="pl-24">
      <p>{{$review->review}}</p>
    </div>
  </div>
  @endforeach
</div>
