<?php

namespace Tests\Feature;

use App\Http\Controllers\UserController;
use Database\Seeders\UserSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class UserTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testRegisterSuccess()
    {
        $response = $this->postJson('/api/users/register', [
            'username' => 'mzakiammar',
            'password' => '123456',
            'email' => 'mzakiammar@gmail.com',
            'completeName' => 'Mzakiammar',
            'phoneNo' => '082131667685',
            'homeTown' => 'Madison',
            'address' => 'Madison',
            'birthDate' => '2000/01/01'
        ]);

        $response->dump();

        $response->assertStatus(201);
        $response->assertJson([
            'data' => [
                'username' => 'mzakiammar',
                'completeName' => 'Mzakiammar',
            ]
        ]);
    }

    public function testRegisterFailed()
    {
        $response = $this->postJson('/api/users/register', [
            'username' => '',
            'password' => '',
            'email' => '',
            'completeName' => '',
            'phoneNo' => '',
            'homeTown' => '',
            'address' => '',
            'birthDate' => ''
        ]);

        $response->dump();

        $response->assertStatus(400);
        $response->assertJson([
            'errors' => [
                'username' => [
                    'The username field is required.'
                ], 'completeName' => [
                    'The complete name field is required.'
                ], 'password' => [
                    'The password field is required.'
                ], 'homeTown' => [
                    'The home town field is required.'
                ], 'address' => [
                    'The address field is required.'
                ], 'birthDate' => [
                    'The birth date field is required.'
                ], 'email' => [
                    'The email field is required.'
                ], 'phoneNo' => [
                    'The phone no field is required.'
                ]
            ]
        ]);
    }

    public function testRegisterUsernameExist()
    {
        $this->testRegisterSuccess();
        $response = $this->postJson('/api/users/register', [
            'username' => 'mzakiammar',
            'password' => '123456',
            'email' => 'mzakiammar@gmail.com',
            'completeName' => 'Mzakiammar',
            'phoneNo' => '082131667685',
            'homeTown' => 'Madison',
            'address' => 'Madison',
            'birthDate' => '2000-01-01'  // Sesuaikan format tanggal
        ]);

        $response->assertStatus(400)->assertJson([
            'errors' => [
                'message' => ['The username already exist'],
            ]
        ]);
    }

    public function testLoginSuccess()
    {
        $this->seed([UserSeeder::class]);
        $response = $this->postJson('/api/users/login', [
            'username' => 'test',
            'password' => 'test',
        ]);

        $response->dump();
        $response->assertStatus(200);
        $response->assertJson([
            'data' => [
                'username' => 'test',
            ]
        ]);

    }

    public function testLoginFailed()
    {
        $response = $this->postJson('/api/users/login', [
           'username' => 'Mzakiammar',
           'password' => '654321',
        ]);

        $response->dump();
        $response->assertStatus(401);
        $response->assertJson([
            'errors' => [
                'message' => ['The username or password is incorrect'],
            ]
        ]);
    }
}
