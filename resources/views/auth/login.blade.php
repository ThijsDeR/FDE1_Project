@extends('common.master')

@section('head-content')
    <link href="{{ asset('css/authentication.css') }}" rel="stylesheet">
@endsection

@section('content')
    <div id="form-container">
        <form method="POST" action="{{route('login')}}">
            @csrf

            <div id="input-container">
                <label id="username" for="username">Gebruikersnaam</label>
                @if($errors->all())
                <input class="is-danger" type="text" id="username" name="username">
                @else
                <input type="text" id="username" name="username">
                @endif
            </div>

            <div id="input-container">
                <label id="password" for="password">Wachtwoord</label>
                @if($errors->all())
                <input class="is-danger" type="password" id="password" name="password">
                <h3>De gebruikersnaam of het wachtwoord zijn onjuist.</h3>
                @else
                <input type="password" id="password" name="password">
                @endif
            </div>

            <div id="submit-container"> 
                <div id="button-container">
                    <button type="submit" class="nice-button buttons" >Login</button>
                    <a href="{{route('register')}}" class= "nice-button buttons" id="register-button" >Registreer</a>
                </div>
            </div>
        </form>
    </div>
    
@endsection