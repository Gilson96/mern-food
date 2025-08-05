import { FoodFormType } from '@/hooks/useFormRestaurant';
import { FormInput } from './formInput';
import { Control, FieldErrors, UseFormRegister } from 'react-hook-form';

type FoodFormProps = {
  control: Control<FoodFormType>;
  register: UseFormRegister<FoodFormType>;
  errors: FieldErrors<FoodFormType>;
};

const FoodForm = ({ control, register, errors }: FoodFormProps) => {
  return (
    <>
      <FormInput
        control={control}
        label="Food name"
        register={register}
        name="name"
        placeholder="e.g. Margherita"
        error={errors.name}
      />

      <FormInput
        control={control}
        label="Price (£)"
        type="number"
        step="0.10"
        register={register}
        name="price"
        error={errors.price}
      />

      <FormInput
        control={control}
        label="Description"
        register={register}
        name="description"
        placeholder="e.g. Classic tomato base pizza"
        error={errors.description}
      />
    </>
  );
};

export default FoodForm;
