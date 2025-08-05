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
};

const FoodSelected = ({ foodsQuantity, food }: FoodSelectedProps) => {
  const dispatch = useDispatch();

  return (
    <>
      <div className="flex flex-col">
        <img src={food.poster_image} className="pt-[1rem]" />
        <div className="flex items-center justify-between pt-[2%] text-xl font-medium">
          <p className="">{food.name}</p>
          <p className="">£{Number(food.price).toFixed(2)}</p>
        </div>
        <p className="py-[3%]">{food.description}</p>
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
    </>
  );
};

export default FoodSelected;
