import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '../ui/button';
import { Plus } from 'lucide-react';
import { usePostCreateFoodMutation } from '@/features/auth/authApi';
import { useState, useEffect, FormEvent } from 'react';
import { toast } from 'sonner';
import { Label } from '../ui/label';
import { Input } from '../ui/input';

type AddFoodProps = {
  restaurantId: string;
};
const AddFood = ({ restaurantId }: AddFoodProps) => {
  const [open, setOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [postFood] = usePostCreateFoodMutation();

  useEffect(() => {
    if (isSuccess) {
      setIsSuccess(false);
      setOpen(false);
    }
  }, [isSuccess]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const getFormData = Object.fromEntries(formData.entries());

    const newFood = {
      ...getFormData,
      restaurant: restaurantId
    }
    try {
      await postFood({ restaurantId, body: newFood }).unwrap();
      setIsSuccess(true);
      toast.success('Success!');
    } catch (err) {
      toast.error('Something went wrong');
      console.error(err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => setOpen(isOpen)}>
      <DialogTrigger asChild>
        <Button variant="outline" size="lg" className="w-auto lg:mr-[3%]">
          <Plus />
          <p>Add food</p>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form
          onSubmit={handleSubmit}
          className="mt-[3%] h-[15rem] space-y-4 overflow-y-auto lg:h-[20rem]"
        >
          <p className="font-medium">Food</p>
          <hr className="h-[1px] w-full bg-neutral-100" />

          <Label>Name</Label>
          <Input type="text" name="name" placeholder="e.g. Margherita" />
          <Label>Price</Label>
          <Input type="number" min={0} name="price" />
          <Label>Description</Label>
          <textarea
            name="description"
            className="h-[5rem] w-full rounded shadow"
            placeholder="e.g. Classic tomato base pizza"
          />

          <hr className="h-[1px] w-full bg-neutral-100" />
          <Button type="submit" className={`w-full bg-green-500`}>
            <p>Submit</p>
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddFood;
