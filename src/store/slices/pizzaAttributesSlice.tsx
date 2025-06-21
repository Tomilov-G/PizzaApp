import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AttributesState {
  sizeByPizza: Record<number, number>;
  doughByPizza: Record<number, number>;
}

const initialState: AttributesState = {
  sizeByPizza: {},
  doughByPizza: {},
};

export const pizzaAttributesSlice = createSlice({
  name: "attributes",
  initialState,
  reducers: {
    setActiveSizeForPizza(
      state,
      action: PayloadAction<{ pizzaId: number; size: number }>
    ) {
      const { pizzaId, size } = action.payload;
      state.sizeByPizza[pizzaId] = size;
    },
    setActiveDoughForPizza(
      state,
      action: PayloadAction<{ pizzaId: number; dough: number }>
    ) {
      const { pizzaId, dough } = action.payload;
      state.doughByPizza[pizzaId] = dough;
    },
  },
});

export const { setActiveSizeForPizza, setActiveDoughForPizza } =
  pizzaAttributesSlice.actions;
export default pizzaAttributesSlice.reducer;
