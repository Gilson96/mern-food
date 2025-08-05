import { ListData, Meal, User } from '@/hooks/dataTypes';
import { Heart, XIcon } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

type FavoritesProps = {
  findUser: User;
  listData: ListData;
  toggleFavorite: (restaurant: Meal) => Promise<void>;
};

const Favorites = ({ findUser, listData, toggleFavorite }: FavoritesProps) => {
  return (
    <div className="gap-2 py-[2%] md:grid md:grid-cols-2">
      {findUser?.favouritesRestaurants?.map((food) => {
        const findRestaurant = listData?.restaurants?.filter((res) => res._id === food._id);
        return (
          <div className="flex flex-col items-start justify-start">
            {findRestaurant?.map((res) => (
              <div className="my-[1%] flex h-auto w-full">
                <Link to={`/restaurant/${res._id}`}>
                  <img src={res.poster_image} className="h-[5rem] w-full rounded md:h-[8rem]" />
                </Link>
                <div className="flex w-full flex-col justify-around px-[2%]">
                  <div className="flex w-full items-center justify-between">
                    <Link to={`/restaurant/${res._id}`}>
                      <p className="font-medium hover:underline">{res.name}</p>
                    </Link>
                    <p className="flex items-center justify-center rounded-full bg-neutral-200 p-[2%] text-xs">
                      {res.rating}
                    </p>
                  </div>
                  <div
                    onClick={() => toggleFavorite(res)}
                    className="flex cursor-pointer items-end"
                  >
                    <XIcon size={20} color="oklch(70.4% 0.191 22.216)" />
                    <p className="text-red-400">remove</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default Favorites;
