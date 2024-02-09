@php
/* $templateName - get from page props */
$host = $_SERVER['HTTP_HOST'];
@endphp
@extends('landing.' . $templateName . '.index')
@section('template_head')
<title>Політика конфіденційності</title>
@endsection
@section('template_content')
<section class="text-left">
  <h1 class="text-xl text-center font-bold">Політика конфіденційності <span class="text-blue-600">{{$host}}</span></h1>
  <h2 class="text-lg font-semibold mt-4">Захист особистих даних</h2>
  <p class="mt-2">Для захисту ваших особистих даних у нас впроваджено низку засобів захисту, які діють під час введення, передачі або роботи з вашими особистими даними.</p>
  <h2 class="text-lg font-semibold mt-4">Розголошення особистих відомостей та передача цих відомостей третім особам</h2>
  <p class="mt-2">Ваші особисті відомості можуть бути розголошені нами тільки в тому випадку, якщо це необхідно для: (а)
    забезпечення відповідності приписам закону або вимогам судового процесу в нашому відношенні; (б) захисту
    наших прав або власності (в) вживання термінових заходів щодо забезпечення особистої безпеки наших
    співробітників або споживачів послуг, що надаються ним, а також забезпечення громадської безпеки. Особисті
    відомості, отримані в наше розпорядження під час реєстрації, можуть передаватися третім організаціям та
    особам, які перебувають з нами у партнерських відносинах для покращення якості послуг. Ці відомості не
    будуть використовуватися з будь-якою іншою метою, крім перерахованих вище. Адреса електронної пошти, надана
    вами при реєстрації, може використовуватися для надсилання вам повідомлень або повідомлень про зміни,
    пов'язані з вашою заявкою, а також розсилки повідомлень про події та зміни, що відбуваються в компанії,
    важливу інформацію про нові товари та послуги тощо. Передбачена можливість відмови від передплати цих
    поштових повідомлень.</p>
    <h2 class="text-lg font-semibold mt-4">Використання файлів cookie</h2>
  <p class="mt-2">Коли користувач відвідує веб-сайт, на його комп'ютер записується файл cookie (якщо користувач дозволяє прийом
    таких файлів). Якщо користувач вже відвідував цей веб-сайт, файл cookie зчитується з комп'ютера. Один із
    напрямків використання файлів cookie пов'язаний з тим, що за їх допомогою полегшується збір статистики
    відвідування. Ці відомості допомагають визначати, яка інформація, що надсилається замовникам, може
    представляти їм найбільший інтерес. Збір цих даних здійснюється в узагальненому вигляді та ніколи не
    співвідноситься з особистими відомостями користувачів.</p>
</section>
<div class="block_more_info">
  
  <p class="mt-2">Треті сторони, включаючи Google, показують оголошення нашої компанії на сторінках сайтів в Інтернеті. Треті
    сторони, включаючи Google, використовують cookie, щоб показувати оголошення, що базуються на попередніх
    відвідуваннях користувачів наших веб-сайтів та інтересах у веб-браузерах. Користувачі можуть заборонити
    Google використовувати cookie. Для цього необхідно відвідати спеціальну сторінку Google за цією адресою:
    http://www.google.com/privacy/ads/</p>
  <h2 class="text-lg font-semibold mt-4">Зміни у заяві про дотримання конфіденційності</h2>
  <p class="mt-2">Заява про дотримання конфіденційності передбачається періодично оновлювати. При цьому змінюватиметься дата
    попереднього поновлення, вказана на початку документа. Повідомлення про зміни в цій заяві будуть розміщені
    на видному місці наших веб-сайтів</p>
  <p class="mt-2">Здійснивши замовлення на нашому сайті будь-якого товару, Ви погоджуєтесь отримати смс-повідомлення про
    доставку купленого Вами товару до відповідного поштового відділення, згідно з вказаним вами індексом.</p>
  <p class="mt-2 text-blue-600">Дякуємо Вам за виявлений інтерес до нашої системи!</p>
</div>
@endsection