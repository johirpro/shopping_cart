"use client";

import { useSelector } from "react-redux";
import { useGetCartQuery, useSyncMutation } from "@/store/cartApi";

export default function CartPage() {
  const token = useSelector((state) => state.auth?.token);

  const { data, isLoading, isFetching } = useGetCartQuery(undefined, {
    skip: !token,
  });

  const [sync, { isLoading: isSyncing }] = useSyncMutation();

  const handleAction = async (productId, type) => {
    if (!token) return;

    await sync([{ type, product_id: productId }]);
  };

  if (!token) {
    return <p>Checking authentication...</p>;
  }

  if (isLoading || isFetching) {
    return <p>Loading cart...</p>;
  }

  if (!data || !data.items || data.items.length === 0) {
    return <p>Your cart is empty</p>;
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Cart</h1>

      {data.items.map((item) => {
        const price = Number(item.product?.price || 0);
        const total = item.quantity * price;

        return (
          <div
            key={item.id}
            style={{
              borderBottom: "1px solid #ccc",
              marginBottom: 15,
              paddingBottom: 10,
            }}
          >
            <h3>{item.product?.name}</h3>

            <p>Price: {price.toFixed(2)} BDT</p>

            <p>Quantity: {item.quantity}</p>
            <p>
              Total Price: {total.toFixed(2)} BDT
            </p>

            <div style={{ display: "flex", gap: 10 }}>
              <button
                onClick={() => handleAction(item.product_id, "increase")}
                disabled={isSyncing}
              >
                +
              </button>

              <button
                onClick={() => handleAction(item.product_id, "decrease")}
                disabled={isSyncing || item.quantity <= 1}
              >
                -
              </button>

              <button
                onClick={() => handleAction(item.product_id, "remove")}
                disabled={isSyncing}
              >
                Remove
              </button>
            </div>
          </div>
        );
      })}

      <h2>
        Grand Total:&nbsp;
         {data.items
          .reduce((sum, item) => {
            const price = Number(item.product?.price || 0);
            return sum + item.quantity * price;
          }, 0)
          .toFixed(2)} BDT
      </h2>
    </div>
  );
}
