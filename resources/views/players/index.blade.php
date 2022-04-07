@extends('common.master')

@section('content')
    <section class="hero is-small is-primary">
        <div class="hero-body">
            <div class="container">
{{--                <p class="title is-2">Project</p>--}}
{{--                <p class="subtitle is-3">Manage the project</p>--}}

            </div>
        </div>
    </section>

    <section class="section">
        <div class="container">
            <div class="columns">
                <div class="column is-full">
                    <div class="has-text-right">
                        <a href="{{route('players.create')}}" class="button is-primary">Add your player...</a>
                    </div>
                    <table class="table is-fullwidth is-striped">
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Highscore</th>
                        </tr>
                        </thead>
                        <tbody>
                        @foreach($players as $player)
                            <tr>
                                <td><strong>{{ $player->name}}</strong></td>
                                <td><strong>{{ $player->highscore }}</strong></td>
                            </tr>
                        @endforeach
                        </tbody>
                    </table>
                </div>
            </div>
    </section>
@endsection
