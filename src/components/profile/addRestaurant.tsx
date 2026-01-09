import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { FormEvent, useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Plus } from 'lucide-react';
import { usePostCreateRestaurantMutation } from '@/features/auth/authApi';
import { toast } from 'sonner';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Label } from '@radix-ui/react-dropdown-menu';
import { Input } from '../ui/input';
import { useGetCategoriesQuery } from '@/features/restaurants/restaurantApi';

const AddRestaurant = () => {
  const [open, setOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [categoryId, setCategoryId] = useState('');
  const [postRestaurant] = usePostCreateRestaurantMutation();
  const { data: categories, isLoading, isFetching } = useGetCategoriesQuery();

  useEffect(() => {
    if (isSuccess) {
      setIsSuccess(false);
      setOpen(false);
    }
  }, [isSuccess]);

  if (isLoading || isFetching) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-10 w-full animate-pulse rounded bg-neutral-200" />
        ))}
      </div>
    );
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const getFormDataValues = Object.fromEntries(formData.entries());

    const newRestaurant = {
      ...getFormDataValues,
      category: categoryId,
      admin: "687a90480cb8e9c5e17d2bfc"
    };

    try {
      await postRestaurant({ categoryId, body: newRestaurant }).unwrap();
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
        <Button
          variant="outline"
          className="w-auto cursor-pointer bg-neutral-100 font-medium text-black"
        >
          <Plus />
          <p>Add restaurant</p>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form
          onSubmit={handleSubmit}
          className="mt-[3%] h-[15rem] space-y-4 overflow-y-auto lg:h-[20rem]"
        >
          <p className="font-medium">Restaurant</p>
          <hr className="h-[1px] w-full bg-neutral-100" />
          <Select name="category" required>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              {categories?.map((category) => (
                <SelectItem value={category._id} onClick={() => setCategoryId(category._id)}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Label>Restaurant name</Label>
          <Input required type="text" name="name" placeholder="Food House" />
          <Label>Restaurant address</Label>
          <Input type="text" required name="address" placeholder="56 belly street, M7 5PG" />
          <Label>Delivery fee(£)</Label>
          <Input
            name="deliveryFee"
            required
            type="number"
            min={0}
            step="0.10"
            placeholder="£3.00"
          />
          <Label>Restaurant arrival(min)</Label>
          <Input name="arrival" required type="number" placeholder="10" />

          <hr className="h-[1px] w-full bg-neutral-100" />
          <Button type="submit" className={`w-full bg-green-500`}>
            <p>Submit</p>
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddRestaurant;
