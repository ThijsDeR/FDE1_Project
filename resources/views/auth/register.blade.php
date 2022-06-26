@extends('common.master')

@section('head-content')
    <link href="{{ asset('css/authentication.css') }}" rel="stylesheet">
@endsection

@section('content')
    <div id="form-container">
        <form method="POST" action="{{route('register')}}">
            @csrf

            <div id="input-container">
                <label id="username" for="username">Gebruikersnaam</label>
                @if($errors->get('username'))
                <input class="is-danger" type="text" id="username" name="username">
                <h3 class="error">De gebruikersnaam moet uniek en tussen de 5 en 30 karakters lang zijn.</h3>
                @else
                <input type="text" id="username" name="username" value="{{old('username')}}">
                @endif
            </div>

            <div id="input-container">
                <label id="password" for="password">Wachtwoord</label>
                @if($errors->get('password'))
                <input class="is-danger" type="password" id="password" name="password">
                <h3 class="error">Het wachtwoord moet tussen de 6 en 30 karakters lang zijn.</h3>
                @else
                <input type="password" id="password" name="password">
                @endif
            </div>

            <div id="submit-container">
                <div id="button-container">
                    <button type="submit"  class="nice-button buttons">Registreer</button>
                    <a href="/terms_of_service" id="tos-button" class="nice-button buttons" role="button">Terms of service</a>
                </div>
            </div>
        </form>
    </div>

@endsection
