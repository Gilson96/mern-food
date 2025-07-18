import { LoginRequest, Meal, PaymenyIntent, User, UserResponse } from '@/hooks/dataTypes';
import { indexApi } from '../indexApi';

const auth = indexApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<UserResponse, LoginRequest>({
      query: (credentials) => ({
        url: 'login',
        method: 'POST',
        body: credentials,
      }),
    }),

    getUser: build.query<User, void>({
      query: () => ({ url: '/user' }),
    }),

    logout: build.mutation<UserResponse, void>({
      query: () => ({
        url: 'logout',
        method: 'POST',
      }),
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
      query: (data) => {
        const { userId, body } = data;
        return {
          url: `${userId}/favourites`,
          method: 'POST',
          body,
        };
      },
    }),

    removeFromFavourite: build.mutation<
      UserResponse,
      { userId: string | undefined; restaurantId: string | undefined }
    >({
      query: (data) => {
        const { userId, restaurantId } = data;
        return {
          url: `${userId}/favourites/${restaurantId}`,
          method: 'POST',
        };
      },
    }),

    postToOrders: build.mutation<
      UserResponse,
      {
        _id: string;
        body: {
          restaurantId: string;
          foods: Meal[];
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
    }),

    postPayementIntent: build.mutation<PaymenyIntent, PaymenyIntent>({
      query: (body) => ({
        url: `payment-intent`,
        method: 'POST',
        body,
      }),
    }),
  }),

  overrideExisting: false,
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useGetUserQuery,
  usePostToFavouriteMutation,
  useRemoveFromFavouriteMutation,
  usePostToOrdersMutation,
  usePostPayementIntentMutation,
} = auth;
