<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Green Wave</title>

    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <link href="{{ asset('css/navStyles.css') }}" rel="stylesheet">
    <script type="module" src="{{ asset('js/PageScripts/Navbar.js') }}" defer></script>
    @yield('head-content')
</head>

<body>
    @include('common.nav')

    <main>
        @yield('content')
    </main>


</body>
</html>

