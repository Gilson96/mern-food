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
      <p
        className={`${
          loading ? 'h-[2rem] w-[50%] animate-pulse bg-neutral-300' : 'pb-[2%] text-2xl font-bold'
        } `}
      >
        {!loading && restaurant.name}
      </p>{' '}
      <div className="flex flex-wrap items-center justify-center gap-1">
        <p className={`${restaurantOwned ? 'hidden' : 'flex items-center gap-0.5 text-black'} `}>
          <span className={`${loading && 'h-[1rem] w-[2rem] bg-neutral-300'}`}>
            {!loading && parseFloat(restaurant.rating).toFixed(2)}
          </span>
          <span>
            <StarIcon size={15} fill="black" />
          </span>
        </p>
        <span className={`${restaurantOwned ? 'hidden' : 'text-neutral-500'} `}>&#183;</span>
        <p className={`${loading && 'h-[1rem] w-[7rem] bg-neutral-300'} text-neutral-500`}>
          {!loading && '£' + parseFloat(restaurant.deliveryFee).toFixed(2) + ' Delivery Fee'}
        </p>
        <span className="text-neutral-500">&#183;</span>
        <p className={`${loading && 'h-[1rem] w-[2rem] bg-neutral-300'} text-neutral-500`}>
          {!loading && restaurant.arrival + 'min'}{' '}
        </p>
        <span className="text-neutral-500">&#183;</span>
        <p className={`${loading && 'h-[1rem] w-[2rem] bg-neutral-300'} text-neutral-500`}>
          {!loading && restaurant.address}
        </p>
      </div>
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
      <div className="flex h-full items-end gap-5">
        {/* restaurant name */}
        <p
          className={`${loading && 'h-[1.5rem] w-[9rem] animate-pulse bg-neutral-300'} text-2xl font-bold`}
        >
          {' '}
          {!loading && restaurant.name}
        </p>
        <div className={`flex items-center gap-1`}>
          {/* restaurant rating */}
          <p
            className={`${restaurantOwned ? 'hidden' : loading && 'h-[1.2rem] w-[2rem] animate-pulse bg-neutral-300'}`}
          >
            {!loading && restaurant.rating}
          </p>
          <StarIcon className="h-4 w-4" />
          {/* restaurant address */}
          <span className="text-neutral-500">&#183;</span>
          <div className={`${loading && 'h-[1.2rem] w-[9rem] animate-pulse bg-neutral-300'}`}>
            {!loading && restaurant.address}
          </div>
        </div>
      </div>
      <div className="flex h-[2rem] items-center justify-center gap-3 font-medium text-white">
        <p className="flex w-full items-center gap-2 rounded-full bg-green-500 px-3 py-1">
          <p className={`${loading && 'invisible'}`}>
            {!loading && '£' + Number(restaurant.deliveryFee).toFixed(2)}
          </p>
          <p>Delivery Fee</p>
        </p>
        <p className="flex gap-1 rounded-full bg-neutral-400 px-3 py-1">
          <span className={`${loading && 'invisible'}`}>{!loading && restaurant.arrival}</span>
          <span>min</span>
        </p>
      </div>
    </div>
  );
};
