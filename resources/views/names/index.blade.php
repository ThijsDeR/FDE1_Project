@extends('common.master')

@section('content')
    <section class="hero is-small is-primary">
        <div class="hero-body">
            <div class="container">
                <p class="title is-2">Project</p>
                <p class="subtitle is-3">Manage the project</p>

            </div>
        </div>
    </section>

    <section class="section">
        <div class="container">
            <div class="columns">
                <div class="column is-full">
                    <div class="has-text-right">
                        <a href="/name/create" class="button is-primary">Add a new project...</a>
                    </div>
                    <table class="table is-fullwidth is-striped">
                        <thead>
                        <tr>
                            <th>Id</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Budget</th>
                        </tr>
                        </thead>
                        <tbody>
                        @foreach($nameHighscore  as $name)
                            <tr>
                                <td><strong>{{ $name->name}}</strong></td>
                                <td><strong>{{ $name->highscore }}</strong></td>
                            </tr>

                        @endforeach
                        </tbody>
                    </table>
                </div>
            </div>
            <ul class="pagination">
                <li class="page-item"><a class="page-link" href="{{ $name->previousPageUrl() }}">Previous</a></li>
                <li class="page-item"><a class="page-link" href="{{ $name->nextPageUrl() }}">Next</a></li>
            </ul>
    </section>
@endsection
