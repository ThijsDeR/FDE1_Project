@extends('common.master')

@section('head-content')
    <link href="{{ asset('css/player/skinsStyles.css') }}" rel="stylesheet">
    <script type="module" src="{{ asset('js/PageScripts/Skins.js')}}"></script>
@endsection

@section('content')
    <div id="shop-container">
        
        <div id="skins">
            <div id="leftskins">
                @foreach($bicycleSkins as $bicycleSkin)
                    @if(!$bicycleSkin->ownedByPlayer(auth()->user()->player))
                        <div class="skin" id="{{$bicycleSkin->id}}" type="bicycle">
                            <p>{{$bicycleSkin->name}}</p> 
                            <img src="{{$bicycleSkin->src}}" alt="{{$bicycleSkin->name}}">
                            <button class="buy"><span class="price">{{$bicycleSkin->price}}</span> VP</button>
                        </div>
                    @endif
                @endforeach
            </div>
            <div id="rightskins">
                @foreach($staminaSkins as $staminaSkin)
                    @if(!$staminaSkin->ownedByPlayer(auth()->user()->player))
                        <div class="skin" id="{{$staminaSkin->id}}" type="stamina">
                            <p>{{$staminaSkin->name}}: <strong><span class="level"></span></strong></p> 
                            <p>Base Stamina: {{$staminaSkin->baseStamina}}</p>
                            <img src="{{$staminaSkin->src}}" alt="{{$staminaSkin->name}}">
                            <button class="buy"><span class="price">{{$staminaSkin->price}}</span> VP</button>
                        </div>
                    @endif

                @endforeach
            </div>
        </div>
        <div id="back-vp">
            <a href="{{route('profile')}}" id="backButton">Back</a>
            
            <p>Verkeers Punten: <strong><span id="vp">{{$user->player->vp}}</span></strong></p>
            
        </div>
        
    </div>
@endsection