import {
  usePostToFavouriteMutation,
  useRemoveFromFavouriteMutation,
  useGetUserQuery,
} from '@/features/auth/authApi';
import { toast } from 'sonner';
import { Meal } from './dataTypes';
import { RootState } from '@/store';
import { useSelector } from 'react-redux';

export const useFavorites = () => {
  const { data: userDetails, isLoading, isFetching, refetch } = useGetUserQuery();
  const role = useSelector((state: RootState) => state.auth.role);
  const user_id = useSelector((state: RootState) => state.auth.user_id);

  const user = userDetails?.find((u) => u.name === role);

  const [postToFavourite] = usePostToFavouriteMutation();
  const [removeFromFavourite] = useRemoveFromFavouriteMutation();

  const isFavorite = (restaurantId: string) =>
    user?.favouritesRestaurants?.some((fav) => fav._id === restaurantId);

  const toggleFavorite = async (restaurant: Meal) => {
    if (!user_id) {
      toast.error('User not logged in');
      return;
    }

    const alreadyFavorite = isFavorite(restaurant._id);

    try {
      if (alreadyFavorite) {
        await removeFromFavourite({
          userId: user_id!,
          restaurantId: restaurant._id,
        }).unwrap();
        toast.success('Removed from favorites');
      } else {
        await postToFavourite({
          userId: user_id!,
          body: restaurant,
        }).unwrap();
        toast.success('Added to favorites');
      }
      refetch();
    } catch (err) {
      toast.error('Something went wrong');
      console.error(err);
    }
  };

  return {
    toggleFavorite,
    isFavorite,
    isLoading,
    isFetching,
    refetchUser: refetch,
  };
};
