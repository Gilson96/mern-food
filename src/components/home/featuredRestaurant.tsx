import { Meal } from '@/hooks/dataTypes';
import RestaurantList from './restaurantList';
import { HomePageProps } from './homePage';

type FeaturedRestaurantProps = {
  setIsFiltered: React.Dispatch<React.SetStateAction<HomePageProps>>;
  feature: Meal[] | undefined;
  title: string;
  loading: boolean;
};

function FeaturedRestaurant({ loading, feature, title, setIsFiltered }: FeaturedRestaurantProps) {
  return (
    <div className="flex flex-col gap-3">
      <p className="py-[1%] text-xl font-medium">{title}</p>

      <div className="scrollbar-thin scrollbar-thumb-neutral-500 scrollbar-track-neutral-200 flex gap-4 overflow-x-auto px-1 py-[2%]">
        {loading
          ? Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="min-w-[10rem] md:min-w-[15rem]">
                <RestaurantList loading={true} restaurant={{} as Meal} />
              </div>
            ))
          : feature?.slice(0, 5).map((res) => (
              <div key={res._id} className="min-w-[10rem] md:min-w-[15rem]">
                <RestaurantList loading={false} restaurant={res} />
              </div>
            ))}
      </div>
    </div>
  );
}

export default FeaturedRestaurant;
