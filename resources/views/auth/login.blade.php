@extends('common.master')

@section('head-content')
    <link href="{{ asset('css/authentication.css') }}" rel="stylesheet">
@endsection

@section('content')
    <div id="form-container">
        <form method="POST" action="{{route('login')}}">
            @csrf

            @if($errors->any())
                <div id="input-container">
                    <ul>
                        @foreach($errors->all() as $error)
                            <li>{{ $error }}</li>
                        @endforeach
                    </ul>
                </div>
            @endif
            
            <div id="input-container">
                <label id="username" for="username">Gebruikernaam</label>
                <input type="text" id="username" name="username">
            </div>

            <hr/>

            <div id="input-container">
                <label id="password" for="password">Wachtwoord</label>
                <input type="password" id="password" name="password">
            </div>

            <hr/>

            <div id="submit-container"> 
                <div id="button-container">
                    <button type="submit" class="nice-button buttons" >Login</button>
                    <p id="no-account">Nog geen account?</p>
                    <a href="{{route('register')}}" class= "nice-button buttons" id="register-button" >Registreer</a>
                </div>
            </div>
        </form>
    </div>
    
@endsection