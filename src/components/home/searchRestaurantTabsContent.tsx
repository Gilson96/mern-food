import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Hamburger, Pizza, Shell, Soup, WheatOff } from 'lucide-react';
import { Separator } from '@radix-ui/react-separator';
import { ReactNode } from 'react';
import { HomePageProps } from './homePage';

type SearchRestaurantTabsContentProps = {
  item: { name: string };
  loading: boolean;
  children: ReactNode;
  setIsFiltered: React.Dispatch<React.SetStateAction<HomePageProps>>;
  categoryId: string;
};

const SearchRestaurantTabsContent = ({
  item,
  children,
  loading,
  setIsFiltered,
  categoryId,
}: SearchRestaurantTabsContentProps) => {
  return (
    <div className="flex max-h-[400px] flex-col gap-3 overflow-y-auto py-[3%]">
      <div
        onClick={() => !loading && setIsFiltered({ category: categoryId })}
        className="flex cursor-pointer items-center gap-2 px-2"
      >
        {loading ? (
          <>
            <div className="h-[3rem] w-[3rem] animate-pulse rounded-full bg-gray-200" />
            <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
          </>
        ) : (
          <>
            {children}
            <p className="capitalize">
              {item.name === 'healhy' ? 'healthy' : item.name}
            </p>
          </>
        )}
      </div>
      <Separator className="w-[80%]" />
    </div>
  );
};
export default SearchRestaurantTabsContent;

export const renderAvatar = ({
  item,
  loading,
}: {
  loading: boolean;
  item: { name: string; poster_image: string };
}) => (
  <Avatar className="h-[4rem] w-[4rem]">
    {loading ? (
      <div className="size-[4rem] animate-pulse rounded-full bg-gray-200" />
    ) : (
      <>
        <AvatarImage src={item.poster_image} />
        <AvatarFallback>{item.name.slice(0, 2)}</AvatarFallback>
      </>
    )}
  </Avatar>
);


export const categoryIcon = (category: string, size = 24) => {
  switch (category) {
    case 'pizza':
      return <Pizza size={size} />;
    case 'burger':
      return <Hamburger size={size} />;
    case 'healhy':
      return <WheatOff size={size} />;
    case 'asian':
      return <Soup size={size} />;
    case 'pasta':
      return <Shell size={size} />;
    default:
      return <div className="h-6 w-6 bg-gray-300 rounded-full" />; // fallback icon
  }
};


export const searchList = <T extends { name: string }>(
  listData: T[] | undefined,
  inputValue: string,
) => {
  return (listData ?? []).filter((data) =>
    data.name.toLowerCase().includes(inputValue.toLowerCase()),
  );
};
