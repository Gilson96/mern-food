import { Meal } from '@/hooks/dataTypes';
import { Heart, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useFavorites } from '@/hooks/useFavorites';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { RootState } from '@/store';
import { useSelector } from 'react-redux';

type RestaurantListProps = {
  restaurant: Meal;
  loading?: boolean;
};

const RestaurantList = ({ restaurant, loading }: RestaurantListProps) => {
  const role = useSelector((state: RootState) => state.auth.role);
  const { toggleFavorite, isFavorite, isLoading } = useFavorites();

  if (loading) {
    return (
      <section>
        <div className="flex animate-pulse flex-col gap-2">
          <div className="h-[10rem] w-[9rem] rounded-2xl bg-neutral-200 md:w-[15rem]" />
          <div className="h-4 w-3/4 rounded bg-neutral-300" />
          <div className="flex items-center gap-2">
            <div className="h-3 w-10 rounded bg-neutral-200" />
            <div className="h-3 w-16 rounded bg-neutral-200" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className="flex flex-col gap-2">
        <Link to={`/restaurant/${restaurant._id}`}>
          {restaurant.poster_image !== undefined ? (
            <div
              style={{ backgroundImage: `url(${restaurant.poster_image})` }}
              className="h-[10rem] w-full rounded-2xl bg-cover bg-center bg-no-repeat md:w-[15rem]"
            />
          ) : (
            <div className="h-[10rem] text-white font-bold text-center text-xl bg-neutral-500 w-full place-content-center items-center justify-center rounded-2xl border md:w-[15rem]">
              {restaurant.name}
            </div>
          )}
        </Link>
        <div className="flex flex-col">
          <div className="flex w-full items-center justify-between">
            <p className="text-sm font-medium md:text-lg">{restaurant.name}</p>
            {role === 'guest' ? (
              <Popover>
                <PopoverTrigger>
                  <Heart size={20} />
                </PopoverTrigger>
                <PopoverContent className="flex h-[2px] w-auto items-center justify-center bg-red-500 font-medium text-white">
                  <p className="text-xs">Login required</p>
                </PopoverContent>
              </Popover>
            ) : (
              <button
                className="cursor-pointer"
                onClick={() => toggleFavorite(restaurant)}
                disabled={isLoading}
              >
                {isFavorite(restaurant._id) ? (
                  <Heart size={20} fill="black" />
                ) : (
                  <Heart size={20} />
                )}
              </button>
            )}
          </div>
          <div className="flex items-center gap-0.5 pb-[5%]">
            <div className="flex items-center">
              <p>
                {restaurant.rating === undefined ? 'N/A' : Number(restaurant.rating).toFixed(2)}
              </p>
              <Star size={15} fill="black" />
            </div>
            <div className="flex items-center gap-0.5">
              <span>·</span>
              <p className="text-neutral-500">{restaurant.arrival}min</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RestaurantList;
