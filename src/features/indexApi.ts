import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const indexApi = createApi({
  reducerPath: 'apiSlice',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://react-foods-api.vercel.app',

    prepareHeaders: (headers) => {
      headers.set('Accept', 'application/json');
      return headers;
    }
  }),
  tagTypes: ['User', 'Restaurant', 'Food', 'Review'],

  endpoints: () => ({})
});
