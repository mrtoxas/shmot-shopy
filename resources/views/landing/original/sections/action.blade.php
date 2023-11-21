@if(isset($collection->action_title))
<div class="bg-primary py-4 text-white text-xl font-bold text-center">
  {{$collection->action_title}}
</div>
@endif
@if(isset($collection->action_subtitle))
<div class="text-primary py-4 text-xl font-bold text-center">
  {{$collection->action_subtitle}}
</div>
@endif