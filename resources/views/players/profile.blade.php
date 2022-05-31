@extends('common.master')

@section('head-content')
    <link href="{{ asset('css/profileStyles.css') }}" rel="stylesheet">
    <script type="module" src="{{ asset('js/PageScripts/Shop.js')}}"></script>
@endsection

@section('content')
    <div id="profile-container">
        <h2>{{$user->username}}</h2>
        <hr/>
        <ul>
            <li><strong>Highscore: </strong>{{$user->player->highscore}}</li>
            <li><strong>Playing Since: </strong>{{$user->created_at}}</li>
            <li><strong>Upgrades: </strong>
                <ul id="upgrades">
                    <li id="stamina_resistance">
                        Stamina Resistance: <span class="level"></span>
                        <button class="buy"><span class="price"></span> VP</button>
                    </li>
                    <li id="stamina_gain">
                        Stamina Gain: <span class="level"></span>
                        <button class="buy"><span class="price"></span> VP</button>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
@endsection