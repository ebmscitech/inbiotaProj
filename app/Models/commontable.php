<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class commontable extends Model
{
    use HasFactory;
    protected $table = 'COMMON_TABLE';
    protected $primaryKey = ['CD_NM', 'CLAS_CD1'];
    public $incrementing = false;
    public $timestamps = false;

    protected $fillable = [
        'CD_NM',
        'CLAS_CD1',
        'CLAS_CD2',
        'CLAS_CD3',
        'CLAS_CD4',
        'ETC_DSC1',
        'ETC_DSC2',
        'ETC_DSC3',
        'APCL_STR',
        'APCL_END',
        'created_at',
    ];

    protected $casts = [
        'APCL_STR' => 'datetime',
        'APCL_END' => 'datetime',
        'created_at' => 'datetime',
    ];

    public function getKeyName()
    {
        return null;
    }

    public function getKeyType()
    {
        return 'string';
    }

    public function getIncrementing()
    {
        return false;
    }
}
