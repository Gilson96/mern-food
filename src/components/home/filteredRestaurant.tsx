import React, { useMemo } from 'react';
import RestaurantList from './restaurantList';
import { HomePageProps } from './homePage';
import { ListData } from '@/hooks/dataTypes';

type FilteredRestaurantProps = {
  title: string;
  setIsFiltered: React.Dispatch<React.SetStateAction<HomePageProps>>;
  isFiltered: HomePageProps;
  listData: ListData;
  loading: boolean;
};

const FilteredRestaurant = ({
  listData,
  loading,
  title,
  setIsFiltered,
  isFiltered,
}: FilteredRestaurantProps) => {
  const filteredRestaurantBySort = () => {
    if (!listData.restaurants) return [];

    let filtered = [...listData.restaurants];
    const { category, sortBy, price } = isFiltered;

    const hasCategory = category !== 'All';
    const hasSortBy = sortBy !== 'All';

    if (hasCategory) {
      filtered = filtered.filter((res) => res.category === category);
    }

    if (hasSortBy) {
      if (sortBy === 'Arrival') {
        filtered.sort((a, b) => a.arrival - b.arrival);
      } else if (sortBy === 'Rating') {
        filtered.sort((a, b) => +b.rating - +a.rating);
      } else if (sortBy === 'Delivery') {
        filtered.sort((a, b) => +a.deliveryFee - +b.deliveryFee);
      }

      if (price === 'Highest') {
        filtered.sort((a, b) => +b.deliveryFee - +a.deliveryFee);
      } else if (price === 'Lowest') {
        filtered.sort((a, b) => +a.deliveryFee - +b.deliveryFee);
      }
    }

    return filtered;
  };

  const filteredRestaurants = useMemo(
    () => filteredRestaurantBySort(),
    [listData.restaurants, isFiltered],
  );

  return (
    <div className="w-full">
      <p className="py-[2%] text-xl font-medium capitalize">{title}</p>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-[5rem]">
        {filteredRestaurants.map((res) => (
          <RestaurantList key={res._id} restaurant={res} loading={loading} />
        ))}
      </div>
    </div>
  );
};

export default FilteredRestaurant;
