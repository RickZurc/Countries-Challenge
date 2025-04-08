<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Currency extends Model
{
    protected $fillable = ['country_id', 'code', 'name', 'symbol'];

    public function country()
    {
        return $this->belongsTo(Country::class);
    }
}
