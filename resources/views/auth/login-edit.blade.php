@extends('common.master')

@section('head-content')
    <link href="{{ asset('css/authentication.css') }}" rel="stylesheet">
@endsection

@section('content')
    <div id="form-container">
        <form method="POST" action="login/{{$login->id}}">
            @csrf
            @method('PUT')
        <h1>Change your info</h1>
            <div class="field">
                <label class="label" for="title">usernamne</label>
                <div class="control">
                    <input class="input" required type="text" name="username" id="username" value="{{$user->username}}">
                </div>

            <div class="field">
                <label class="label" for="title">password</label>
                <div class="control">
                    <input class="input" required type="text" name="password" id="password" value="{{$user->password}}">
                </div>


            <div class="field is-grouped">
                <div class="control">
                    <button class="button-is-text">Submit</button>
                </div>
            </div>
        </form>
            <div id="delete-button">
        <form method="POST" action="login/{{$login->id}}">
            @csrf
            @method('DELETE')
            <button type="submit">Delete</button>
        </form>
        </div>
    </div>

@endsection
