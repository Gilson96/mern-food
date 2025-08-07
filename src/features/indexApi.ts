import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const indexApi = createApi({
  reducerPath: 'apiSlice',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://react-food-api-03d094431a6b.herokuapp.com/',
    // Send credentials (cookies) with every request
    credentials: 'include',
    prepareHeaders: (headers) => {
      headers.set('Accept', 'application/json');
      return headers;
    }
  }),
  tagTypes: ['User', 'Restaurant', 'Food', 'Review'],

  endpoints: (build) => ({})
});
