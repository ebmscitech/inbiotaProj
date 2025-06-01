<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserLoginRequest;
use App\Http\Requests\UserRegisterRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class UserController extends Controller
{
    public function register(UserRegisterRequest $request): JsonResponse{
        $data = $request->validated();

        if(User::where('username', $data['username'])->exists()){
            throw new HttpResponseException(response([
                'errors' => [
                    'message' => [
                        'The username already exist'
                    ]
                ]
            ], 400));
        }

        $user= new User($data);
        $user->password = Hash::make($data['password']);
        $user->save();

        return (new UserResource($user))->response()->setStatusCode(201);
    }

    public function login(UserLoginRequest $request): JsonResponse
    {
        $data = $request->validated();
        $user = User::where('username', $data['username'])->first();

        if (!$user || !Hash::check($data['password'], $user->password)) {
            return response()->json([
                'errors' => ['message' => ['Invalid username or password']]
            ], 401);
        }

        $apiToken = Str::uuid()->toString();
        $user->token = $apiToken;
        $user->save();

        session(['api_token' => $apiToken]);

        return response()->json([
            'message' => 'Login successful',
            'token' => $apiToken,
            'redirect_url' => url('/indexadmin')
        ], 200);
    }

    public function __construct()
    {
//        $this->middleware('auth:api')->except(['register']);
    }
}
