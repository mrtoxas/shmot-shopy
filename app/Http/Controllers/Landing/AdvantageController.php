<?php

namespace App\Http\Controllers\Landing;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AdvantageController extends Controller
{
    public function update(Request $request, $id)
    {
        dd($request->all());
    }
}
