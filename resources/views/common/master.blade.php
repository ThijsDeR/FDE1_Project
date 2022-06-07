<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{csrf_token()}}">
    <title>Green Wave</title>
    
    @yield('head-content')

    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <link href="{{ asset('css/navStyles.css') }}" rel="stylesheet">
</head>

<body>
    @include('common.nav')

    <main>
        @yield('content')
    </main>


</body>
</html>

