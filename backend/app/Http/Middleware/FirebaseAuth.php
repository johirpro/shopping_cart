<?php

namespace App\Http\Middleware;

use Closure;
use Kreait\Firebase\Factory;
use App\Models\User;

class FirebaseAuth
{
    public function handle($request, Closure $next)
    {
        $header = $request->header('Authorization');

        if (!$header || !str_starts_with($header, 'Bearer ')) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $token = str_replace('Bearer ', '', $header);

        try {
            $firebase = (new Factory)
                ->withServiceAccount(config('firebase.credentials'));

            $auth = $firebase->createAuth();

            $verified = $auth->verifyIdToken($token);

            $uid = $verified->claims()->get('sub');

            $email = $verified->claims()->get('email');
            // $name = $verified->claims()->get('name');

            $user = User::firstOrCreate(
                ['firebase_uid' => $uid],
                [
                    'email' => $email ?? $uid . '@example.com',
                ]
            );

            $request->attributes->set('user', $user);

        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Unauthorized',
                'message' => $e->getMessage()
            ], 401);
        }

        return $next($request);
    }
}
