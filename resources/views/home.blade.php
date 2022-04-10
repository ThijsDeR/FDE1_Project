<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Green Wave</title>
    <link rel="stylesheet" href="css/app.css">
    <script src="./js/Mainscreen.js" defer></script>
  </head>
  <body>
    <div class="mute-button active">

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
</body>

</html>