@extends('common.master')

@section('content')
    <section>

    <ul>
    <li>{{$player->name}}</li>
    <li>{{$player->highscore}}</li>
    <li><pre>{{$player->upgrades}}</pre></li>
    <li>{{$player->created_at}}</li>
    </ul>
    </section>
@endsection