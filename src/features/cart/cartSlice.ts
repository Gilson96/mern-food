import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';
import { Meal } from '@/hooks/dataTypes';

interface CartState {
  cart: Meal[];
}

const initialState: CartState = {
  cart: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Meal>) => {
      const newItem = action.payload;
      const existingItem = state.cart.find((item: Meal) => item._id === newItem._id);

      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.cart.push({
          _id: action.payload._id,
          name: action.payload.name,
          poster_image: action.payload.poster_image,
          logo_image: action.payload.logo_image,
          deliveryFee: action.payload.deliveryFee,
          arrival: action.payload.arrival,
          address: action.payload.address,
          rating: action.payload.rating,
          category: action.payload.category,
          isCategoryActive: action.payload.isCategoryActive,
          foods: action.payload.foods,
          description: action.payload.description,
          price: action.payload.price,
          quantity: action.payload.quantity + 1,
          restaurant: action.payload.restaurant,
          ratings_and_reviews: undefined,
          date: undefined,
          body: undefined,
        //  foodsInTheBasket: [],
        });
      }
    },

    removeFromCart: (state, action: PayloadAction<Meal>) => {
      const item = state.cart.find((item) => item._id === action.payload._id);

      const itemIndex = state.cart.findIndex((item) => item._id === action.payload._id);

      if (item!.quantity <= 1) {
        state.cart.splice(itemIndex, 1);
      } else {
        item!.quantity--;
      }
    },

    emptyCart: (state) => {
      state.cart = [];
    },
  },
});

export const { addToCart, removeFromCart, emptyCart } = cartSlice.actions;

export const selectedFood = (state: RootState) => state.cart.cart;

export default cartSlice.reducer;
