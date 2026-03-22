import { cartApi } from "./cartApi";

let timer;

export const cartMiddleware = (store) => (next) => (action) => {

  const result = next(action);

  if (action.type.startsWith("cart/")) {

    clearTimeout(timer);

    timer = setTimeout(() => {

      const state = store.getState();

      if (state.cart.pending.length) {

        store.dispatch(
          cartApi.endpoints.sync.initiate(state.cart.pending)
        );

      }

    }, 5000);
  }

  return result;
};
