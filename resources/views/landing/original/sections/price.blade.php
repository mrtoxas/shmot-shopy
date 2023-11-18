@if(
    isset($globalProduct->price) && 
    isset($globalProduct->discounted_price)
)
<div class="h-[80px] relative flex items-center justify-center text-white">
  <div class="w-[80%] h-full relative grid grid-cols-2 z-10">
    <div class="bg-secondary skew-x-[20deg] text-center h-full">
      <div class="skew-x-[-20deg] flex items-center justify-center flex-col h-full">
        <div class="text-sm">Звичайна ціна:</div>
        <div class="font-bold text-3xl mt-1 line-through">{{$globalProduct->price}} грн.</div>
      </div>
    </div>
    <div class="bg-primary skew-x-[20deg] text-center h-full relative left-[-1px]">
      <div class="skew-x-[-20deg] flex items-center justify-center flex-col h-full">
        <div class="text-sm">Ціна сьогодні:</div>
        <div class="font-bold text-3xl mt-1">{{$globalProduct->discounted_price}} грн.</div>
      </div>
    </div>
  </div>
  <div class="absolute w-full top-[50%] translate-y-[-50%] flex">
    <div class="h-8 bg-secondary w-full"></div>
    <div class="h-8 bg-primary w-full"></div>
  </div>
</div>
@endif
