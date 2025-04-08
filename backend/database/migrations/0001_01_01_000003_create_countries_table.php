<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('countries', function (Blueprint $table) {
            $table->id();
            $table->string('name_common');
            $table->string('name_official');
            $table->string('cca2', 2)->unique();
            $table->string('cca3', 3)->unique();
            $table->string('ccn3', 3)->nullable();
            $table->string('fifa', 3)->nullable();
            $table->boolean('independent')->default(true);
            $table->string('status');
            $table->boolean('un_member')->default(false);
            $table->string('region');
            $table->string('subregion')->nullable();
            $table->decimal('lat', 8, 5)->nullable();
            $table->decimal('lng', 8, 5)->nullable();
            $table->string('capital')->nullable();
            $table->bigInteger('population')->nullable();
            $table->bigInteger('area')->nullable();
            $table->string('flag_emoji', 10)->nullable();
            $table->string('flag_url')->nullable();
            $table->string('start_of_week')->nullable();
            $table->string('google_maps')->nullable();
            $table->string('open_street_maps')->nullable();
            $table->timestamps();
        });

        Schema::create('currencies', function (Blueprint $table) {
            $table->id();
            $table->foreignId('country_id')->constrained()->onDelete('cascade');
            $table->string('code', 3);
            $table->string('name');
            $table->string('symbol', 10)->nullable();
            $table->timestamps();
        });

        Schema::create('languages', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->timestamps();
        });

        Schema::create('country_language', function (Blueprint $table) {
            $table->foreignId('country_id')->constrained()->onDelete('cascade');
            $table->foreignId('language_id')->constrained()->onDelete('cascade');
        });

        Schema::create('borders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('country_id')->constrained()->onDelete('cascade');
            $table->foreignId('bordering_country_id')->constrained('countries')->onDelete('cascade');
            $table->timestamps();
        });

        Schema::create('timezones', function (Blueprint $table) {
            $table->id();
            $table->foreignId('country_id')->constrained()->onDelete('cascade');
            $table->string('timezone');
            $table->timestamps();
        });

        Schema::create('continents', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->timestamps();
        });

        Schema::create('continent_country', function (Blueprint $table) {
            $table->id();
            $table->foreignId('country_id')->constrained()->onDelete('cascade');
            $table->foreignId('continent_id')->constrained()->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('country_continent');
        Schema::dropIfExists('continents');
        Schema::dropIfExists('timezones');
        Schema::dropIfExists('borders');
        Schema::dropIfExists('country_language');
        Schema::dropIfExists('languages');
        Schema::dropIfExists('currencies');
        Schema::dropIfExists('countries');
    }
};
