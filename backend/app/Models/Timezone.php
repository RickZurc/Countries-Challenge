<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Timezone extends Model
{
    protected $fillable = ['country_id', 'timezone'];

    public function country()
    {
        return $this->belongsTo(Country::class);
    }
}
