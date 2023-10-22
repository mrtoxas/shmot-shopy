@extends('landing')

@section('head')
  <title></title>  
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&family=Roboto&display=swap" rel="stylesheet">
@endsection
@section('content')
  <div class="max-w-xl mx-auto font-montserrat">
      @include('landing.default.components.header')
  </div>
@endsection