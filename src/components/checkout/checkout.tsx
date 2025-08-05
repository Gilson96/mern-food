import { useAuth } from '@/features/auth/useAuth';
import { ArrowBigLeft, ShoppingBag } from 'lucide-react';
import ShoppingCartAccordion from './shoppingCartAccordion';
import { deliveryFeeTotal, foodsTotalPrice } from '@/features/cart/cartSlice';
import { useGetRestaurantsQuery } from '@/features/restaurants/restaurantApi';
import { RootState } from '@/store';
import { useSelector } from 'react-redux';
import Payement from './payement';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const user = useAuth();
  const foodsInTheBasket = useSelector((state: RootState) => state.cart.cart);
  const { data: restaurants, isLoading, isFetching } = useGetRestaurantsQuery();
  const totalPrice = useSelector(foodsTotalPrice);
  const navigate = useNavigate();

  if (isLoading || isFetching) return <p>is Loading</p>;

  const restaurantIdsInBasket = foodsInTheBasket.map((entry) => entry.restaurant);

  const findRestaurant = restaurants?.filter((res) => restaurantIdsInBasket.includes(res._id));
  const deliveryFee = useSelector((state: RootState) => deliveryFeeTotal(state, findRestaurant));

  return (
    <section className="flex min-h-screen w-full flex-col bg-neutral-200">
      <div
        onClick={() => navigate(-1)}
        className="flex h-[4rem] items-center justify-start gap-1 bg-white px-[3%]"
      >
        <ArrowBigLeft />
        <p>Back to store</p>
      </div>
      <div className="flex h-full w-full flex-col items-center justify-center p-[3%] md:flex-row md:justify-between">
        <div className="flex h-full w-full flex-col gap-2 md:w-[50%]">
          <div className="flex h-[10rem] w-full flex-col justify-center gap-3 rounded-lg bg-white p-[2%]">
            <p className="text-xl font-medium">Delivery details</p>
            <div className="flex items-center justify-start gap-2">
              <ShoppingBag size={30} />
              <p>{user?.address?.toUpperCase()}</p>
            </div>
          </div>
          <span className="max-md:hidden">
            <Payement totalPrice={totalPrice + deliveryFee} foodsInTheBasket={foodsInTheBasket} />
          </span>
        </div>

        <div className="flex w-full flex-col gap-3 md:w-[40%]">
          <div className="max-h-[12rem] overflow-hidden overflow-y-auto rounded-lg bg-white p-[2%] max-md:mt-[2%] lg:max-h-[15rem]">
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
          <div className="flex h-auto flex-col justify-between rounded-lg bg-white p-[3%]">
            <p className="py-[2%] text-2xl font-medium">Order Total</p>
            <div className="flex flex-col">
              <div className="flex items-center justify-between text-neutral-600">
                <p>Subtotal</p>
                <p>£{totalPrice}</p>
              </div>
              <div className="flex items-center justify-between text-neutral-600">
                <p>Delivery fee</p>
                <p>£{deliveryFee}</p>
              </div>
              <hr className="my-[2%] h-[1px] w-full bg-neutral-100" />
              <div className="flex items-center justify-between text-xl">
                <p className="font-medium">Total</p>
                <p className="font-medium">£{Number(totalPrice + deliveryFee).toFixed(2)}</p>
              </div>
            </div>
          </div>
          <span className="md:hidden">
            <Payement totalPrice={totalPrice + deliveryFee} foodsInTheBasket={foodsInTheBasket} />
          </span>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
