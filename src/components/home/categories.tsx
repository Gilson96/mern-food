import { categoryIcon } from './searchRestaurantTabsContent';
import useScreenSize from '@/hooks/useScreenSize';

type CategoriesProps = {
  loading: boolean;
  categories: [{ _id: string; name: string }];
  setIsFiltered: React.Dispatch<
    React.SetStateAction<{
      category?: string;
      sortBy?: string;
      price?: string;
    }>
  >;
};

const Categories = ({ categories, setIsFiltered, loading }: CategoriesProps) => {
  const screenSize = useScreenSize();
  const mobileView = screenSize.width < 767;

  console.log(categories);

  return (
    <section>
      <div className="flex w-full max-md:justify-between max-md:px-[1%] max-md:pt-[5%] md:flex md:justify-around md:gap-3 lg:gap-5">
        {loading
          ? Array.from({ length: 5 }).map((_, idx) => (
              <div
                key={idx}
                className="h-[3rem] w-[3rem] animate-pulse rounded-full bg-neutral-300 md:h-9 md:w-28"
              />
            ))
          : categories.map((category) => (
              <div
                key={category._id}
                className="cursor-pointer md:flex md:items-center md:gap-1 md:rounded-full md:border md:border-black md:px-[10px] md:py-[6px] md:hover:bg-green-100"
                onClick={() => setIsFiltered({ category: category._id })}
              >
                <i className="cursor-pointer">
                  {categoryIcon(category.name, mobileView ? 40 : 25)}
                </i>
                <p className="font-medium">{category.name}</p>
              </div>
            ))}
      </div>
    </section>
  );
};

export default Categories;
