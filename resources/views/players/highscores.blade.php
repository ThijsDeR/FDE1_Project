@extends('common.master')

@section('head-content')
    <link href="{{ asset('css/highscoreStyles.css') }}" rel="stylesheet">
@endsection

@section('content')
    <div id="highscore-container">
        <h2 id="title">Highscores</h2>
        <hr/>

        @foreach($players as $player)
        <div id="highscore-player-container">
            <div id="text-container">
                @if ($players->currentPage() * $players->perPage() - $players->perPage() + $loop->iteration === 1)
                    <img class="highscore-image" src="/assets/img/objects/gold_trophy.png" alt="gold trophy">
                @elseif ($players->currentPage() * $players->perPage() - $players->perPage() + $loop->iteration === 2)
                    <img class="highscore-image" src="/assets/img/objects/silver_trophy.png" alt="silver trophy">
                @elseif ($players->currentPage() * $players->perPage() - $players->perPage() + $loop->iteration === 3)
                    <img class="highscore-image" src="/assets/img/objects/bronze_trophy.png" alt="bronze trophy">
                @else
                    <h2 id="place">{{$players->currentPage() * $players->perPage() - $players->perPage() + $loop->iteration}}e</h2>
                @endif
            </div>
            <div id="text-container"><p id="name">{{ $player->user->username}}</p></div>
            <div id="text-container"><p id="highscore">{{ $player->highscore}}</p></div>
        </div>

        <hr/>
            
        @endforeach

        {{ $players->links()}}
    </div>

@endsection
