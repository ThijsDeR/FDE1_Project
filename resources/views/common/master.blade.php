<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Blok 3 Casustoets template</title>

    <link href="{{ asset('css/app.css') }}" rel="stylesheet">

</head>

<body>
@include('common.navbar')

@yield('content')

@include('common.footer')
</body>
</html>

