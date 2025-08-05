import React, { useState, useRef, useEffect } from 'react';
import { Search } from 'lucide-react';
import SearchRestaurantTabsContent, {
  categoryIcon,
  renderAvatar,
  searchList,
} from './searchRestaurantTabsContent';
import SearchRestaurantTabs from './searchRestaurantTabs';
import { SearchRestaurantProps } from './homePage';
import { Link } from 'react-router-dom';
import { Food, Meal } from '@/hooks/dataTypes';

type FoodOrMeal = (Food & { type: 'food' }) | (Meal & { type: 'meal' });

const SearchRestaurantsDesktop = ({ listData, loading, setIsFiltered }: SearchRestaurantProps) => {
  const [inputValue, setInputValue] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setShowDropdown(true);
  };

  return (
    <div ref={containerRef} className="relative cursor-pointer md:w-[40%] lg:w-[50%] xl:w-[60%]">
      {loading ? (
        <div className="flex h-[2.5rem] items-center gap-2 rounded-full border bg-neutral-200 px-4">
          <Search size={18} className="animate-pulse text-neutral-500" />
          <input
            disabled
            placeholder="Search Mern Foods"
            className="w-full animate-pulse bg-transparent font-medium text-neutral-600 outline-none placeholder:text-neutral-400"
          />
        </div>
      ) : (
        <>
          <div className="flex h-[2.5rem] items-center gap-2 rounded-full border bg-neutral-200 px-4">
            <Search size={18} className="text-neutral-500" />
            <input
              ref={inputRef}
              value={inputValue}
              onChange={handleSearchInput}
              onFocus={() => setShowDropdown(true)}
              placeholder="Search Mern Foods"
              className="w-full bg-transparent font-medium text-neutral-600 outline-none placeholder:text-neutral-400"
            />
          </div>
          {showDropdown && (
            <div className="absolute z-50 mt-2 w-full rounded-xl border bg-white p-4 shadow-lg">
              <div className="space-y-3">
                {inputValue.length === 0 ? (
                  <SearchRestaurantTabs
                    setIsFiltered={setIsFiltered}
                    listData={listData}
                    loading={loading}
                  />
                ) : (
                  <>
                    {searchList(listData?.categories, inputValue)?.map((category) => (
                      <Link to={'/homePage'}>
                        <SearchRestaurantTabsContent
                          setIsFiltered={setIsFiltered}
                          categoryId={category._id}
                          loading={loading}
                          item={category}
                        >
                          <span className="cursor-pointer"> {categoryIcon(category.name)}</span>
                        </SearchRestaurantTabsContent>
                      </Link>
                    ))}
                    {searchList(listData?.restaurants, inputValue)?.map((restaurant) => (
                      <Link to={`restaurant/${restaurant._id}`}>
                        <SearchRestaurantTabsContent
                          categoryId=""
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
                  </>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SearchRestaurantsDesktop;
