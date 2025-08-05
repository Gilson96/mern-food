import { Meal, Food, Review } from '@/hooks/dataTypes';
import { indexApi } from '../indexApi';

const restaurantApi = indexApi.injectEndpoints({
  endpoints: (build) => ({
    getCategories: build.query<[{ _id: string; name: string }], void>({
      query: () => ({ url: '/categories' }),
    }),

    getRestaurants: build.query<Meal[], void>({
      query: () => ({ url: '/restaurants' }),
      providesTags: ['Restaurant'],
    }),

    getRestaurant: build.query<Meal, string>({
      query: (_id) => ({ url: `/restaurant/${_id}` }),
      providesTags: ['Restaurant'],
    }),

    getFoods: build.query<Food[], string>({
      query: () => ({ url: `foods` }),
      providesTags: (result, error, restaurantId) => [{ type: 'Food', id: restaurantId }],
    }),

    getRestaurantReviews: build.query<Review, string>({
      query: (_id) => {
        return { url: `/${_id}/reviews` };
      },
      providesTags: (result, error, restaurantId) => [{ type: 'Review', id: restaurantId }],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetCategoriesQuery,
  useGetRestaurantsQuery,
  useGetRestaurantQuery,
  useGetFoodsQuery,
  useGetRestaurantReviewsQuery,
} = restaurantApi;
