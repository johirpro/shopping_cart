# Shopping Cart

## Stack
- Docker
- Nginx
- PHP 8
- MySQL 8
- Laravel 11
- Next.js

## Install
Clone the git repo:
> git clone git@github.com:johirpro/shopping_cart.git

**Install Docker Environment**
```
> cd <PROJECT_ROOT>
> 
> docker compose build
>
> docker compose up -d
```

**Install laravel and dependencies**
- configure the `.env` file
- then run commands:
```
> docker compose exec php bash
> 
> composer install
> 
> chmod -R 777 storage bootstrap/cache
> 
> php artisan key:generate
> 
> php artisan optimize:clear
> 
# run migration:
> php artisan migrate
>
# run seeder to insert product:
> 
```

**Install Next.js and dependencies**
```
> docker compose run --rm node npm install
> 
> docker compose up node
```

## Firebase Configuration
- Store the service account JSON file to the `backend/storage/` directory.
- Update the `frontend/lib/firebase.js` file using firebase configuration value.

## Usage
- Browse `http://localhost:3000`
- Click on the `Login to purchase` button
- Use your google credential to login.
- Click on the `Add` button to add the product to cart.
- Browse `http://localhost:3000/cart` page to see cart page.
- Use `+` to add quantity and `-` to decrease quantity.

## Known Issue
- Add `cart` link to browse cart page using a just a click instead of write url manually on the browser's address bar.
- When logged-in user browse the `http://localhost:3000/login` then redirect to the home page.
