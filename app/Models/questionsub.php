<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class questionsub extends Model 
{
    protected $table = 'questionsub';
    protected $fillable = ['name','senderEmail','phoneNumber','message'];
}

