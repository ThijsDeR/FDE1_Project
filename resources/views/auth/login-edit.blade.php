@extends('common.master')

@section('head-content')
    <link href="{{ asset('css/authentication.css') }}" rel="stylesheet">
@endsection

@section('content')
    <div id="form-container">
        <form method="POST" action="{{route('loginUpdate')}}">
            @csrf
            @method('PUT')
        <h1>Change your info</h1>
            <div class="field">
                <label class="label" for="username">username</label>
                <div class="control">
                    <input class="input" required type="text" name="username" id="username" value="{{$user->username}}">
                </div>
            </div>

            <div class="field is-grouped" id="submit-button">
                <div class="control">
                    <button type="submit" class="button-is-text">Submit</button>
                </div>
            </div>
        </form>
            <div id="delete-button">
        <form method="POST" action="{{route('loginDelete')}}">
            @csrf
            @method('DELETE')
            <button type="submit" ONCLICK="alert('Weet je het zeker, je zal al je voortgang kwijtraken')">Delete</button>
        </form>
        </div>
    </div>

@endsection
