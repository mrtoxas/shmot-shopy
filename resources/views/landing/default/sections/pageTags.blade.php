@php
  $title_1 = strtoupper($landingSettings->title_1);
  $pageTags = ["КОЛЕКЦIЇ", "РОЗПРОДАЖ", $title_1];
@endphp

<div class="flex gap-2 flex-wrap px-4">
  @foreach($pageTags as $key => $tag)
    @php
      $classCondition = ($key === count($pageTags) - 1) ? 'bg-white text-gray-700' : 'text-white bg-black';
    @endphp
    <div class="text-xs inline-flex items-center font-bold leading-xs uppercase px-3 py-1 rounded-full border {{ $classCondition }}">
      {{ $tag }}
    </div>
  @endforeach
</div>