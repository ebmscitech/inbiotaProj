<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class tanaman extends Model
{
    protected $table = 'tanaman';
    protected $fillable = ["Plant_Name", "Local_Name", "English_Name", "Kingdom", "SubKingdom", "Infrakingdom", "Superdivision", "Class", "Superorder", "Order", "Family", "Genus", "Species", "Synonym", "Geographical_Distribution", "Traditional_Uses", "Reference", 'Phytochemical', 'BA_Name', 'BaTanRelated'];

    public function bio()
    {
        return $this->belongsToMany(Bio::class, 'sbt');
    }

    public function zat()
    {
        return $this->belongsToMany(zat::class, 'sbt');
    }
}
