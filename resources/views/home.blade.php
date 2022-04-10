@extends('common.master')

    </div>
    <div class="menu-container">
        <div class="title-container">
            <h2 class="title"><span class="green">Green</span> <span class="blue">Wave</span></h2>
        </div>
        @if (auth()->user())
          <a href="./localstorage?token={{auth()->user()->player->token}}" id="start-button" class="start-button" role="button">Start</a>
          <a href="{{route('logout')}}" id="start-button" class="start-button" role="button">logout</a>
        @else
          <a href="{{route('loginView')}}" id="start-button" class="start-button" role="button">login</a>
          <a href="{{route('registerView')}}" id="start-button" class="start-button" role="button">Register</a>
        @endif
        <a href="{{route('highscores')}}" id="start-button" class="start-button" role="button">See your highscore</a>
    </div>
  </div>

@section('head-content')
  <script src="./js/Mainscreen.js" defer></script>
@endsection

@section('content')

@endsection
