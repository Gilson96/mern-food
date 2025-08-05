import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Loader2Icon, Plus } from 'lucide-react';
import { z } from 'zod';
import { usePostCreateFoodMutation } from '@/features/auth/authApi';
import { foodFormSchema } from '@/hooks/useFormRestaurant';

import { useAddEntityForm } from '@/hooks/useAddToRestaurant';
import FoodForm from './foodForm';
import { SerializedError } from '@reduxjs/toolkit';
import { Food } from '@/hooks/dataTypes';

type FormData = z.infer<typeof foodFormSchema>;
type AddFoodProps = {
  restaurantId: string;
};
const AddFood = ({ restaurantId }: AddFoodProps) => {
  const {
    open,
    setOpen,
    register,
    control,
    formState: { errors, isSubmitting },
    onSubmit,
  } = useAddEntityForm<FormData>({
    schema: foodFormSchema,
    defaultValues: { name: '', description: '', price: 0 },
    openStateValue: 'addFood',
    createMutation: usePostCreateFoodMutation,
    restaurantId: restaurantId,
    onBuildFormData: (data) => {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('description', data.description);
      formData.append('price', data.price.toString());
      formData.append('restaurantId', restaurantId);
      return formData;
    },
    successMessage: 'Food added successfully',
  });

  return (
    <Dialog open={open} onOpenChange={(isOpen) => setOpen(isOpen)}>
      <DialogTrigger asChild>
        <Button variant="outline" size="lg" className="mb-[5%]">
          <Plus />
          <p>Add food</p>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form
          onSubmit={onSubmit}
          className="mt-[3%] h-[15rem] space-y-4 overflow-y-auto lg:h-[20rem]"
        >
          <p className="font-medium">Food</p>
          <hr className="h-[1px] w-full bg-neutral-100" />

          <FoodForm control={control} errors={errors} register={register} />

          <hr className="h-[1px] w-full bg-neutral-100" />
          <Button
            type="submit"
            className={`w-full ${isSubmitting ? 'bg-neutral-400' : 'bg-green-500'}`}
          >
            {isSubmitting ? (
              <>
                {' '}
                <Loader2Icon className="animate-spin" /> <p>Please wait</p>
              </>
            ) : (
              <p>Submit</p>
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddFood;
