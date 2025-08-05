import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';
import { Food, Meal } from '@/hooks/dataTypes';

export interface RestaurantCart {
  restaurant: string; // or use a full restaurant object if needed
  foods: Food[];
}

interface CartState {
  cart: RestaurantCart[];
}

const initialState: CartState = {
  cart: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Food>) => {
      const newItem = action.payload;
      const restaurantId = newItem.restaurant;

      // Find the restaurant in the cart
      const restaurantEntry = state.cart.find((entry) => entry.restaurant === restaurantId);

      if (restaurantEntry) {
        const existingFood = restaurantEntry.foods.find((food) => food._id === newItem._id);

        if (existingFood) {
          existingFood.quantity++;
        } else {
          restaurantEntry.foods.push({ ...newItem, quantity: 1 });
        }
      } else {
        state.cart.push({
          restaurant: restaurantId,
          foods: [{ ...newItem, quantity: 1 }],
        });
      }
    },

    removeFromCart: (state, action: PayloadAction<Food>) => {
      const { _id, restaurant } = action.payload;
      const restaurantEntry = state.cart.find((entry) => entry.restaurant === restaurant);

      if (!restaurantEntry) return;

      const foodIndex = restaurantEntry.foods.findIndex((item) => item._id === _id);

      if (foodIndex === -1) return;

      if (restaurantEntry.foods[foodIndex].quantity <= 1) {
        restaurantEntry.foods.splice(foodIndex, 1);
      } else {
        restaurantEntry.foods[foodIndex].quantity--;
      }

      // Remove restaurant entry if no foods left
      if (restaurantEntry.foods.length === 0) {
        state.cart = state.cart.filter((entry) => entry.restaurant !== restaurant);
      }
    },

    emptyCart: (state) => {
      state.cart = [];
    },
  },
});

export const { addToCart, removeFromCart, emptyCart } = cartSlice.actions;

export const selectedFood = (state: RootState) => state.cart.cart;
export const foodsTotalPrice = (state: RootState) => {
  return state.cart.cart.reduce((total, restaurantEntry) => {
    const restaurantTotal = restaurantEntry.foods.reduce((sum, item) => {
      return sum + parseFloat(item.price!) * item.quantity;
    }, 0);
    return total + restaurantTotal;
  }, 0);
};
export const deliveryFeeTotal = (state: RootState, restaurants: Meal[] | undefined): number => {
  return state.cart.cart.reduce((total, entry) => {
    const restaurant = restaurants?.find((r) => r._id === entry.restaurant);
    const fee = restaurant ? parseFloat(restaurant.deliveryFee) : 0;
    return total + fee;
  }, 0);
};

export default cartSlice.reducer;
