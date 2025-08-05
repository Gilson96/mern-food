import {
  useGetCategoriesQuery,
  useGetRestaurantsQuery,
  useGetFoodsQuery,
} from '@/features/restaurants/restaurantApi';

export const useListTabsData = (restaurant_id?: string) => {
  const categoriesQuery = useGetCategoriesQuery();
  const restaurantsQuery = useGetRestaurantsQuery();
  const foodsQuery = useGetFoodsQuery(restaurant_id!);

  return {
    listData: {
      categories: categoriesQuery.data,
      restaurants: restaurantsQuery.data,
      foods: foodsQuery.data,
    },
    isLoading: categoriesQuery.isLoading || restaurantsQuery.isLoading || foodsQuery.isLoading,
    isFetching: categoriesQuery.isFetching || restaurantsQuery.isFetching || foodsQuery.isFetching,
    refetch: restaurantsQuery.refetch || foodsQuery.refetch,
  };
};
