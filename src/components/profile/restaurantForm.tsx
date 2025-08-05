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

  if (isLoading || isFetching) return <p>is loading</p>;

  return (
    <>
      <Controller
        control={control}
        name="categories"
        render={({ field }) => (
          <div className="space-y-2">
            <label className="text-sm font-medium">Category</label>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger className="">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories?.map((cat) => (
                  <SelectItem value={cat.name} onClick={() => setCategoryId(cat._id)}>
                    <p className="capitalize">{cat.name === 'healhy' ? 'healthy' : cat.name}</p>
                  </SelectItem>
                ))}
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
