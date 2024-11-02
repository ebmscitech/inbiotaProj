<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class zat extends Model
{
    protected $table = 'senyawa';
    protected $fillable = ['Synonym','CAS_Number','Chemical_Formula','Molecular_Mass', 'IUPAC_Name', 'Phytochemical', 'compoundClass', 'Plant_Name', 'Description', 'BA_Name'];

    public function tanaman()
    {
        return $this->belongsToMany(tanaman::class, 'sbt', 'snywId', 'tanId');
    }

    public function bios()
    {
        return $this->belongsToMany(Bio::class, 'sbt', 'snywId', 'tanId');
    }
}
