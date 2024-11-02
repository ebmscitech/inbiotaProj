<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class sbt extends Model
{
    protected $table = 'sbt';

    use HasFactory;

    protected $fillable = [
        'tanId',
        'snywId',
        'biokId',
    ];

    public function tanaman()
    {
        return $this->belongsTo(Tanaman::class);
    }

    public function zat()
    {
        return $this->belongsTo(Zat::class);
    }

    public function bioaktivitas()
    {
        return $this->belongsTo(Bioaktivitas::class);
    }
}
