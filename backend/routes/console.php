<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;



//fetch countries every day
Schedule::call(function () {
    Artisan::call('fetch:countries');
})->everyFiveMinutes();


