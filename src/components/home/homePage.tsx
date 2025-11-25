import useScreenSize from '@/hooks/useScreenSize';
import Navigator from '../navigator/navigator';
import { useListTabsData } from '@/hooks/useListTabsData';
import { ListData } from '@/hooks/dataTypes';
import Categories from './categories';
import FeaturedRestaurant from './featuredRestaurant';
import Filters from './Filters';
import { useState } from 'react';
import FilteredRestaurant from './filteredRestaurant';
import SearchRestaurantMobile from './searchRestaurantMobile';
import { useLocation } from 'react-router-dom';

export type SearchRestaurantProps = {
  listData: ListData;
  loading: boolean;
  setIsFiltered: React.Dispatch<React.SetStateAction<HomePageProps>>;
};

export type HomePageProps = {
  category?: string;
  sortBy?: string;
  price?: string;
};

const HomePage = () => {
  const { state } = useLocation();
  const [isFiltered, setIsFiltered] = useState<HomePageProps>({
    category: state?.categoryId || 'All',
    sortBy: 'All',
    price: 'lowest',
  });
  const screenSize = useScreenSize();
  const { listData, isLoading, isFetching } = useListTabsData(undefined);
  const loading = isLoading || isFetching;

  const highestRatedRestaurant = listData?.restaurants?.filter(
    (restaurant) => parseFloat(restaurant.rating) > 4.5,
  );
  const lowCostFeeRestaurant = listData?.restaurants?.filter(
    (restaurant) => parseFloat(restaurant.deliveryFee) < 5,
  );
  const fastestRestaurant = listData?.restaurants?.filter((restaurant) => restaurant.arrival < 29);
  return (
    <>
      <Navigator loading={loading} setIsFiltered={setIsFiltered} listData={listData} />

      <main className="flex flex-col px-[3%]">
        {screenSize.width <= 767 && (
          <SearchRestaurantMobile
            setIsFiltered={setIsFiltered}
            listData={listData}
            loading={loading}
          />
        )}

        {/* categories & filters */}
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          {/* <Categories
            loading={loading}
            categories={listData?.categories!}
            setIsFiltered={setIsFiltered}
          /> */}
          <div className='w-full place-items-end my-[0.5rem]'>
            <Filters setIsFiltered={setIsFiltered} isFiltered={isFiltered} />
          </div>
        </div>
        <hr className="my-[1rem] h-[1px] bg-neutral-100" />

        {/* restaurantList */}
        <div className="flex">
          {(isFiltered.category && isFiltered.category !== 'All') ||
          (isFiltered.sortBy && isFiltered.sortBy !== 'All') ? (
            <FilteredRestaurant
              isFiltered={isFiltered}
              loading={loading}
              listData={listData}
              setIsFiltered={setIsFiltered}
              title={listData.categories?.find((cat) => cat._id === isFiltered.category)?.name!}
            />
          ) : (
            <div className="flex flex-col gap-5 overflow-hidden">
              <FeaturedRestaurant
                setIsFiltered={setIsFiltered}
                feature={highestRatedRestaurant}
                title="Highest rated"
                loading={loading}
              />
              <FeaturedRestaurant
                setIsFiltered={setIsFiltered}
                feature={fastestRestaurant}
                title="In a rush"
                loading={loading}
              />
              <FeaturedRestaurant
                setIsFiltered={setIsFiltered}
                feature={lowCostFeeRestaurant}
                title="Low cost delivery"
                loading={loading}
              />
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default HomePage;
