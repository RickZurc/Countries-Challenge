<?php

namespace App\Http\Controllers;
use App\Models\Country;
use Inertia\Inertia;

use Illuminate\Http\Request;

class CountryController extends Controller
{
    public function index()
    {
        $countries = Country::with(['currencies', 'languages', 'borders'])->orderBy('name_common')->get();

        return Inertia::render('Countries', [
            'countries' => $countries,
        ]);
    }

    public function show($name)
    {
        $country = Country::where('name_common', $name)->with(['currencies', 'languages', 'borders'])->firstOrFail();

        // dump($country);

        return Inertia::render('Country', [
            'country' => $country,
        ]);
    }
}
