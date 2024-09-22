<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Auth\Authenticatable as AuthenticableTrait;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;


class User extends Model implements Authenticatable
{
    use AuthenticableTrait;

    protected $table = "users";
    protected $primaryKey = "id";
    protected $keyType = "int";
    public $timestamps = true;
    public $incrementing = true;

    protected $fillable = [
        'username',
        'password',
        'completeName',
        'homeTown',
        'phoneNo',
        'email',
        'birthDate',
        'address'
    ];

    public function save(array $options = [])
    {
        $validator = Validator::make($this->attributes, [
            'email' => 'required|email|unique:user,email',
        ]);

        if ($validator->fails()) {
            $errors = $validator->errors();
            if ($errors->has('email') && $errors->get('email')[0] === 'The email has already been taken.') {
                throw ValidationException::withMessages(['email' => 'Email has been taken']);
            }

            throw new \Exception($validator->errors()->first());
        }

        return parent::save($options);
    }
}

