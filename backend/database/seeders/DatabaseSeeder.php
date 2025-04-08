<?php

use Illuminate\Database\Seeder;
use Symfony\Component\Console\Input\ArrayInput;
use Symfony\Component\Console\Output\ConsoleOutput;
use App\Console\Commands\FetchCountries;
use App\Models\User;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {

        $this->command->info('Creating user...');
        
        // Create a user with the specified email and password
        // If the user already exists, it will be updated with the new password.
        // It happens if try to build the app with the same database
        User::updateOrCreate(
            ['email' => 'admin@test.com'],
            [
                'name' => 'Admin',
                'password' => bcrypt('adminpassword'),
            ]
        );

        $this->command->info('User created!');

        $this->command->info('Running fetch:countries...');

        $input = new ArrayInput([]);
        $output = new ConsoleOutput();

        $fetchCountriesCommand = new FetchCountries();
        $fetchCountriesCommand->setLaravel(app());
        $fetchCountriesCommand->run($input, $output);

        $this->command->info('Countries fetched!');

        $this->command->info('Seeding completed!');
    }
}

