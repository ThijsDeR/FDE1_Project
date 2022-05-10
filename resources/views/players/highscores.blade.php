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
            <div id="text-container"><h2 id="place">{{$players->currentPage() * $players->perPage() - $players->perPage() + $loop->iteration}}e</h2></div>
            <div id="text-container"><p id="name">{{ $player->user->username}}</p></div>
            <div id="text-container"><p id="highscore">{{ $player->highscore}}</p></div>
        </div>

        <hr/>
            
        @endforeach

        {{ $players->links()}}
    </div>

@endsection
