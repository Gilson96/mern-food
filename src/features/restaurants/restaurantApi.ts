import { MealResponse } from '@/hooks/dataTypes';
import { indexSlice } from '../indexApi';

const restaurantApi = indexSlice.injectEndpoints({
  endpoints: (build) => ({
    getCategories: build.query<MealResponse, void>({
      query: () => ({ url: '/category' }),
    }),

    getRestaurants: build.query<MealResponse, void>({
      query: () => ({ url: '/restaurant' }),
    }),

    getRestaurant: build.query<MealResponse, string>({
      query: (_id) => ({ url: `/restaurant/${_id}` }),
    }),

    getRestaurantFoods: build.query<MealResponse, string>({
      query: (_id) => {
        return { url: `/${_id}/food` };
      },
    }),

    getRestaurantReviews: build.query<MealResponse, string>({
      query: (_id) => {
        return { url: `/${_id}/reviews` };
      },
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetCategoriesQuery,
  useGetRestaurantsQuery,
  useGetRestaurantQuery,
  useGetRestaurantFoodsQuery,
  useGetRestaurantReviewsQuery,
} = restaurantApi;
