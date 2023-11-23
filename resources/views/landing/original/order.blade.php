@extends('../index')
@section('template_head')
<title>Вiтання!</title>
@endsection
@section('template_content')
<div class="py-6">
  <div class="flex justify-center">
    <img src="templates/original/images/party.png" alt="Поздравляем!" width="150" height="150">
  </div>
  <h1 class="font-bold text-center mt-4">Ваше замовлення прийнято!</h2>
    <p class="py-6">Чекайте на дзвінок нашого оператора для підтвердження Вашого замовлення найближчим часом. Будь ласка, переконайтеся, що Ваш контактний телефон увімкнено та правильно вказано.</p>
    <p class="font-bold">Деталі замовлення:</p>
    <table class="mt-2">
      <tr>
        <td class="pr-4">Ім'я:</td>
        <td>
          {{$name}}
        </td>
      </tr>
      <tr>
        <td class="pr-4">Телефон:</td>
        <td>
          {{$phone}}
        </td>
      </tr>
      <tr>
        <td class="pr-4">Замовлення:</td>
        <td>
          {{$productName}} - {{$variantName}}
        </td>
      </tr>
      <tr>
        <td class="pr-4">Розмір:</td>
        <td>
          {{$size}}
        </td>
      </tr>
    </table>
    <div class="mt-6">
      <p>Здійснивши замовлення на нашому сайті будь-якого товару, Ви погоджуєтесь отримати смс-повідомлення про доставку
        купленого Вами товару у відповідне поштове відділення, згідно з вказаним Вами індексом.</p>
      <p class="py-4">
        <a class="text-blue-600 hover:underline" href="privacy.html" target="_blank" rel="noopener noreferrer">Політика конфіденційності</a>
      </p>
      <p>
        <a class="text-blue-600 hover:underline" href="./">Повернутись на сайт</a>
      </p>
    </div>
</div>
@endsection
