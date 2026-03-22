<?php

namespace App\Http;

use Illuminate\Foundation\Http\Kernel as HttpKernel;
use Illuminate\Http\Middleware\HandleCors;

class Kernel extends HttpKernel
{
    protected $middleware = [
        // Built-in CORS middleware
        HandleCors::class,
    ];

    protected $middlewareGroups = [
        'api' => [
            'throttle:api',
            \Illuminate\Routing\Middleware\SubstituteBindings::class,
        ],
    ];

    protected $routeMiddleware = [
        // You can add auth middleware if needed later
    ];
}
