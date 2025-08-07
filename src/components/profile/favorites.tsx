import { ListData, Meal, User } from '@/hooks/dataTypes';
import { XIcon, StarIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

type FavoritesProps = {
  findUser: User;
  listData: ListData;
  toggleFavorite: (restaurant: Meal) => Promise<void>;
  listLoading: boolean;
  userLoading: boolean;
};

const Favorites = ({
  findUser,
  listData,
  toggleFavorite,
  listLoading,
  userLoading,
}: FavoritesProps) => {
  const isLoading = listLoading || userLoading;
  const favorites = findUser?.favouritesRestaurants;

  if (isLoading) {
    return (
      <div className="grid gap-4 py-4 md:grid-cols-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="flex animate-pulse flex-col gap-3 rounded-lg border bg-white p-4 shadow-sm"
          >
            <div className="h-32 w-full rounded bg-neutral-200" />
            <div className="h-4 w-1/2 rounded bg-neutral-300" />
            <div className="h-4 w-1/3 rounded bg-neutral-200" />
          </div>
        ))}
      </div>
    );
  }

  if (!favorites?.length) {
    return (
      <div className="py-6 text-center text-sm text-neutral-500">No favorite restaurants yet.</div>
    );
  }

  return (
    <div className="grid gap-4 py-4 md:grid-cols-2">
      {favorites.map((fav) => {
        const restaurant = listData?.restaurants?.find((res) => res._id === fav._id);
        if (!restaurant) return null;

        return (
          <div
            key={restaurant._id}
            className="relative flex flex-col overflow-hidden rounded-lg border bg-white shadow-md"
          >
            <Link to={`/restaurant/${restaurant._id}`}>
              <img
                src={restaurant.poster_image}
                alt={restaurant.name}
                className="h-40 w-full object-cover"
              />
            </Link>

            <div className="flex flex-col justify-between p-4">
              <div className="flex items-start justify-between">
                <Link to={`/restaurant/${restaurant._id}`}>
                  <h2 className="text-lg font-semibold hover:underline">{restaurant.name}</h2>
                </Link>
                <span className="flex items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-xs text-black">
                  <StarIcon size={14} className="fill-black text-black" />
                  {restaurant.rating}
                </span>
              </div>
              <p className="text-sm text-neutral-600">{restaurant.address}</p>
              <button
                onClick={() => toggleFavorite(restaurant)}
                className="mt-3 inline-flex w-fit cursor-pointer items-center gap-1 text-sm text-red-500 hover:underline"
              >
                <XIcon size={16} />
                Remove
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Favorites;
