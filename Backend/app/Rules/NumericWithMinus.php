<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class NumericWithMinus implements Rule
{
    public function passes($attribute, $value)
    {
        // Check if the value is a valid CAS Number
        return preg_match('/^\d{2,7}-\d{2}-\d$/', $value);
    }

    public function message()
    {
        return 'The :attribute must be a valid CAS Number in the format XXXXXXX-XX-X.';
    }
}
