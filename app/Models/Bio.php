<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bio extends Model
{
    protected $table = 'Bio';
    protected $fillable = ['BA_Name','BA_Details','BA_ref', 'Plant_Name', 'Phytochemical'];
}
