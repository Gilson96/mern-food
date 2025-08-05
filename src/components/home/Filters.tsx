import FilterDropdown from './filterDropdown';
import { HomePageProps } from './homePage';

export type FilterKey = 'sortBy' | 'price';

type FilersProps = {
  setIsFiltered: React.Dispatch<React.SetStateAction<HomePageProps>>;
  isFiltered: HomePageProps;
};

const Filters = ({ setIsFiltered, isFiltered }: FilersProps) => {
  const updateFilter = (key: FilterKey, value: string) => {
    setIsFiltered((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const clearFilter = (key: FilterKey) => {
    setIsFiltered((prev) => ({
      ...prev,
      [key]: key === 'sortBy' ? 'All' : 'Lowest',
    }));
  };

  return (
    <div className="flex gap-3">
      <FilterDropdown
        label="All"
        filterKey="sortBy"
        selectedTitle={isFiltered.sortBy!}
        options={[
          { label: 'Earliest Arrival', value: 'Arrival' },
          { label: 'Rating', value: 'Rating' },
          { label: 'Cheap Delivery', value: 'Delivery' },
        ]}
        updateFilter={updateFilter}
        clearFilter={clearFilter}
      />

      <FilterDropdown
        label="Lowest"
        filterKey="price"
        selectedTitle={isFiltered.price!}
        options={[
          { label: 'Highest', value: 'Highest' },
          { label: 'Lowest', value: 'Lowest' },
        ]}
        updateFilter={updateFilter}
        clearFilter={clearFilter}
      />
    </div>
  );
};

export default Filters;
