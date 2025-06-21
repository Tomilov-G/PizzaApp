import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type CartItem } from "../../types";
import type { RootState } from "../store";
import { getCartFromLocalStorage } from "../../utils/getCartFromLocalStorage";
import { calcTotalPrice } from "../../utils/calcTotalPrice";

interface initialStateTypes {
  totalPrice: number;
  items: CartItem[];
}

const { items, totalPrice } = getCartFromLocalStorage();

const initialState: initialStateTypes = {
  totalPrice,
  items,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<Omit<CartItem, "count">>) {
      const payload = action.payload;
      const found = state.items.find(
        (item) =>
          item.id === payload.id &&
          item.type === payload.type &&
          item.size === payload.size
      );
      if (found) {
        found.count++;
      } else {
        state.items.push({ ...payload, count: 1 });
      }
      state.totalPrice = calcTotalPrice(state.items);
    },
    removeItem(
      state,
      action: PayloadAction<Pick<CartItem, "id" | "type" | "size">>
    ) {
      const { id, type, size } = action.payload;
      state.items = state.items.filter(
        (obj) => obj.id !== id || obj.type !== type || obj.size !== size
      );
      state.totalPrice = calcTotalPrice(state.items);
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
    plusItem(
      state,
      action: PayloadAction<Pick<CartItem, "id" | "type" | "size">>
    ) {
      const { id, type, size } = action.payload;
      const findItem = state.items.find(
        (obj) => obj.id === id && obj.type === type && obj.size === size
      );
      if (findItem) {
        findItem.count++;
      }
      state.totalPrice = calcTotalPrice(state.items);
    },
    minusItem(
      state,
      action: PayloadAction<Pick<CartItem, "id" | "type" | "size">>
    ) {
      const { id, type, size } = action.payload;
      const findItem = state.items.find(
        (obj) => obj.id === id && obj.type === type && obj.size === size
      );
      if (findItem) {
        findItem.count--;
      }
      state.totalPrice = calcTotalPrice(state.items);
    },
  },
});

export const selectCart = (state: RootState) => state.cartSlice;

export const { addItem, removeItem, clearItems, plusItem, minusItem } =
  cartSlice.actions;

export default cartSlice.reducer;
