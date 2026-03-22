"use client";

import { Provider, useDispatch } from "react-redux";
import { store } from "@/store/store";
import { useEffect, useState } from "react";
import { setAuth } from "@/store/authSlice";

function InitAuth({ children }) {
  const dispatch = useDispatch();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      dispatch(setAuth({ token }));
    }

    setReady(true);
  }, []);

  if (!ready) return <p>Initializing...</p>;

  return children;
}

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Provider store={store}>
          <InitAuth>{children}</InitAuth>
        </Provider>
      </body>
    </html>
  );
}
