import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '../ui/button';
import { Loader2Icon, Plus } from 'lucide-react';
import { z } from 'zod';
import { reviewFormSchema } from '@/hooks/useFormRestaurant';
import { useAddEntityForm } from '@/hooks/useAddToRestaurant';
import { usePostCreateReviewMutation } from '@/features/auth/authApi';
import ReviewForm from './reviewForm';

type FormData = z.infer<typeof reviewFormSchema>;
type AddReviewProps = {
  restaurantId: string;
};

const AddReview = ({ restaurantId }: AddReviewProps) => {
  const {
    open,
    setOpen,
    register,
    control,
    formState: { errors, isSubmitting },
    onSubmit,
  } = useAddEntityForm<FormData>({
    schema: reviewFormSchema,
    defaultValues: {
      name: '',
      description: '',
      rating: 0,
      date: undefined,
    },
    openStateValue: 'addReview',
    createMutation: usePostCreateReviewMutation,
    restaurantId: restaurantId,
    onBuildFormData: (data) => {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('description', data.description);
      formData.append('rating', data.rating.toString());
      formData.append('date', new Date().toISOString());
      formData.append('restaurantId', restaurantId);
      return formData;
    },
    successMessage: 'Review added successfully',
  });
  
  return (
    <Dialog open={open} onOpenChange={(isOpen) => setOpen(isOpen)}>
      <DialogTrigger asChild>
        <Button variant="outline" size="lg" className="mt-[1%]">
          <Plus />
          <p>Add Review</p>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form
          onSubmit={onSubmit}
          className="mt-[3%] h-[15rem] space-y-4 overflow-y-auto lg:h-[20rem]"
        >
          <p className="font-medium">Review</p>
          <hr className="h-[1px] w-full bg-neutral-100" />

          <ReviewForm control={control} errors={errors} register={register} />

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

export default AddReview;
