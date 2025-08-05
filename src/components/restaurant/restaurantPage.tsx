import { useGetRestaurantQuery } from '@/features/restaurants/restaurantApi';
import useScreenSize from '@/hooks/useScreenSize';
import { useLocation, useParams } from 'react-router-dom';
import Navigator from '../navigator/navigator';
import { useListTabsData } from '@/hooks/useListTabsData';
import RestaurantHeroImage from './restaurantHeroImage';
import { RestaurantDetailsLargeScreen, RestaurantDetailsSmallScreen } from './restaurantDetails';
import Reviews from './reviews';
import Menu from './menu';

const RestaurantPage = () => {
  const { state } = useLocation();
  const { restaurantId } = useParams();
  const { data: restaurant, isLoading, isFetching } = useGetRestaurantQuery(restaurantId!);
  const { listData, isLoading: ListIsLoading, isFetching: ListIsFetching } = useListTabsData();
  const screenSize = useScreenSize();
  const listDataLoading = ListIsFetching || ListIsLoading;


  return (
    <main>
      <Navigator
        loading={listDataLoading}
        listData={listData}
        setIsFiltered={() => {}}
      />
      <main className="flex h-full w-full flex-col items-center justify-center">
        {/* Hero image */}
        <RestaurantHeroImage
          restaurantId={restaurant?._id}
          isLoading={isLoading}
          isFetching={isFetching}
          restaurant={restaurant!}
        />
        {/* Restaurant Details */}
        {screenSize.width < 1024 ? (
          <>
            <RestaurantDetailsSmallScreen
              restaurant={restaurant!}
              isLoading={isLoading}
              isFetching={isFetching}
            />
            <hr className="h-[1px] w-full bg-neutral-100" />
          </>
        ) : (
          <>
            <RestaurantDetailsLargeScreen
              restaurant={restaurant!}
              isLoading={isLoading}
              isFetching={isFetching}
            />
            <hr className="mb-[2%] h-[1px] w-full bg-neutral-100 lg:w-[94%]" />
          </>
        )}
        <p className="w-full p-[3%] pt-[5%] text-left text-xl font-bold lg:pt-0">Reviews</p>
        <Reviews restaurantId={restaurantId!} />
        <hr className="mt-[2%] h-[1px] w-full bg-neutral-100 lg:w-[94%]" />{' '}
        <Menu restaurant={restaurant!} />
      </main>
    </main>
  );
};

export default RestaurantPage;
