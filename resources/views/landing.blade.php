<!DOCTYPE html>
<html lang="en" class="min-h-screen">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    @yield('head')
    {{-- @vite(['resources/css/app.css']) --}}
</head>
<body class="h-full">
    @yield('content')
    @yield('scripts')
</body>
</html>