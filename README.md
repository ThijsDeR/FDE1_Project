# FDE1 Project

Our project for framework development 1

## Installation

- clone
- composer install
- npm install
- copy .env.example into .env
- php artisan key:generate

## Docker setup
### Open the `.env` file. 
### Check the following:
- DB_HOST=mysql
- DB_USER may NOT be root

### Add the following:
- WWWUSER=1000
- WWWGROUP=1000

### Add and adjust the following:
You may use any unused port. These values differentiate your projects from one another. ***These are example values. Only use unused ports!***
The base values are set in `docker-compose-yml` and must not be changed. They are **80** and **3306** respectively.
- APP_PORT=***81***
- FORWARD_DB_PORT=***33061***

