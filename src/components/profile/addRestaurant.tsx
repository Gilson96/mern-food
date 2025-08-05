import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Loader2Icon, Plus } from 'lucide-react';
import { z } from 'zod';
import { usePostCreateRestaurantMutation } from '@/features/auth/authApi';
import { restaurantFormSchema } from '@/hooks/useFormRestaurant';
import RestaurantForm from './restaurantForm';
import { User } from '@/hooks/dataTypes';
import { useAddEntityForm } from '@/hooks/useAddToRestaurant';

type FormData = z.infer<typeof restaurantFormSchema>;
type AddRestaurantProps = {
  findUser: User;
  state: string;
};
const AddRestaurant = ({ state, findUser }: AddRestaurantProps) => {
  const [categoryId, setCategoryId] = useState('');

  useEffect(() => {
    if (state === 'addRestaurant') {
      setOpen(true);
    }
  }, [state]);

  const {
    open,
    setOpen,
    register,
    control,
    formState: { errors, isSubmitting },
    onSubmit,
  } = useAddEntityForm<FormData>({
    schema: restaurantFormSchema,
    defaultValues: {
      name: '',
      address: '',
      deliveryFee: 1,
      arrival: 15,
      admin: findUser._id,
      categories: 'asian',
    },
    state,
    openStateValue: 'addRestaurant',
    categoryId: categoryId,
    createMutation: usePostCreateRestaurantMutation,
    onBuildFormData: (data) => {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('address', data.address);
      formData.append('deliveryFee', data.deliveryFee.toString());
      formData.append('arrival', data.arrival.toString());
      formData.append('admin', data.admin);
      formData.append('category', categoryId);
      return formData;
    },
    successMessage: 'Restaurant added successfully',
  });

  return (
    <Dialog open={open} onOpenChange={(isOpen) => setOpen(isOpen)}>
      <DialogTrigger asChild>
        <Button variant='outline' className="w-auto cursor-pointer bg-neutral-100 font-medium text-black">
          <Plus />
          <p>Add restaurant</p>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form
          onSubmit={onSubmit}
          className="mt-[3%] h-[15rem] space-y-4 overflow-y-auto lg:h-[20rem]"
        >
          <p className="font-medium">Restaurant</p>
          <hr className="h-[1px] w-full bg-neutral-100" />

          <RestaurantForm
            setCategoryId={setCategoryId}
            control={control}
            errors={errors}
            register={register}
          />

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

export default AddRestaurant;
