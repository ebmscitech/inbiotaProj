<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use App\Models\User;
use Illuminate\Foundation\Auth\RegistersUsers;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class RegisterController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Register Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users as well as their
    | validation and creation. By default this controller uses a trait to
    | provide this functionality without requiring any additional code.
    |
    */

    use RegistersUsers;

    /**
     * Where to redirect users after registration.
     *
     * @var string
     */
    protected $redirectTo = RouteServiceProvider::HOME;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest');
    }

    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        return Validator::make($data, [
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
            'completeName' => ['required', 'max:200'],
            'homeTown' => ['required', 'max:100'],
            'phoneNo' => ['required', 'max:100'],
            'birthDate' => ['required', 'max:200'],
            'address' => ['required'],
            'username' => ['required', 'max:100'],
        ]);
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     * @return \App\Models\User
     */
    protected function create(array $data)
    {
        try {
            $user = User::create([
                'email' => $data['email'],
                'password' => Hash::make($data['password']),
                'completeName' => $data['completeName'],
                'homeTown' => $data['homeTown'],
                'phoneNo' => $data['phoneNo'],
                'birthDate' => $data['birthDate'],
                'address' => $data['address'],
                'username' => $data['username'],
            ]);

            return $user;
        } catch (\Exception $e) {
            throw new \Exception('Failed to create user: ' . $e->getMessage());
        }
    }
}
