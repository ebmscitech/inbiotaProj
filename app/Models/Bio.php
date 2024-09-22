<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bio extends Model
{
    use HasFactory;
    protected $table = 'bioaktivitas';
    protected $fillable = ['BA_Name','BA_Details','BA_ref', 'Plant_Name', 'Phytochemical'];
    
    public function datasenyawa()
    {
        return $this->belongsToMany(dataSenyawa::class, 'sbt');
    }

    public function zat()
    {
        return $this->belongsToMany(zat::class, 'sbt');
    }
}
