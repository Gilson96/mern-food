import { addToCart, removeFromCart } from '@/features/cart/cartSlice';
import { Food } from '@/hooks/dataTypes';
import { MinusCircleIcon, PlusCircleIcon } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { Button } from '../ui/button';
import { DialogClose } from '../ui/dialog';

type FoodSelectedProps = {
  foodsQuantity: number;
  food: Food;
  screenSize: { width: number };
  foodLoading: boolean;
};

const FoodSelected = ({ foodsQuantity, food, foodLoading }: FoodSelectedProps) => {
  const dispatch = useDispatch();

  if (foodLoading) {
    return (
      <div className="flex animate-pulse flex-col gap-4">
        <div className="h-48 w-full rounded bg-neutral-300" />
        <div className="flex items-center justify-between">
          <div className="h-4 w-1/2 rounded bg-neutral-200" />
          <div className="h-4 w-1/4 rounded bg-neutral-200" />
        </div>
        <div className="h-3 w-full rounded bg-neutral-200" />
        <div className="flex items-center justify-between">
          <div className="h-4 w-24 rounded bg-neutral-200" />
          <div className="h-8 w-20 rounded bg-neutral-300" />
        </div>
        <div className="mt-4 h-10 w-full rounded bg-neutral-300" />
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <img src={food.poster_image} alt={food.name} className="rounded pt-[1rem]" />
      <div className="flex items-center justify-between pt-[2%] text-xl font-medium">
        <p>{food.name}</p>
        <p>£{Number(food.price).toFixed(2)}</p>
      </div>
      <p className="py-[3%] text-sm text-neutral-600">{food.description}</p>

      <div className="flex items-center justify-center gap-2">
        <p className="text-xl">Quantity</p>
        <div className="flex items-center gap-1">
          <MinusCircleIcon
            className="cursor-pointer"
            onClick={() => dispatch(removeFromCart(food))}
          />
          {foodsQuantity}
          <PlusCircleIcon className="cursor-pointer" onClick={() => dispatch(addToCart(food))} />
        </div>
      </div>

      <DialogClose className="w-full">
        <Button className="mt-[2rem] w-full bg-green-500">Add to cart</Button>
      </DialogClose>
    </div>
  );
};

export default FoodSelected;
