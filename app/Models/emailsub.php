<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class emailsub extends Model
{
    protected $table = 'emailsub';
    protected $fillable = ['subscription'];
}