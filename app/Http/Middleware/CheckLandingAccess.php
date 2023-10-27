<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Models\Landing;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class CheckLandingAccess
{
  public function handle(Request $request, Closure $next): Response
  {
    $userId = Auth::user()->id;
    $landingId = $request->route('landingId');

    $landing = Landing::find($landingId);

    if (!$landing) {
      return redirect()->back()->with('error', 'Такого сайту не існує!');
    }

    if (!$userId || $landing->created_by != $userId) {
      if ($request->isMethod('GET')) {
        return redirect()->route('landings')->with('error', 'GET Ви не можете редагувати цей сайт!');
      } elseif ($request->isMethod('POST')) {
        return response()->json([
          'message' => ' POST Ви не можете редагувати цей сайт!',
        ], 500);
      }
    }

    return $next($request);
  }
}