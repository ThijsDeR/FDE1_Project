@extends('common.master')

@section('head-content')
    <link href="{{ asset('css/authentication.css') }}" rel="stylesheet">
@endsection

@section('content')
    <div id="form-container">
        <ul>
            @if($errors->any())
                @foreach($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            @endif
        </ul>

        <form method="POST" action="{{route('register')}}">
            @csrf
            
            <div id="input-container">
                <label for="username">Gebruikersnaam</label>
                <input type="text" id="username" name="username">
            </div>

            <hr/>

            <div id="input-container">
                <label for="password">Wachtwoord</label>
                <input type="text" id="password" name="password">
            </div>

            <hr/>

            <div id="submit-container"> 
                <button type="submit" class="nice-button">Registreer</button>
            </div>
        </form>
    </div>
    
@endsection