<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'Shmot-Shopy') }}</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=golos-text:400,500,600&display=swap" rel="stylesheet" />
        <meta property="og:image" content="fav/apple-touch-icon.png">
          <meta property="og:image:width" content="180">
          <meta property="og:image:height" content="180">
          <link rel="apple-touch-icon" sizes="180x180" href="fav/apple-touch-icon.png">
          <link rel="icon" type="image/png" sizes="32x32" href="fav/favicon-32x32.png">
          <link rel="icon" type="image/png" sizes="16x16" href="fav/favicon-16x16.png">
          <link rel="manifest" href="fav/site.webmanifest">
          <link rel="mask-icon" href="fav/safari-pinned-tab.svg" color="#5bbad5">
          <meta name="msapplication-TileColor" content="#da532c">

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
