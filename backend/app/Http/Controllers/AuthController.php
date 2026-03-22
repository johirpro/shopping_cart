<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Kreait\Firebase\Factory;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $firebase = (new Factory)
            ->withServiceAccount(config('firebase.credentials'));

        $auth = $firebase->createAuth();

        $verifiedIdToken = $auth->verifyIdToken($request->token);

        $uid = $verifiedIdToken->claims()->get('sub');

        $user = User::updateOrCreate(
            ['firebase_uid' => $uid],
            ['email' => $request->email]
        );

        return response()->json($user);
    }
}
