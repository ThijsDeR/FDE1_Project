@extends('common.master')

@section('head-content')
    <link href="{{ asset('css/profileStyles.css') }}" rel="stylesheet">
@endsection

@section('content')
    <div id="profile-container">
        <h2>{{$user->username}}</h2>
        <hr/>
        <ul>
            <li><strong>Highscore: </strong>{{$user->player->highscore}}</li>
            <li><strong>Playing Since: </strong>{{$user->created_at}}</li>
            <li><strong>Upgrades: </strong>{{$user->player->upgrades}}</li>
        </ul>
    </div>
@endsection