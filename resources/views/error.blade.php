<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Помилка!</title>
  @vite(['resources/css/app.css'])  
</head>

<body class="min-h-screen flex justify-center items-center">
  <div class="flex items-center flex-col">   
    <h1 class="text-2xl font-bold text-red-600 my-2">ЙОЙ! ПОМИЛКА!</h1>
    <p>{{ $message }}</p>    
  </div>          
</body>

</html>