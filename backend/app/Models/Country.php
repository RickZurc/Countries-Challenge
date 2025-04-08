<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Country extends Model
{
    protected $fillable = [
        'name_common', 'name_official', 'cca2', 'cca3', 'ccn3', 'fifa',
        'independent', 'status', 'un_member', 'region', 'subregion',
        'lat', 'lng', 'capital', 'area', 'population', 'flag_emoji', 'flag_url',
        'start_of_week', 'google_maps', 'open_street_maps', 'area'
    ];

    public function currencies()
    {
        return $this->hasMany(Currency::class);
    }

    public function languages()
    {
        return $this->belongsToMany(Language::class);
    }

    public function borders()
    {
        return $this->belongsToMany(Country::class, 'borders', 'country_id', 'bordering_country_id');
    }

    public function timezones()
    {
        return $this->hasMany(Timezone::class);
    }

    public function continents()
    {
        return $this->belongsToMany(Continent::class);
    }
}
