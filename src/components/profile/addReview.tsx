import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '../ui/button';
import { Plus } from 'lucide-react';
import { FormEvent, useEffect, useState } from 'react';
import { usePostCreateReviewMutation } from '@/features/auth/authApi';
import { toast } from 'sonner';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

type AddReviewProps = {
  restaurantId: string;
};

const AddReview = ({ restaurantId }: AddReviewProps) => {
  const [open, setOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [postReview] = usePostCreateReviewMutation();

  useEffect(() => {
    if (isSuccess) {
      setIsSuccess(false);
      setOpen(false);
    }
  }, [isSuccess]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newReview = Object.fromEntries(formData.entries());

    try {
      await postReview({ restaurantId, body: newReview }).unwrap();
      setIsSuccess(true);
      toast.success('Success!');
    } catch (err) {
      toast.error('Something went wrong');
      console.error(err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="lg" className="mt-[1%]">
          <Plus />
          <p>Add Review</p>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form
          onSubmit={handleSubmit}
          className="mt-[3%] h-[15rem] space-y-4 overflow-y-auto lg:h-[20rem]"
        >
          <p className="font-medium">Review</p>
          <hr className="h-[1px] w-full bg-neutral-100" />

          <Label>Name</Label>
          <Input type="text" name="name" />
          <Label>Description</Label>
          <textarea name="description" className="h-[5rem] w-full rounded shadow" />
          <Label>rating</Label>
          <Input type="number" max={5.0} step={0.1} min={0.0} name="rating" />

          <hr className="h-[1px] w-full bg-neutral-100" />
          <Button type="submit" className={`w-full bg-green-500`}>
            <p>Submit</p>
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddReview;
