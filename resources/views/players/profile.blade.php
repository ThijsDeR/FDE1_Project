@extends('common.master')

@section('head-content')
    <link href="{{ asset('css/player/profileStyles.css') }}" rel="stylesheet">
    <script type="module" src="{{ asset('js/PageScripts/Profile.js')}}"></script>
@endsection

@section('content')
    <div id="profile-container">
        <h2>
            <a href="/login/edit" id="username">{{$user->username}}</a>
        </h2>
        <hr/>
        <ul>
            <li>Verkeers Punten: <strong><span id="vp">{{$user->player->vp}}</span></strong></li>
            <li>Highscore: <strong>{{$user->player->highscore}}</strong></li>
            <li>Speelt sinds: <strong>{{$user->created_at}}</strong></li>
        </ul>

        <div id="skins">
            <div class="skin" id="bicycleSkin" type="bicycle">
                <img id="bicycleSkinImage" src="{{$user->player->skins->getCurrentBicycleSkin()->src}}" alt="">
                <div class="buttons">
                    <button type="previous" class="nice-button">Vorige</button>
                    <button type="next" class="nice-button">Volgende</button>
                </div>
            </div>
            <div class="skin" id="staminaSkin" type="stamina">
                <img id="staminaSkinImage" src="{{$user->player->skins->getCurrentStaminaSkin()->src}}" alt="">
                <div class="buttons">
                    <button type="previous" class="nice-button">Vorige</button>
                    <button type="next" class="nice-button">Volgende</button>
                </div>
            </div>
        </div>

        <div id="shops">
            <a href="{{route('upgrades')}}" class="nice-button" id="upgrades">Upgrades</a>
            <a href="{{route('skins')}}" class="nice-button" id="skinsBtn">Skins</a>
        </div>
    </div>
@endsection
