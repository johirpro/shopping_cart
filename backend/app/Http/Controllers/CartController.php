<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cart;
use App\Models\CartItem;
use Illuminate\Support\Facades\DB;

class CartController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->attributes->get('user');

        if (!$user) {
            return response()->json(['error' => 'User not found'], 401);
        }

        $cart = Cart::with('items.product')
            ->where('user_id', $user->id)
            ->firstOrCreate(['user_id' => $user->id]);

        $cartItems = $cart->items->map(function ($item) {
            $price = (float) $item->product->price;
            $item->product->price = $price;
            $item->total_price = $price * $item->quantity;
            return $item;
        });

        $cartTotal = $cartItems->sum('total_price');

        return response()->json([
            'items' => $cartItems,
            'total' => $cartTotal,
        ]);
    }

    public function sync(Request $request)
    {
        $user = $request->attributes->get('user');

        if (!$user) {
            return response()->json(['error' => 'User not found'], 401);
        }

        $cart = Cart::firstOrCreate([
            'user_id' => $user->id
        ]);

        $actions = $request->input('actions', []);

        foreach ($actions as $action) {
            $productId = $action['product_id'];

            switch ($action['type']) {
                case 'add':
                case 'increase':
                    CartItem::updateOrCreate(
                        [
                            'cart_id' => $cart->id,
                            'product_id' => $productId
                        ],
                        ['quantity' => DB::raw('quantity + 1')]
                    );
                    break;

                case 'decrease':
                    $item = CartItem::where([
                        'cart_id' => $cart->id,
                        'product_id' => $productId
                    ])->first();
                    if ($item) {
                        $item->quantity = max(1, $item->quantity - 1);
                        $item->save();
                    }
                    break;

                case 'remove':
                    CartItem::where([
                        'cart_id' => $cart->id,
                        'product_id' => $productId
                    ])->delete();
                    break;
            }
        }

        return response()->json(['status' => 'synced']);
    }

    public function updateCart(Request $request)
    {
        $user = $request->attributes->get('user');

        if (!$user) {
            return response()->json(['error' => 'User not found'], 401);
        }

        $actions = $request->input('actions', []);

        foreach ($actions as $action) {
            $cart = Cart::firstOrCreate(['user_id' => $user->id]);

            $productId = $action['product_id'];

            $item = CartItem::firstOrNew([
                'cart_id' => $cart->id,
                'product_id' => $productId
            ]);

            switch ($action['type']) {
                case 'add':
                case 'increase':
                    $item->quantity += 1;
                    break;

                case 'decrease':
                    $item->quantity = max(1, $item->quantity - 1);
                    break;

                case 'remove':
                    $item->delete();
                    continue 2; // skip save
            }

            $item->save();
        }

        return response()->json(['message' => 'Cart updated']);
    }
}
