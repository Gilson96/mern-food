import { User, ListData } from '@/hooks/dataTypes';
import { Link } from 'react-router-dom';

type OwnedRestaurantProps = {
  listData: ListData;
  findUser: User;
  listLoading: boolean;
  userLoading: boolean;
};

const OwnedRestaurant = ({
  listData,
  findUser,
  listLoading,
  userLoading,
}: OwnedRestaurantProps) => {
  const loading = listLoading || userLoading;

  const findOwnedRestaurants = listData?.restaurants?.filter((res) => res.admin === findUser._id);

  console.log(findOwnedRestaurants)
  return (
    <div>
      <p className="my-[1%] font-medium">Owned Restaurants</p>
      <div className="flex flex-col gap-3">
        {loading ? (
          Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="h-[4rem] animate-pulse rounded border bg-neutral-200 p-[2%]"
            />
          ))
        ) : findOwnedRestaurants?.length ? (
          findOwnedRestaurants.map((own) => (
            <Link
              key={own._id}
              to={`/restaurant/${own._id}`}
              className="flex cursor-pointer items-center justify-between border p-[2%] shadow hover:bg-neutral-100"
            >
              <p>{own.name}</p>
              <p>{own.address}</p>
            </Link>
          ))
        ) : (
          <p className="text-sm text-neutral-500">No owned restaurants found.</p>
        )}
      </div>
    </div>
  );
};

export default OwnedRestaurant;
