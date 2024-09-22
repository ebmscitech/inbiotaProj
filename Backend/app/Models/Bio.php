<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bio extends Model
{
    protected $table = 'bioaktivitas';
    protected $fillable = ['BA_Name','BA_Details','BA_ref', 'Plant_Name', 'Phytochemical'];

    use HasFactory;

    public function tanaman()
    {
        return $this->hasMany(tanaman::class);
    }

    public function substance()
    {
        return $this->hasMany(zat::class);
    }
}
