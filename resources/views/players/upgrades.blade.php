@extends('common.master')

@section('head-content')
    <link href="{{ asset('css/player/upgradesStyles.css') }}" rel="stylesheet">
    <script type="module" src="{{ asset('js/PageScripts/Upgrades.js')}}"></script>
@endsection

@section('content')
    <div id="shop-container">
        <h2>{{auth()->user()->username}}</h2>
        <hr/>
        <div id="upgrades">
            <div id="leftupgrade">
                <div class="upgrade" id="stamina_resistance">
                    <p>Stamina<br> Weerstand: <strong><span class="level"></span></strong></p> 
                    <button class="upgrade-button nice-button buy"><span class="price"></span> VP</button>
                </div>
                <div class="upgrade" id="stamina_gain">
                    <p>Stamina<br> Verkrijgen: <strong><span class="level"></strong></span></p> 
                    <button class="upgrade-button nice-button buy"><span class="price"></span> VP</button>
                </div>
            </div>
            <div class="info">
                <div id="imgContainer">
                    <img src="/assets/img/players/fiets1.png" alt="Fiets">
                </div>
                <p>Verkeers Punten: <strong><span id="vp">{{auth()->user()->player->vp}}</span></strong></p>            
            </div>
            <div id="rightupgrade">

                <div class="upgrade" id="stamina_gain">
                    <p>Stamina<br> Verkrijgen: <strong><span class="level"></strong></span></p> 
                    <button class="upgrade-button nice-button buy"><span class="price"></span> VP</button>
                </div>
                <div class="upgrade" id="lamp_power">
                    <p>Lamp<br> Kracht: <strong><span class="level"></strong></span></p> 
                    <button class="upgrade-button nice-button buy"><span class="price"></span> VP</button>

                </div>
            </div>
        </div>
        <div>
            <a href="{{route('profile')}}" class= "nice-button buttons" id="backButton">Back</a>
        </div>
    </div>
@endsection