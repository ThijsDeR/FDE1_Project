<nav id="navbar">
    <div id="container">
        <div id="text-container">
            <a href="{{route('home')}}"><h2 class="title"><span class="green">Green</span> <span class="blue">Wave</span></h2></a>
        </div>
        <div id="link-container">
            <ul id="links">
                <li><a href="{{route('profile')}}" class="nice-button">Profiel</a></li>
                <li><a href="{{route('highscores')}}" class="nice-button">High Scores</a></li>
                @if (auth()->user())
                    <li><a href="./game" id="nice-button" class="nice-button" role="button">Start</a></li>
                @endif
            </ul>
        </div>

        <div id="user-container">
            @if (auth()->user())
                <div id="text-container">
                    <h2>{{auth()->user()->username}}</h2>
                </div>

                <div id="button-container">
                    <a href="{{route('logout')}}" class="nice-button">logout</a>
                </div>

            @else
                <div id="button-container">
                    <a href="{{route('loginView')}}" class="nice-button" role="button">login</a>
                </div>
            @endif

        </div>
    </div>
</nav>