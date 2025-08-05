import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Hamburger, Pizza, Shell, Soup, WheatOff } from 'lucide-react';
import { Separator } from '@radix-ui/react-separator';
import { ReactNode } from 'react';
import { Food, ListData } from '@/hooks/dataTypes';
import { HomePageProps, SearchRestaurantProps } from './homePage';

export const renderAvatar = ({
  item,
  loading,
}: {
  loading: boolean;
  item: { name: string; poster_image: string };
}) => (
  <Avatar className="h-[4rem] w-[4rem]">
    <AvatarImage src={item.poster_image} />
    <AvatarFallback className={`${loading} size-12 animate-pulse rounded-full bg-gray-200`}>
      {!loading && item.name.slice(0, 2)}
    </AvatarFallback>
  </Avatar>
);

export const categoryIcon = (category: string, size?: number) => {
  if (category === 'pizza') return <Pizza size={size} />;
  if (category === 'burger') return <Hamburger size={size} />;
  if (category === 'healhy') return <WheatOff size={size} />;
  if (category === 'asian') return <Soup size={size} />;
  if (category === 'pasta') return <Shell size={size} />;
};

export const searchList = <T extends { name: string }>(
  listData: T[] | undefined,
  inputValue: string,
) => {
  return (listData ?? []).filter((data) =>
    data.name.toLowerCase().includes(inputValue.toLowerCase()),
  );
};

const SearchRestaurantTabsContent = ({
  item,
  children,
  loading,
  setIsFiltered,
  categoryId,
}: {
  setIsFiltered: React.Dispatch<React.SetStateAction<HomePageProps>>;
  loading: boolean;
  children: ReactNode;
  item: { name: string };
  categoryId: string;
}) => {
  return (
    <div className="flex max-h-[400px] flex-col gap-3 overflow-y-auto py-[3%]">
      <div
        onClick={() => setIsFiltered({ category: categoryId })}
        className="flex items-center gap-2"
      >
        {children}
        <p className={`${loading && 'animate-pulse bg-neutral-200'}`}>
          {item.name === 'healhy' ? 'healthy' : item.name}
        </p>
      </div>
      <Separator className="w-[80%]" />
    </div>
  );
};

export default SearchRestaurantTabsContent;
