import {
  usePostToFavouriteMutation,
  useRemoveFromFavouriteMutation,
  useGetUserQuery,
} from '@/features/auth/authApi';
import { toast } from 'sonner';
import { Meal } from './dataTypes';
import { useAuth } from '@/features/auth/useAuth';

export const useFavorites = () => {
  const { data: userDetails, isLoading, isFetching, refetch } = useGetUserQuery();
  const authUser = useAuth();

  const matchedUser = userDetails?.find((u) => u.name === authUser.role);
  const userFavorites = matchedUser?.favouritesRestaurants ?? [];
  const userId = matchedUser?._id ?? '';

  const [postToFavourite] = usePostToFavouriteMutation();
  const [removeFromFavourite] = useRemoveFromFavouriteMutation();

  const isFavorite = (restaurantId: string) =>
    userFavorites.some((fav) => fav._id === restaurantId);

  const toggleFavorite = async (restaurant: Meal) => {
    if (!userId) {
      toast.error('User not logged in');
      return;
    }

    const alreadyFavorite = isFavorite(restaurant._id);

    try {
      if (alreadyFavorite) {
        await removeFromFavourite({
          userId,
          restaurantId: restaurant._id,
        }).unwrap();
        toast.success('Removed from favorites');
      } else {
        await postToFavourite({
          userId,
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
    matchedUser
  };
};
