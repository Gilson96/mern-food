import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';
import SearchRestaurantTabsContent, {
  categoryIcon,
  renderAvatar,
} from './searchRestaurantTabsContent';
import { Link } from 'react-router-dom';
import { HomePageProps } from './homePage';
import { ListData } from '@/hooks/dataTypes';

type SearchRestaurantTabsProps = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  listData: ListData;
  loading: boolean;
  setIsFiltered: React.Dispatch<React.SetStateAction<HomePageProps>>;
};

const SearchRestaurantTabs = ({
  setOpen,
  listData,
  loading,
  setIsFiltered,
}: SearchRestaurantTabsProps) => {
  const [selectedList, setSelectedList] = useState<string>('category');

  const showSelectedList = () => {
    if (selectedList === 'category')
      return listData?.categories?.map((category) => (
        <p onClick={() => setOpen(false)}>
          <SearchRestaurantTabsContent
            setIsFiltered={setIsFiltered}
            categoryId={category._id}
            loading={loading}
            key={category._id}
            item={category}
          >
            {categoryIcon(category.name)}
          </SearchRestaurantTabsContent>
        </p>
      ));
    if (selectedList === 'restaurant')
      return listData.restaurants?.map((restaurant) => (
        <Link to={`/restaurant/${restaurant._id}`}>
          <SearchRestaurantTabsContent
            categoryId=""
            setIsFiltered={setIsFiltered}
            loading={loading}
            key={restaurant._id}
            item={restaurant}
          >
            {' '}
            {renderAvatar({ item: restaurant, loading })}
          </SearchRestaurantTabsContent>
        </Link>
      ));
    if (selectedList === 'food')
      return listData.foods?.map((food) => {
        const findRestaurant = listData.restaurants?.find(
          (res) => res._id === food.restaurant,
        )?._id;
        return (
          <Link to={`/restaurant/${findRestaurant}`}>
            <SearchRestaurantTabsContent
              setIsFiltered={setIsFiltered}
              categoryId=""
              loading={loading}
              key={food._id}
              item={food}
            >
              {' '}
              {renderAvatar({ item: food, loading })}
            </SearchRestaurantTabsContent>
          </Link>
        );
      });
  };

  return (
    <Tabs defaultValue="category" className="w-full pt-[3%]">
      <TabsList className="w-full">
        <TabsTrigger value="category" onClick={() => setSelectedList('category')}>
          <p className="cursor-pointer">Categories</p>
        </TabsTrigger>
        <TabsTrigger value="restaurant" onClick={() => setSelectedList('restaurant')}>
          <p className="cursor-pointer">Restaurants</p>
        </TabsTrigger>
        <TabsTrigger value="food" onClick={() => setSelectedList('food')}>
          <p className="cursor-pointer">Foods</p>
        </TabsTrigger>
      </TabsList>
      <TabsContent value={selectedList} className="w-full overflow-hidden p-[2%]">
        <div className="max-h-[50vh] overflow-y-auto">{showSelectedList()}</div>
      </TabsContent>
    </Tabs>
  );
};

export default SearchRestaurantTabs;
