<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;
use App\Models\{Country, Currency, Language, Continent, Timezone};

class FetchCountries extends Command
{
    protected $signature = 'fetch:countries';
    protected $description = 'Fetch and store country data from restcountries.com';

    public function handle()
    {
        $this->info('Fetching countries from API...');
        $countries = [];


        try {
            $response = Http::retry(3, 1000)
                ->withOptions([
                    'debug' => true,
                    'version' => '1.1',
                ])
                ->timeout(300)
                ->get('https://restcountries.com/v3.1/all');

            if ($response->successful() && !empty($response->json())) {
                $countries = $response->json();

                // Save to JSON because API is having issues

                Storage::put('countries.json', json_encode($countries, JSON_PRETTY_PRINT));
                $this->info('Countries fetched from API and saved to local cache.');
            } else {
                $this->warn("API failed...");
            }
        } catch (\Exception $e) {
            $this->warn("API error: {$e->getMessage()}");
            $this->warn("API failed, trying to load local cache...");
            $this->warn("Trying to load local cache...");
        }

        // Fallback if API failed
        if (empty($countries) && Storage::exists('countries.json')) {
            $countries = json_decode(Storage::get('countries.json'), true);
            $this->info('Loaded countries from local cache.');
        }

        if (empty($countries)) {
            $this->error('No country data available (API + local cache failed)');
            return;
        }

        $borderMap = []; //Temporary array to store borders

        foreach ($countries as $data) {
            $country = $this->storeCountry($data);
            
            if ($country && isset($data['borders'])) {
                $borderMap[$country->cca3] = $data['borders'];
            }
        }

        //Process borders after all countries are stored
        $this->processBorders($borderMap);

        $this->info('Countries successfully stored.');
    }

    private function storeCountry($data)
    {
        try {
            
    
            $country = Country::updateOrCreate(
                ['cca3' => $data['cca3'] ?? null],
                [
                    'name_common' => $data['name']['common'] ?? null,
                    'name_official' => $data['name']['official'] ?? null,
                    'cca2' => $data['cca2'] ?? null,
                    'ccn3' => $data['ccn3'] ?? null,
                    'fifa' => $data['fifa'] ?? null,
                    'independent' => $data['independent'] ?? false,
                    'status' => $data['status'] ?? 'unknown',
                    'un_member' => $data['unMember'] ?? false,
                    'region' => $data['region'] ?? null,
                    'subregion' => $data['subregion'] ?? null,
                    'lat' => $data['capitalInfo']['latlng'][0] ?? null,
                    'lng' => $data['capitalInfo']['latlng'][1] ?? null,
                    'capital' => $data['capital'][0] ?? null,
                    'population' => $data['population'] ?? null,
                    'area' => isset($data['area']) ? (int) $data['area'] : null,
                    'flag_emoji' => $data['flag'] ?? null,
                    'flag_url' => $data['flags']['svg'] ?? null,
                    'start_of_week' => $data['startOfWeek'] ?? null,
                    'google_maps' => $data['maps']['googleMaps'] ?? null,
                    'open_street_maps' => $data['maps']['openStreetMaps'] ?? null,
                ]
            );
    
            // store currencies
            if (isset($data['currencies'])) {
                foreach ($data['currencies'] as $code => $currency) {
                    Currency::updateOrCreate(
                        ['country_id' => $country->id, 'code' => $code],
                        [
                            'name' => $currency['name'] ?? null,
                            'symbol' => $currency['symbol'] ?? null,
                        ]
                    );
                }
            }
    
            // store languages
            if (isset($data['languages'])) {
                foreach ($data['languages'] as $lang) {
                    $language = Language::firstOrCreate(['name' => $lang]);
                    $country->languages()->syncWithoutDetaching([$language->id]);
                }
            }
    
            // store timezones
            if (isset($data['timezones'])) {
                foreach ($data['timezones'] as $timezone) {
                    Timezone::updateOrCreate(
                        ['country_id' => $country->id, 'timezone' => $timezone]
                    );
                }
            }
    
            // store continents
            if (isset($data['continents'])) {
                foreach ($data['continents'] as $cont) {
                    $continent = Continent::firstOrCreate(['name' => $cont]);
                    $country->continents()->syncWithoutDetaching([$continent->id]);
                }
            }

            $this->info("Stored country: " . $country->name_common);
            return $country;
        } catch (\Exception $e) {
            $this->error('Failed to decode JSON: ' . $e->getMessage());
            return;
        }
        
    }
    
    /**
     * Process borders after all countries are stored
     * @param array $borderMap
     */
    // This function is called after all countries are stored
    private function processBorders(array $borderMap){
        $cca3ToId = Country::pluck('id', 'cca3')->toArray();

        foreach ($borderMap as $cca3 => $borders) {
            if (!isset($cca3ToId[$cca3])) continue;

            $countryId = $cca3ToId[$cca3];
            $borderIds = [];

            foreach ($borders as $borderCca3) {
                if (isset($cca3ToId[$borderCca3])) {
                    $borderIds[] = $cca3ToId[$borderCca3];
                }
            }

            Country::find($countryId)->borders()->syncWithoutDetaching($borderIds);
        }
    }
}
