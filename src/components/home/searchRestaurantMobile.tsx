import { Dialog, DialogClose, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { ArrowLeft, Search, XIcon } from 'lucide-react';
import { Input } from '../ui/input';
import SearchRestaurantTabs from './searchRestaurantTabs';
import { useState } from 'react';
import { SearchRestaurantProps } from './homePage';
import SearchRestaurantTabsContent, {
  categoryIcon,
  renderAvatar,
  searchList,
} from './searchRestaurantTabsContent';
import { Link } from 'react-router-dom';

const SearchRestaurantMobile = ({ listData, loading, setIsFiltered }: SearchRestaurantProps) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [open, setOpen] = useState(false);

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        onClick={() => setOpen(true)}
        className="flex h-[3rem] w-full items-center justify-start gap-2 rounded-full border bg-neutral-200 pl-[3%]"
      >
        <Search size={18} />
        <p className="font-medium text-neutral-600">Search Mern Foods</p>
      </DialogTrigger>
      <DialogContent className="h-[80%] w-full [&_button[data-slot=dialog-close]]:hidden">
        <div className="w-full">
          <div className="relative w-full">
            <div onClick={() => setOpen(false)}>
              {' '}
              <ArrowLeft
                className="absolute top-1/2 left-3 -translate-y-1/2 text-black"
                size={18}
              />
            </div>
            <Input
              id="address"
              name="address"
              type="text"
              onChange={handleSearchInput}
              value={inputValue}
              placeholder="Search Mern Foods"
              className="h-[3rem] rounded-full bg-neutral-100 pl-10 font-medium text-neutral-600"
            />
          </div>
          {inputValue.length === 0 ? (
            <SearchRestaurantTabs
              setIsFiltered={setIsFiltered}
              listData={listData}
              loading={loading}
              setOpen={setOpen}
            />
          ) : (
            <div className="max-h-[60vh] overflow-y-auto py-[2%]">
              {searchList(listData?.categories, inputValue)?.map((category) => (
                <SearchRestaurantTabsContent
                  categoryId={category._id}
                  setIsFiltered={setIsFiltered}
                  loading={loading}
                  item={category}
                >
                  <span className="cursor-pointer"> {categoryIcon(category.name)}</span>
                </SearchRestaurantTabsContent>
              ))}
              {searchList(listData?.restaurants, inputValue)?.map((restaurant) => (
                <Link to={`/restaurant/${restaurant._id}`}>
                  <SearchRestaurantTabsContent
                    categoryId={''}
                    setIsFiltered={setIsFiltered}
                    loading={loading}
                    item={restaurant}
                  >
                    <span className="cursor-pointer">
                      {' '}
                      {renderAvatar({ item: restaurant, loading })}
                    </span>
                  </SearchRestaurantTabsContent>
                </Link>
              ))}
              {searchList(listData?.foods, inputValue)?.map((food) => {
                const findRestaurant = listData?.restaurants?.find(
                  (res) => res._id === food.restaurant,
                )?._id;
                return (
                  <Link to={`/restaurant/${findRestaurant}`}>
                    <SearchRestaurantTabsContent
                      categoryId=""
                      setIsFiltered={setIsFiltered}
                      loading={loading}
                      item={food}
                    >
                      <span className="cursor-pointer">
                        {' '}
                        {renderAvatar({ item: food, loading })}
                      </span>
                    </SearchRestaurantTabsContent>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchRestaurantMobile;
