import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { type PizzaData } from "../../types";
import axios from "axios";
import { BASE_URL } from "../../const/url";
import type { RootState } from "../store";

interface FetchPizzasArgs {
  category: number;
  sortProperty: string;
}

export const fetchPizzas = createAsyncThunk<PizzaData[], FetchPizzasArgs>(
  "pizza/fetchPizzasStatus",
  async ({ category, sortProperty }) => {
    const queryParams: Record<string, string | undefined> = {
      category: category > 0 ? String(category) : undefined,
      sortBy: sortProperty.replace("-", ""),
      order: sortProperty.startsWith("-") ? "desc" : "asc",
    };

    const filteredParams = Object.entries(queryParams).filter(
      ([, value]) => value !== undefined
    );

    const params = new URLSearchParams(filteredParams as [string, string][]);
    const fullUrl = `${BASE_URL}?${params.toString()}`;

    const response = await axios.get<PizzaData[]>(fullUrl);
    return response.data;
  }
);

interface initialStateTypes {
  items: PizzaData[];
  status: "loading" | "succeeded" | "failed";
}

const initialState: initialStateTypes = {
  items: [],
  status: "loading",
};

export const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = "loading";
        state.items = [];
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.status = "failed";
        state.items = [];
      });
  },
});

export const selectPizzaData = (state: RootState) => state.pizzaSlice;

export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;
