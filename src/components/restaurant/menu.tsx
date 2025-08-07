import { useSelector } from 'react-redux';
import type { RootState } from '../../store';
import { Meal } from '@/hooks/dataTypes';
import { useGetFoodsQuery } from '@/features/restaurants/restaurantApi';
import Food from './food';
import ShoppingCart from '../checkout/shoppingCart';
import { Loader2Icon } from 'lucide-react';
import AddFood from '../profile/addFood';
import { useState } from 'react';
import { useAuth } from '@/features/auth/useAuth';

type MenuProps = {
  restaurant: Meal;
  restaurantLoading: boolean;
};

const Menu = ({ restaurant, restaurantLoading }: MenuProps) => {
  const { data: foods, isLoading, isFetching } = useGetFoodsQuery(restaurant?._id);
  const findRestaurantFoods = foods?.filter((food) =>
    restaurant?.foods.includes(food._id as string),
  );
  const foodsInTheBasket = useSelector((state: RootState) => state.cart.cart);
  const [open, setOpen] = useState(false);
  const { role } = useAuth();
  const restaurantOwned = restaurant?.admin?.length > 5;

  const foodLoading = isLoading || isFetching;

  return (
    <section className="h-full w-full">
      <div className='flex items-center justify-between'>
        <p className="p-[3%] text-xl font-bold">Menu</p>
        {restaurantOwned && role === 'admin' && <AddFood restaurantId={restaurant?._id} />}
      </div>

      {!foods || isLoading || isFetching ? (
        <div className="flex flex-col gap-5 p-[3%] lg:grid lg:w-full lg:grid-cols-2">
          <Loader2Icon className="animate-spin place-self-center" />
        </div>
      ) : (
        <div className="gap-3 px-[2%] lg:grid lg:w-full lg:grid-cols-2">
          {findRestaurantFoods?.map((food) => (
            <div key={food._id} className="px-[3%]">
              <Food
                food={food!}
                restaurant={restaurant}
                restaurantLoading={restaurantLoading}
                foodLoading={foodLoading}
              />
            </div>
          ))}
        </div>
      )}

      {/* Only show checkout */}
      {/* If has something inside */}
      {foodsInTheBasket.length <= 0 ? (
        ''
      ) : (
        <>
          <div className="fixed bottom-[1rem] flex w-full cursor-pointer flex-col items-center justify-center">
            <div className={`h-auto`}>
              <ShoppingCart open={open} setOpen={setOpen} />
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default Menu;
