import { FilterKey } from './Filters';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';

type FilterDropdownProps = {
  label: string;
  filterKey: FilterKey;
  selectedTitle: string;
  options: { label: string; value: string }[];
  updateFilter: (key: FilterKey, value: string) => void;
  clearFilter: (key: FilterKey) => void;
};

const FilterDropdown = ({
  label,
  filterKey,
  selectedTitle,
  options,
  updateFilter,
}: FilterDropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="w-auto">
        <div className="flex cursor-pointer items-center rounded-full border bg-green-100 px-[10px] py-[6px] hover:bg-green-200">
          <p className="font-medium">{selectedTitle || label}</p>
          <ChevronDown />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {options.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => updateFilter(filterKey, option.value)}
            className="cursor-pointer hover:bg-neutral-100"
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FilterDropdown;
