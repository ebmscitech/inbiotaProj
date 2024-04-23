<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class zat extends Model
{
    protected $table = 'zat';
    protected $fillable = ['Synonym','CAS_Number','Chemical_Formula','Molecular_Mass', 'IUPAC_Name', 'Phytochemical', 'compoundClass', 'Plant_Name', 'Description', 'BA_Name'];
}
