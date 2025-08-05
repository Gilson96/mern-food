import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Button } from '../ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useGetRestaurantsQuery } from '@/features/restaurants/restaurantApi';
import { Link } from 'react-router-dom';
import { foodsTotalPrice } from '@/features/cart/cartSlice';
import useScreenSize from '@/hooks/useScreenSize';
import ShoppingCartAccordion from './shoppingCartAccordion';

type ShoppingCartProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ShoppingCart = ({ open, setOpen }: ShoppingCartProps) => {
  const foodsInTheBasket = useSelector((state: RootState) => state.cart.cart);
  const { data: restaurants, isLoading, isFetching } = useGetRestaurantsQuery();
  const totalPrice = useSelector(foodsTotalPrice);
  const screenSize = useScreenSize();

  if (isLoading || isFetching) return <p>is Loading</p>;

  const restaurantIdsInBasket = foodsInTheBasket.map((entry) => entry.restaurant);

  const findRestaurant = restaurants?.filter((res) => restaurantIdsInBasket.includes(res._id));

  return (
    <>
      <Drawer
        open={open}
        onOpenChange={setOpen}
        direction={screenSize.width < 767 ? 'bottom' : 'right'}
      >
        <DrawerTrigger className="h-[3rem] w-[10rem] cursor-pointer rounded-full bg-green-500 text-lg font-medium text-white shadow hover:bg-green-600">
          Cart ({foodsInTheBasket.length})
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Cart</DrawerTitle>
            <div className="max-h-[12rem] overflow-hidden overflow-y-auto lg:max-h-[25rem]">
              {findRestaurant?.map((restaurant) => {
                const matchingEntry = foodsInTheBasket.find(
                  (entry) => entry.restaurant === restaurant._id,
                );
                const findRestaurantFoods = matchingEntry?.foods || [];
                return (
                  <div
                    key={restaurant._id}
                    className="flex w-full cursor-pointer items-center justify-start gap-3 py-[2%] hover:bg-neutral-100"
                  >
                    <ShoppingCartAccordion
                      findRestaurantFoods={findRestaurantFoods}
                      restaurant={restaurant}
                    />
                  </div>
                );
              })}
            </div>
          </DrawerHeader>
          <DrawerFooter className="w-full">
            <Link className="w-full" to={'/checkout'}>
              <Button className="flex w-full items-center py-[1.2rem]">
                <span>Checkout</span>
                <span className="font-bold">(£{totalPrice})</span>{' '}
              </Button>
            </Link>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default ShoppingCart;
