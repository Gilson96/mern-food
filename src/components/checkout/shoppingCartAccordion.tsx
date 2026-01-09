import { removeFromCart, addToCart } from '@/features/cart/cartSlice';
import { Food, Meal } from '@/hooks/dataTypes';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@radix-ui/react-accordion';
import { ChevronDown, MinusCircle, PlusCircle } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

type ShoppingCartAccordionProps = {
  restaurant: Meal;
  findRestaurantFoods: Food[];
};

const ShoppingCartAccordion = ({ restaurant, findRestaurantFoods }: ShoppingCartAccordionProps) => {
  const dispatch = useDispatch();
  return (
    <Accordion type="single" collapsible className="flex w-full items-center">
      <AccordionItem value="item-1" className="w-full">
        <AccordionTrigger className="flex w-full cursor-pointer items-center justify-between px-[2%]">
          <div className="flex items-center gap-2">
            <Avatar className="size-12">
              <AvatarImage src={restaurant?.logo_image} />
              <AvatarFallback>{restaurant?.name}</AvatarFallback>
            </Avatar>
            <p>{restaurant.name}</p>
          </div>
          <ChevronDown />
        </AccordionTrigger>
        <AccordionContent className="p-[2%]">
          {findRestaurantFoods.map((food) => (
            <>
              <div key={food._id} className="flex items-center justify-between py-1">
                <div className="flex items-center gap-2">
                  <Avatar className="size-12">
                    <AvatarImage src={food.poster_image} />
                    <AvatarFallback>{food.name}</AvatarFallback>
                  </Avatar>
                  <p>{food.name}</p>
                  <p className="text-neutral-500 text-sm font-light">£{food.price}</p>
                </div>
                <div className="flex items-center gap-1">
                  <MinusCircle
                    className="cursor-pointer"
                    strokeWidth={1}
                    onClick={() => dispatch(removeFromCart(food))}
                  />
                  <p className="text-sm text-gray-500">{food.quantity}</p>
                  <PlusCircle
                    className="cursor-pointer"
                    strokeWidth={1}
                    onClick={() => dispatch(addToCart(food))}
                  />
                </div>
              </div>
            </>
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ShoppingCartAccordion;
