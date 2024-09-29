<?php

namespace Tests\Feature;

use App\Http\Controllers\UserController;
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
        $response = $this->postJson('/api/users', [
            'username' => 'mzakiammar',
            'password' => '123456',
            'email' => 'mzakiammar@gmail.com',
            'completeName' => 'Mzakiammar',
            'phoneNo' => '082131667685',
            'homeTown' => 'Madison',
            'address' => 'Madison',
            'birthDate' => '2000-01-01'
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

    }

    public function testRegisterUsernameExist()
    {

    }
}
