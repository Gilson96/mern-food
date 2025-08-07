import { RestaurantFormType } from '@/hooks/useFormRestaurant';
import { FormInput } from './formInput';
import { Control, FieldErrors, UseFormRegister, Controller } from 'react-hook-form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useGetCategoriesQuery } from '@/features/restaurants/restaurantApi';

type RestaurantFormProps = {
  register: UseFormRegister<RestaurantFormType>;
  errors: FieldErrors<RestaurantFormType>;
  control: Control<RestaurantFormType>;
  setCategoryId: React.Dispatch<React.SetStateAction<string>>;
};

const RestaurantForm = ({ register, errors, control, setCategoryId }: RestaurantFormProps) => {
  const { data: categories, isLoading, isFetching } = useGetCategoriesQuery();

  if (isLoading || isFetching) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-10 w-full animate-pulse rounded bg-neutral-200" />
        ))}
      </div>
    );
  }

  return (
    <>
      <Controller
        control={control}
        name="categories"
        render={({ field }) => (
          <div className="space-y-2">
            <label className="text-sm font-medium">Category</label>
            <Select
              onValueChange={(value) => {
                field.onChange(value);
                const matchedCategory = categories?.find((cat) => cat.name === value);
                if (matchedCategory) {
                  setCategoryId(matchedCategory._id);
                }
              }}
              defaultValue={field.value}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories?.length ? (
                  categories.map((cat) => (
                    <SelectItem key={cat._id} value={cat.name}>
                      <p className="capitalize">{cat.name === 'healhy' ? 'healthy' : cat.name}</p>
                    </SelectItem>
                  ))
                ) : (
                  <p className="p-2 text-sm text-neutral-400">No categories found</p>
                )}
              </SelectContent>
            </Select>
            {errors.categories && (
              <p className="text-sm text-red-500">{errors.categories.message}</p>
            )}
          </div>
        )}
      />

      <FormInput
        label="Restaurant name"
        register={register}
        name="name"
        placeholder="Food House"
        error={errors.name}
      />

      <FormInput
        label="Restaurant address"
        register={register}
        name="address"
        placeholder="56 belly street, M7 5PG"
        error={errors.address}
      />

      <FormInput
        label="Delivery fee(£)"
        register={register}
        name="deliveryFee"
        type="number"
        step="0.10"
        placeholder="£3.00"
        error={errors.deliveryFee}
      />

      <FormInput
        label="Restaurant arrival(min)"
        register={register}
        name="arrival"
        type="number"
        placeholder="10"
        error={errors.arrival}
      />
    </>
  );
};

export default RestaurantForm;
