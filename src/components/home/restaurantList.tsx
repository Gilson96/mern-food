import { useAuth } from '@/features/auth/useAuth';
import { Meal } from '@/hooks/dataTypes';
import { Heart, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useFavorites } from '@/hooks/useFavorites';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { HomePageProps } from './homePage';

type RestaurantListProps = {
  restaurant: Meal;
  setIsFiltered: React.Dispatch<React.SetStateAction<HomePageProps>>;
};

const RestaurantList = ({ restaurant, setIsFiltered }: RestaurantListProps) => {
  const user = useAuth();
  const userRole = user.role;
  const { toggleFavorite, isFavorite, isLoading } = useFavorites();

  return (
    <section>
      <div className="flex flex-col gap-2">
        <Link to={`/restaurant/${restaurant._id}`}>
          <div
            style={{ backgroundImage: `url(${restaurant.poster_image})` }}
            className="h-[10rem] w-[15rem] rounded-2xl bg-cover bg-center bg-no-repeat"
          ></div>
        </Link>
        <div className="flex flex-col">
          <div className="flex w-full items-center justify-between">
            <p className="text-lg font-medium">{restaurant.name}</p>
            {userRole === 'guest' ? (
              <Popover>
                <PopoverTrigger>
                  <Heart size={20} />
                </PopoverTrigger>
                <PopoverContent className="flex h-[2px] w-auto items-center justify-center bg-red-500 font-medium text-white">
                  <p className="text-xs">Login required</p>
                </PopoverContent>
              </Popover>
            ) : (
              <button onClick={() => toggleFavorite(restaurant)} disabled={isLoading}>
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
              <p>{Number(restaurant.rating).toFixed(2)}</p>
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
