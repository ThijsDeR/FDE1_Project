@extends('common.master')

@section('content')
    <form method="POST" action="{{route('register')}}">
        @csrf

        <label for="username">username</label>
        <input type="text" id="username" name="username">

        <label for="password">password</label>
        <input type="text" id="password" name="password">

        <button type="submit">Register</button>
    </form>
@endsection