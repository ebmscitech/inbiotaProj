<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserRegisterRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function register(UserRegisterRequest $request): JsonResponse{
        \Log::info('Register method is called');
        $data = $request->validated();

        if(User::where('username', $data['username'])->count() == 1){
            throw new \HttpResponseException(response([
                "errors" => [
                    "username" => [
                        "username already exist"
                    ]
                ]
            ], 400));
        }

        $user= new User($data);
        $user->password = Hash::make($data['password']);
        $user->save();

        return (new UserResource($user))->response()->setStatusCode(201);
    }

    public function __construct()
    {
//        $this->middleware('auth:api')->except(['register']);
    }
}
