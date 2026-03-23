"use client";

import { useSelector, useDispatch } from "react-redux";
import { useSyncMutation, useGetProductsQuery } from "@/store/cartApi";
import { logout } from "@/store/authSlice";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function Home() {
  const token = useSelector((state) => state.auth?.token);
  const { data: products, isLoading } = useGetProductsQuery();
  const [sync] = useSyncMutation();

  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    Cookies.remove("token");

    dispatch(logout());

    router.push("/login");
  };

  const handleAction = async (id, type) => {
    await sync([{ type, product_id: id }]);
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <div style={{ padding: "10px" }}>
        {!token ? (
          <a href="/login">Login to purchase</a>
        ) : (
          <>
            <a href="/cart" style={{ marginRight: "10px" }}>
              Go to Cart
            </a>

            <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>

      <div style={{ display: "flex", gap: "20px" }}>
        {products?.map((p) => (
          <div key={p.id} style={{ border: "1px solid #ccc", padding: 10 }}>
            <img src={p.image_url} width={120} />

            <h3>{p.name}</h3>
            <p>Price: {p.price} BDT</p>
            <p>Stock: {p.stock}</p>

            {token && (
              <div>
                <button onClick={() => handleAction(p.id, "add")}>
                  Add
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
