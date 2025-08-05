import { User, ListData } from '@/hooks/dataTypes';
import { Link } from 'react-router-dom';
type OwnedRestaurantProps = {
  listData: ListData;
  findUser: User;
};

const OwnedRestaurant = ({ listData, findUser }: OwnedRestaurantProps) => {
  const categories = listData?.categories;
  const findOwnedRestaurants = listData?.restaurants?.filter((res) => res.admin === findUser._id);
 return (
    <div>
      <p className="my-[1%] font-medium">Owned Restaurants</p>
      <div className="flex flex-col gap-3">
        {findOwnedRestaurants?.map((own, index) => (
          <Link
            to={`/restaurant/${own._id}`}
            className="flex cursor-pointer items-center justify-between border p-[2%] shadow hover:bg-neutral-100"
          >
            <p>{own.name}</p>
            <p>{own.address}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default OwnedRestaurant;
