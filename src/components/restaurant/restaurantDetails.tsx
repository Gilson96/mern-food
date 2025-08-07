import { Meal } from '@/hooks/dataTypes';
import { StarIcon } from 'lucide-react';

type RestaurantDetailsProps = {
  restaurant: Meal;
  isLoading: boolean;
  isFetching: boolean;
};

export const RestaurantDetailsSmallScreen = ({
  restaurant,
  isLoading,
  isFetching,
}: RestaurantDetailsProps) => {
  const loading = !restaurant || isLoading || isFetching;
  const restaurantOwned = restaurant?.admin?.length > 5;

  return (
    <section className="flex flex-col items-center justify-center p-[2%]">
      {loading ? (
        <>
          <div className="h-[2rem] w-[50%] animate-pulse rounded bg-neutral-300" />
          <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
            <div className="h-[1rem] w-[2rem] animate-pulse rounded bg-neutral-300" />
            <div className="h-[1rem] w-[6rem] animate-pulse rounded bg-neutral-300" />
            <div className="h-[1rem] w-[3rem] animate-pulse rounded bg-neutral-300" />
            <div className="h-[1rem] w-[6rem] animate-pulse rounded bg-neutral-300" />
          </div>
        </>
      ) : (
        <>
          <p className="pb-[2%] text-2xl font-bold">{restaurant.name}</p>
          <p>{restaurant.address}</p>
          <div className="flex flex-wrap items-center justify-center gap-1 text-sm text-neutral-500">
            {!restaurantOwned && (
              <>
                <p className="flex items-center gap-0.5 text-black">
                  {Number(restaurant.rating).toFixed(2)}
                  <StarIcon size={15} fill="black" />
                </p>
                <span>&#183;</span>
              </>
            )}
            <p>£{Number(restaurant.deliveryFee).toFixed(2)} Delivery Fee</p>
            <span>&#183;</span>
            <p>{restaurant.arrival} min</p>
            <span>&#183;</span>
            <p>{restaurant.address}</p>
          </div>
        </>
      )}
    </section>
  );
};

export const RestaurantDetailsLargeScreen = ({
  restaurant,
  isLoading,
  isFetching,
}: RestaurantDetailsProps) => {
  const loading = !restaurant || isLoading || isFetching;
  const restaurantOwned = restaurant?.admin?.length > 5;

  return (
    <div className="flex w-full items-center justify-between gap-5 p-[3%]">
      {loading ? (
        <>
          <div className="flex flex-col gap-2">
            <div className="h-[1.5rem] w-[9rem] animate-pulse rounded bg-neutral-300" />
            <div className="flex gap-2">
              <div className="h-[1rem] w-[3rem] animate-pulse rounded bg-neutral-300" />
              <div className="h-[1rem] w-[8rem] animate-pulse rounded bg-neutral-300" />
            </div>
          </div>
          <div className="flex gap-3">
            <div className="h-[2rem] w-[7rem] animate-pulse rounded-full bg-neutral-300" />
            <div className="h-[2rem] w-[5rem] animate-pulse rounded-full bg-neutral-300" />
          </div>
        </>
      ) : (
        <>
          <div className="flex h-full items-end gap-5">
            <p className="text-2xl font-bold">{restaurant.name}</p>
            <p>{restaurant.address}</p>
            {!restaurantOwned && (
              <div className="flex items-center gap-1 text-neutral-500">
                <p className="text-black">{restaurant.rating}</p>
                <StarIcon className="h-4 w-4" />
                <span>&#183;</span>
                <p>{restaurant.address}</p>
              </div>
            )}
          </div>
          <div className="flex h-[2rem] items-center justify-center gap-3 font-medium text-white">
            <p className="flex items-center gap-2 rounded-full bg-green-500 px-3 py-1">
              <span>£{Number(restaurant.deliveryFee).toFixed(2)}</span>
              <span>Delivery Fee</span>
            </p>
            <p className="flex gap-1 rounded-full bg-neutral-400 px-3 py-1">
              <span>{restaurant.arrival}</span>
              <span>min</span>
            </p>
          </div>
        </>
      )}
    </div>
  );
};
