@extends('common.master')

@section('head-content')
    <link href="{{ asset('css/player/skinsStyles.css') }}" rel="stylesheet">
    <script type="module" src="{{ asset('js/PageScripts/Skins.js')}}"></script>
@endsection

@section('content')
    <div id="shop-container">
        <div id="upgrades">
            <div id="leftupgrade">
                
            </div>
            <img src="/assets/img/players/fiets1.png" alt="Fiets">
            <div id="rightupgrade">
                
            </div>
        </div>
        <div>
            <a href="{{route('profile')}}" id="backButton">Back</a>
        </div>
        
    </div>
@endsection