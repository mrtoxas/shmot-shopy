<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\URL;
use App\Models\Landing;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Landing\LandingController;

class OrderController extends Controller
{
  public function order(Request $request){
    $request->validate([
      'variant' => 'required|json',
      'size' => 'nullable|string',
      'name' => 'required|string',
      'phone' => 'required|string',
     ], [
      'variant.required' => 'Поле "Назва сайту" обов\'язкове!',
      'size.required' => 'Поле "Розмiр" обов\'язкове!',
      'name.required' => 'Поле "Iм\'я" обов\'язкове!',
      'phone.required' => 'Поле "Телефон" обов\'язкове!',
    ]);

    $variantData = json_decode($request->variant, true);

    $productArticle = $variantData['productArticle'];
    $productName = $variantData['productName'];
    $variantName = $variantData['variantName'];
    $variantValue = $variantData['variantValue'];

    $size = preg_replace('/\([^)]+\)/', '', trim($request->size));
    $name = $request->name;
    $phone = $request->phone;

    $host = explode(".", $request->getHost())[0];



    $landing = app(LandingController::class)->getLandingIdByName( $host, [
      'landingSettings',
      'globalProduct'
    ]);

    $landingData = $landing->getData();

    $landingSettings = $landingData->landing_settings;
    $globalProduct = $landingData->global_product;

    $fbPixelKey = $landingSettings->fb_pixel_key;
    $telegramChatId = $landingSettings->telegram_chat_id;
    $crmApiKey = $landingSettings->crm_api_key;
    $telegramToken = $landingSettings->telegram_token;
    $templateName = $landingSettings->template_name;

    $price = $globalProduct->discounted_price;
    $discountedPrice = $globalProduct->discounted_price;

    $product_exist = array(
      'product_id'   => $variantValue,    // код товара (заменить) variant.value
      'drop_price'   => 0,                // дроп цена товара (заменить)
      'price'        => $discountedPrice, // цена продажи товара (заменить)
      'amount'       => 1,                // количество товара
      'size_title'   => $size,            // размер товара (необязательно)
    );

    $products = array(
      0 => $product_exist
    );

    $data = array(
      'name'            => $name,                   // имя покупателя
      'phone'           => $phone,                  // телефон
      'products'        => $products,               // массив с товарами заказа
      'order_source'    => $_SERVER['HTTP_HOST']    // источник заказа (необязательно)
    );

    // $curl = curl_init();
    // $production_url = 'https://backend.mydrop.com.ua/dropshipper/api/orders';
    // curl_setopt($curl, CURLOPT_URL, $production_url);
    // curl_setopt($curl, CURLOPT_POST, true);
    // curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    // curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($data));
    // curl_setopt($curl, CURLOPT_HTTPHEADER, array(
    //   'X-API-KEY: ' . $crmApiKey,
    //   'Content-Type: application/json'
    // ));
    // $out = curl_exec($curl);
    // curl_close($curl);

    $arr = array(
      'Домен:'        => $_SERVER['HTTP_HOST'],
      'Имя: '         => $name,
      'Телефон: '     => $phone,
      'Позиция: '     => $productArticle . ' - ' . $variantValue,
      'Размер:'       => $size,
      'Цена:'         => $price,
      'Цена.Скидка:'  => $discountedPrice,
    );

    $txt = '';

    foreach ($arr as $key => $value) {
      $txt .= "<b>" . $key . "</b> " . $value . "%0A";
    };

    $sendToTelegram = fopen("https://api.telegram.org/bot{$telegramToken}/sendMessage?chat_id={$telegramChatId}&parse_mode=html&text={$txt}", "r");

    

    return view('landing.' . $templateName . '.order',[
      'landingSettings' => $landingSettings,
      'productName' => $productName,
      'variantName' => $variantName,
      'size'    => $size,
      'name'    => $name,
      'phone'     => $phone,
      'fbPixelKey' => $fbPixelKey,
      'templateName' => $templateName
    ]);
  }
}