# Shopping Cart

## Stack
- Docker
- Nginx
- PHP 8
- MySQL 8
- Laravel 11
- Firebase Auth
- Next.js

<details>
<summary>Directory Structure</summary>

```
project-root/
├── backend/
│   ├── app/
│   │   ├── Http/
│   │   │   ├── Controllers/
│   │   │   │   ├── AuthController.php
│   │   │   │   ├── CartController.php
│   │   │   │   ├── Controller.php
│   │   │   │   └── ProductController.php
│   │   │   ├── Kernel.php
│   │   │   └── Middleware/
│   │   │       └── FirebaseAuth.php
│   │   ├── Models/
│   │   │   ├── CartItem.php
│   │   │   ├── Cart.php
│   │   │   ├── Product.php
│   │   │   └── User.php
│   │   └── Providers/
│   │       └── AppServiceProvider.php
│   ├── artisan
│   ├── bootstrap/
│   │   ├── app.php
│   │   ├── cache/
│   │   │   ├── packages.php
│   │   │   └── services.php
│   │   └── providers.php
│   ├── composer.json
│   ├── composer.lock
│   ├── config/
│   │   ├── app.php
│   │   ├── auth.php
│   │   ├── cache.php
│   │   ├── cors.php
│   │   ├── database.php
│   │   ├── filesystems.php
│   │   ├── firebase.php
│   │   ├── logging.php
│   │   ├── mail.php
│   │   ├── queue.php
│   │   ├── services.php
│   │   └── session.php
│   ├── database/
│   │   ├── database.sqlite
│   │   ├── factories/
│   │   │   └── UserFactory.php
│   │   ├── migrations/
│   │   │   ├── 0001_01_01_000000_create_users_table.php
│   │   │   ├── 0001_01_01_000001_create_cache_table.php
│   │   │   ├── 0001_01_01_000002_create_jobs_table.php
│   │   │   ├── 2026_03_21_100129_create_products_table.php
│   │   │   ├── 2026_03_21_100148_create_carts_table.php
│   │   │   └── 2026_03_21_100203_create_cart_items_table.php
│   │   └── seeders/
│   │       └── DatabaseSeeder.php
│   ├── package.json
│   ├── phpunit.xml
│   ├── public/
│   │   ├── favicon.ico
│   │   ├── index.php
│   │   └── robots.txt
│   ├── README.md
│   ├── resources/
│   │   ├── css/
│   │   │   └── app.css
│   │   ├── js/
│   │   │   ├── app.js
│   │   │   └── bootstrap.js
│   │   └── views/
│   │       └── welcome.blade.php
│   ├── routes/
│   │   ├── api.php
│   │   ├── console.php
│   │   └── web.php
│   ├── storage/
│   │   ├── app/
│   │   │   ├── private
│   │   │   └── public
│   │   ├── framework/
│   │   │   ├── cache/
│   │   │   │   └── data/
│   │   │   ├── sessions/
│   │   │   ├── testing/
│   │   │   └── views/
│   │   └── logs/
│   │       └── laravel.log
│   ├── tests/
│   │   ├── Feature/
│   │   │   └── ExampleTest.php
│   │   ├── TestCase.php
│   │   └── Unit/
│   │       └── ExampleTest.php
│   └── vendor/
├── docker/
│   ├── nginx/
│   │   └── default.conf
│   └── php/
│       └── Dockerfile
├── docker-compose.yml
├── FIREBASE_CONFIG.txt
├── frontend/
│   ├── app/
│   │   ├── cart/
│   │   │   └── page.js
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.js
│   │   ├── login/
│   │   │   └── page.js
│   │   └── page.js
│   ├── eslint.config.mjs
│   ├── jsconfig.json
│   ├── lib/
│   │   ├── auth.js
│   │   └── firebase.js
│   ├── middleware.js
│   ├── next.config.mjs
│   ├── package.json
│   ├── package-lock.json
│   ├── postcss.config.mjs
│   ├── providers/
│   │   └── ReduxProvider.js
│   ├── public/
│   │   ├── file.svg
│   │   ├── globe.svg
│   │   ├── next.svg
│   │   ├── vercel.svg
│   │   └── window.svg
│   ├── README.md
│   └── store/
│       ├── authSlice.js
│       ├── cartApi.js
│       ├── cartMiddleware.js
│       ├── cartSlice.js
│       └── store.js
└── README.md
```
</details>   

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
> php artisan db:seed --class=ProductSeeder
```

**Install Next.js and dependencies**
```
> docker compose run --rm node npm install
> 
> docker compose up node
```

**Firebase Configuration**
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
- [x] Add cart menu link — fixes #1
- [x] Apply redirect on login page — fixes #2
