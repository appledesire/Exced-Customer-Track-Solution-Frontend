import { CartData } from "@/lib/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: CartData = {
  userId: "",
  event: "",
  data: {
    productName: "",
    numberOfProduct: "",
    price: "",
  },
};

export const cartData = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartData: (state, action) => {
      state = {
        ...state,
        ...action.payload,
      };
    },
    setNumberOfProducts: (state, action) => {
      state = {
        ...state,
        data: {
          ...state.data,
          numberOfProduct: action.payload,
        },
      };
    },
  },
});

export const { setCartData, setNumberOfProducts } = cartData.actions;
export default cartData.reducer;
