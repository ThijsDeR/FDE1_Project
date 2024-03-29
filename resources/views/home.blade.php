@extends('common.master')

@section('head-content')
  <script src="{{ asset('js/PageScripts/Mainscreen.js') }}" defer></script>
  <link href="{{ asset('css/menuStyles.css') }}" rel="stylesheet">
@endsection

@section('content')
    <div class="big-button-container">
        @if (auth()->user())
          <a href="./game" id="nice-button" class="nice-button" role="button">Start</a>
          <a href="./explanation" id="nice-button" class="nice-button" role="button">Uitleg</a>
        @else
          <a href="{{route('loginView')}}" id="nice-button" class="nice-button" role="button" style="top: 40vh;">login</a>
        @endif


    </div>
    <div class="mute-button active"></div>
@endsection
