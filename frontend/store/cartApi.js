import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { store } from "./store";

export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api",

    prepareHeaders: (headers) => {
      const state = store.getState();
      const token = state.auth?.token;

      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),

  endpoints: (builder) => ({
    getCart: builder.query({
      query: () => "/cart",
    }),

    sync: builder.mutation({
      query: (actions) => ({
        url: "/cart/sync",
        method: "POST",
        body: { actions },
      }),

      async onQueryStarted(actions, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          cartApi.util.updateQueryData("getCart", undefined, (draft) => {
            actions.forEach((action) => {
              const item = draft.items.find(
                (i) => i.product_id === action.product_id
              );

              if (!item) return;

              const price = Number(item.product.price);

              if (action.type === "increase" || action.type === "add") {
                item.quantity += 1;
              }

              if (action.type === "decrease") {
                item.quantity = Math.max(1, item.quantity - 1);
              }

              if (action.type === "remove") {
                draft.items = draft.items.filter(
                  (i) => i.product_id !== action.product_id
                );
              }

              item.total_price = item.quantity * price;
            });

            draft.total = draft.items.reduce(
              (sum, i) => sum + i.quantity * Number(i.product.price),
              0
            );
          })
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),

    getProducts: builder.query({
      query: () => "/products",
    }),
  }),
});

export const {
  useGetCartQuery,
  useSyncMutation,
  useGetProductsQuery,
} = cartApi;
