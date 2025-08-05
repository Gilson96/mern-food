import { Meal } from '@/hooks/dataTypes';
import RestaurantList from './restaurantList';
import { HomePageProps } from './homePage';
type FeaturedRestaurantProps = {
  setIsFiltered:React.Dispatch<React.SetStateAction<HomePageProps>>
  feature: Meal[] | undefined;
  title: string;
};

function FeaturedRestaurant({ feature, title, setIsFiltered }: FeaturedRestaurantProps) {
  return (
    <div className="scroll flex flex-col gap-3 overflow-x-auto">
      <p className="py-[1%] text-xl font-medium">{title}</p>
      <div className="flex gap-4 py-[2%]">
        {feature?.slice(0, 5).map((res) => (
          <RestaurantList key={res._id} setIsFiltered={setIsFiltered} restaurant={res} />
        ))}
      </div>
    </div>
  );
}

export default FeaturedRestaurant;
