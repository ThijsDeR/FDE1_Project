@extends('common.master')

@section('head-content')
    <link href="{{ asset('css/authentication.css') }}" rel="stylesheet">
    <script src="{{ asset('js/PageScripts/UpdatePlayer.js') }}" defer></script>

@endsection

@section('content')
    <div id="form-container">
        <form method="POST" action="{{route('loginUpdate')}}">
            @csrf
            @method('PUT')
        <h1>Change your info</h1>
            <div id="input-container">
                <label class="label" for="username">username</label>
                <input class="@if($errors->get('username')) is-danger @endif" required type="text" name="username" id="username" value="{{old('username') ? old('username') : $user->username}}">
                @if($errors->get('username'))
                    <h3 class="error">De gebruikersnaam moet uniek en tussen de 5 en 30 karakters lang zijn.</h3>
                @endif
            </div>

            <div id="submit-container">
                    <button type="submit" class="nice-button">Submit</button>
            </div>
        </form>

        <button id="deleteBtn" class="nice-button">Delete</button>
        <div id="delete-container" class="">
            <form method="POST" action="{{route('loginDelete')}}">
                @csrf
                @method('DELETE')
                <p>
                    Weet je het zeker?<br>
                    Je raakt je volledige account kwijt.
                </p>
                <a id="cancelBtn" class="nice-button">Cancel</a>
                <button class="nice-button" type="submit">Delete</button>
            </form>
        </div>
        </div>
    </div>

@endsection
