<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Support\Facades\Validator;

class UserRegisterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'username' => ['required', 'max:100'],
            'password' => ['required', 'max:100'],
            'completeName' => ['required', 'max:200'],
            'homeTown' => ['required', 'max:100'],
            'phoneNo' => ['required', 'max:100'],
            'email' => ['required', 'max:100'],
            'birthDate' => ['required', 'max:200'],
            'address' => ['required', 'max:300'],
        ];
    }

   protected function failedValidation(\Illuminate\Contracts\Validation\Validator $validator)
   {
       throw new HttpResponseException(response([
           "errors" => $validator->getMessageBag()
       ], 400));
   }
}
