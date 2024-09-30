<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserLoginRequest;
use App\Http\Requests\UserRegisterRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Support\Str;

class UserController extends Controller
{
    public function register(UserRegisterRequest $request): JsonResponse{
        \Log::info('Register method is called');
        $data = $request->validated();

        if(User::where('username', $data['username'])->exists()){
            throw new HttpResponseException(response([
                'errors' => [
                    'username' => [
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

    public function login(UserLoginRequest $request): UserResource
    {
        $data = $request->validated();
        $user = User::where('username', $data['username'])->first();
        if (!$user || !Hash::check($data['password'], $user->password)) {
            throw new HttpResponseException(response([
                'errors' => [
                    'message' => [
                        'The username or password is incorrect'
                    ]
                ]
            ], 401));
        }

        $user->token = Str::uuid()->toString();
        $user->save();
        return new UserResource($user);
    }

    public function __construct()
    {
//        $this->middleware('auth:api')->except(['register']);
    }
}