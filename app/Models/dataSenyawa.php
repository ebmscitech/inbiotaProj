<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Bio;
use App\Models\zat;

class dataSenyawa extends Model
{
    protected $table = 'tanaman';
    protected $fillable = ["Plant_Name", "Local_Name", "English_Name", "Kingdom", "SubKingdom", "Infrakingdom", "Superdivision", "Class", "Superorder", "Order", "Family", "Genus", "Species", "Synonym", "Geographical_Distribution", "Traditional_Uses", "Reference", 'Phytochemical', 'BA_Name', 'BA_detail'];

    public function bio()
    {
        return $this->belongsToMany(Bio::class, 'sbt');
    }

    public function zat()
    {
        return $this->belongsToMany(zat::class, 'sbt');
    }
}


   

