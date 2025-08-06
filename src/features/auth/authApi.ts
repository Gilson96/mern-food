import { Food, LoginRequest, Meal, PaymentIntent, User, UserResponse } from '@/hooks/dataTypes';
import { indexApi } from '../indexApi';

const auth = indexApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<UserResponse, LoginRequest>({
      query: (credentials) => ({
        url: 'login',
        method: 'POST',
        body: credentials,
        credentials: 'include',
      }),
      invalidatesTags: ['User'],
    }),

    getUser: build.query<User[], void>({
      query: () => ({ url: 'user', credentials: "include" }),
      providesTags: ['User'],
    }),

    logout: build.mutation<UserResponse, void>({
      query: () => ({
        url: 'logout',
        method: 'POST',
      }),
      invalidatesTags: ['User'],
    }),

    postToFavourite: build.mutation<
      UserResponse,
      {
        userId: string | undefined;
        body: {
          _id: string;
          name: string;
          deliveryFee: string;
          arrival: number;
          rating: string;
          poster_image: string;
        };
      }
    >({
      query: ({ userId, body }) => ({
        url: `${userId}/favourites`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['User'],
    }),

    removeFromFavourite: build.mutation<
      UserResponse,
      { userId: string | undefined; restaurantId: string | undefined }
    >({
      query: ({ userId, restaurantId }) => ({
        url: `${userId}/favourites/${restaurantId}`,
        method: 'POST',
      }),
      invalidatesTags: ['User'],
    }),

    postToOrders: build.mutation<
      UserResponse,
      {
        _id: string;
        body: {
          foods: Food[];
          totalPrice: number;
          timeStamp: number;
        };
      }
    >({
      query: (data) => {
        const { _id, body } = data;
        return {
          url: `${_id}/orders`,
          method: 'POST',
          body,
        };
      },
      invalidatesTags: ['User'],
    }),

    postPayementIntent: build.mutation<PaymentIntent, PaymentIntent>({
      query: (body) => ({
        url: `payment-intent`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['User'],
    }),

    postCreateRestaurant: build.mutation({
      query: ({ categoryId, body }: { categoryId: string; body: FormData }) => ({
        url: `restaurant/${categoryId}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Restaurant'],
    }),

    putUpdateRestaurant: build.mutation({
      query: ({
        restaurantId,
        body,
      }: {
        restaurantId: string;
        body: { poster_image: string };
      }) => ({
        url: `restaurant/${restaurantId}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Restaurant'],
    }),

    postCreateFood: build.mutation({
      query: ({ restaurantId, body }) => ({
        url: `${restaurantId}/food`,
        method: 'POST',
        body,
      }),
      invalidatesTags: (result, error, { restaurantId }) => [{ type: 'Food', id: restaurantId }],
    }),

    putUpdateFood: build.mutation({
      query: ({
        restaurantId,
        foodId,
        body,
      }: {
        restaurantId: string;
        foodId: string;
        body: { poster_image: string };
      }) => ({
        url: `${restaurantId}/food/${foodId}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Food'],
    }),
    postCreateReview: build.mutation({
      query: ({ restaurantId, body }) => ({
        url: `${restaurantId}/reviews`,
        method: 'POST',
        body,
      }),
      invalidatesTags: (result, error, { restaurantId }) => [{ type: 'Review', id: restaurantId }],
    }),
  }),

  overrideExisting: true,
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useGetUserQuery,
  usePostToFavouriteMutation,
  useRemoveFromFavouriteMutation,
  usePostToOrdersMutation,
  usePostPayementIntentMutation,
  usePostCreateRestaurantMutation,
  usePostCreateFoodMutation,
  usePutUpdateRestaurantMutation,
  usePutUpdateFoodMutation,
  usePostCreateReviewMutation
} = auth;
