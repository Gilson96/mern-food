import { Meal } from '@/hooks/dataTypes';
import { useFavorites } from '@/hooks/useFavorites';
import { HeartIcon } from 'lucide-react';
import UploadImageToImageKit from '../profile/uploadImageToImageKit';
import { useAuth } from '@/features/auth/useAuth';

type RestaurantHeroImageProps = {
  restaurantId?: string;
  restaurant: Meal;
  isLoading: boolean;
  isFetching: boolean;
};

const RestaurantHeroImage = ({ restaurant, isFetching, isLoading }: RestaurantHeroImageProps) => {
  const { toggleFavorite, isFavorite } = useFavorites();
  const { role } = useAuth();
  if (isLoading || isFetching) return <p>loaing</p>;
  const restaurantOwned = restaurant?.admin?.length > 5;

  return (
    <div className="w-full lg:px-[3%]">
      <div
        style={{ backgroundImage: isLoading ? '' : `url(${restaurant?.poster_image})` }}
        className={`${
          isLoading ? 'animate-pulse' : ''
        } flex ${restaurantOwned ? 'justify-between' : 'justify-end'} h-[15rem] w-full gap-1 bg-neutral-400 bg-cover bg-center bg-no-repeat p-[2%] md:h-[20rem] lg:rounded-xl`}
      >
        {restaurantOwned && (
          <UploadImageToImageKit imageUploadEntity="restaurant" restaurantId={restaurant?._id!} />
        )}
        <span
          onClick={() => toggleFavorite(restaurant!)}
          className="flex h-[3rem] w-[3rem] cursor-pointer items-center justify-center rounded-full bg-white shadow-lg"
        >
          {isFavorite(restaurant?._id!) ? <HeartIcon fill="black" /> : <HeartIcon />}
        </span>
      </div>
    </div>
  );
};

export default RestaurantHeroImage;
