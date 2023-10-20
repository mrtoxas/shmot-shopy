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
          return redirect()->back()->with('error', 'Ви не можете редагувати цей сайт!');
        }

        return $next($request);
    }
}