import { ReviewFormType } from '@/hooks/useFormRestaurant';
import { FormInput } from './formInput';
import { Control, FieldErrors, UseFormRegister } from 'react-hook-form';
import { Textarea } from '../ui/textarea';

type ReviewFormProps = {
  control: Control<ReviewFormType>;
  register: UseFormRegister<ReviewFormType>;
  errors: FieldErrors<ReviewFormType>;
};

const ReviewForm = ({ control, register, errors }: ReviewFormProps) => {
  return (
    <>
      <FormInput
        control={control}
        label="Name"
        register={register}
        name="name"
        placeholder="e.g. Margherita"
        error={errors.name}
      />

       <FormInput
        control={control}
        label="Description"
        register={register}
        name="description"
        placeholder="e.g. It was delicious! Highly recommend."
        error={errors.description}
      />

      <FormInput
        control={control}
        label="Rating"
        type="number"
        step="0.1"
        min={0}
        max={5}
        register={register}
        name="rating"
        error={errors.rating}
      />
    </>
  );
};

export default ReviewForm;
