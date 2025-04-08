### Prerequisites:
- [Docker](https://www.docker.com/)
- [NodeJS](https://nodejs.org/en)

---

### Run Application (When developing)

1. Clone the repository
2. In the root of the project copy `.env.example` to `.env`
> cp .env.example .env
3. Build the containers
> docker compose up --build --detach (on the main folder), while in development you just need the database container running
4. Set the variables (from the .env of the docker-compose) you wish for DB and REDIS (check the .env.example file)
5. Go to the `backend` directory
> cd backend
6. Run composer
> composer install
7. Run npm dependencies
> npm install
8. Copy `.env.example` to `.env`
> cp .env.example .env
9. Change the DB and Redis ENV variables to match the ones from the root of the project (same username, database and password)
10. Change the `DB_HOST` and `REDIS_HOST` env variable to `127.0.0.1` when developing (explained on the .env.example on the ./backend folder)
11. Run the migrations (on ./backend)
> php artisan migrate
12. Run the Laravel app (on ./backend)
> php artisan serve (on ./backend)
13. Run npm  (on ./backend)
> npm run dev
14. Run the scheduler  (on ./backend)
> php artisan schedule:run

---

### Prod environment
When you're finished with the development to run the app with Docker to the following
1. Change the `DB_HOST` env variable to `db` (db is the container service name)
2. Change the `REDIS_HOST` env variable to `redis` (redis is the container service name)
3. Build the containers
> docker compose up --build --detach
4. Go to `http://localhost`
5. If you are getting the error 502 restart the nginx container, first check if app container is fully loaded
