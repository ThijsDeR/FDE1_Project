@extends('common.master')

@section('head-content')
  <script src="{{ asset('js/PageScripts/Mainscreen.js') }}" defer></script>
  <link href="{{ asset('css/menuStyles.css') }}" rel="stylesheet">
@endsection

@section('content')
<div class="goal">
    <h1>Het doel van het spel is dat je zo ver mogelijk komt in het verkeer</h1>
    <p>Je gaat sneller met de top arrow key
       en remt de de spatie key
    </p>
</div>
@endsection
