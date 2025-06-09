<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\Log;

class ApiLoginMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        $token = $request->route()?->parameter('token');

        Log::info('Middleware APIToken (from URL):', ['token' => $token]);

        $userExists = User::where('token', $token)->exists();

        Log::info('User Exists:', ['token' => $token, 'exists' => $userExists]);

        if (!$token || !$userExists) {
            return response()->json([
                'message' => 'Unauthorized #1', /* INVALID API TOKEN*/
                'received_token' => $token
            ], 401);
        }

        return $next($request);
    }
}
