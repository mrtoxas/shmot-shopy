<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Помилка!</title>
  @vite(['resources/css/app.css'])  
</head>

<body class="min-h-screen flex justify-center items-center">
  <div class="flex items-center flex-col md:max-w-[768px] mx-auto">   
    <h1 class="text-2xl font-bold text-red-600">ЙОЙ! СТАЛАСЯ ПОМИЛКА!</h1>
    <p class="font-bold my-4">"{{ $message }}"</p>
    <p class="text-sm">Зверніться до адміністратора<p> 
  </div>          
</body>

</html>