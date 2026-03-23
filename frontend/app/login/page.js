"use client";

import { loginWithGoogle } from "@/lib/auth";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "@/store/authSlice";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Cookies from "js-cookie";

export default function LoginPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (token) {
      router.push("/");
    }
  }, [token]);

  const handleLogin = async () => {
    try {
      const result = await loginWithGoogle();
      const user = result.user;

      const idToken = await user.getIdToken();

      localStorage.setItem("token", idToken);
      Cookies.set("token", idToken);

      dispatch(setAuth({
        token: idToken,
      }));

      router.push("/");
    } catch (err) {
      console.error("Google login failed", err);
      alert("Login failed");
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <button onClick={handleLogin}>
        Login with Google
      </button>
    </div>
  );
}
