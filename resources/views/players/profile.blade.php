@extends('common.master')

@section('head-content')
    <link href="{{ asset('css/player/profileStyles.css') }}" rel="stylesheet">
@endsection

@section('content')
    <div id="profile-container">
        <h2>{{$user->username}}</h2>
        <hr/>
        <ul>
            <li>Verkeers Punten: <strong><span id="vp">{{$user->player->vp}}</span></strong></li>
            <li>Highscore: <strong>{{$user->player->highscore}}</strong></li>
            <li>Speelt sinds: <strong>{{$user->created_at}}</strong></li>
        </ul>

        <div id="shops">
            <a href="{{route('upgrades')}}" class="nice-button buttons" id="upgrades">Upgrades</a>
            <a href="{{route('skins')}}" class = "nice-button buttons" id="skins">Skins</a>
        </div>
    </div>
@endsection