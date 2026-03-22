"use client";

import { useSelector } from "react-redux";
import { useSyncMutation, useGetProductsQuery } from "@/store/cartApi";

export default function Home() {
  const token = useSelector((state) => state.auth?.token);
  const { data: products, isLoading } = useGetProductsQuery();
  const [sync] = useSyncMutation();

  const handleAction = async (id, type) => {
    await sync([{ type, product_id: id }]);
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      {!token && <a href="/login">Login to purchase</a>}

      <div style={{ display: "flex", gap: "20px" }}>
        {products?.map((p) => (
          <div key={p.id} style={{ border: "1px solid #ccc", padding: 10 }}>
            <img src={p.image_url} width={120} />

            <h3>{p.name}</h3>
            <p>Price: ${p.price}</p>
            <p>Stock: {p.stock}</p>

            {token && (
              <div>
                <button onClick={() => handleAction(p.id, "add")}>Add</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
