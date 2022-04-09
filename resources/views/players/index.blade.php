@extends('common.master')

@section('head-content')
    
@endsection

@section('content')
    <section class="section">
        <div class="container">
            <div class="columns">
                <div class="column is-full">
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
