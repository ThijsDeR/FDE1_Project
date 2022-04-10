@extends('common.master')

@section('content')

<ul>
    @if($errors->any())
        @foreach($errors->all() as $error)
            <li>{{ $error }}</li>
        @endforeach
    @endif
</ul>

<form action="{{route('login')}}" method="POST">
    @csrf

    <label for="username">username</label>
    <input type="text" id="username" name="username">

    <label for="password">password</label>
    <input type="text" id="password" name="password">

    <button type="submit">Login</button>
</form>

@endsection