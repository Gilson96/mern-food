import { useAuth } from '@/features/auth/useAuth';
import { ArrowBigLeft, ShoppingBag } from 'lucide-react';
import ShoppingCartAccordion from './shoppingCartAccordion';
import { deliveryFeeTotal, foodsTotalPrice } from '@/features/cart/cartSlice';
import { useGetRestaurantsQuery } from '@/features/restaurants/restaurantApi';
import { RootState } from '@/store';
import { useSelector } from 'react-redux';
import Payement from './payement';
import { useNavigate } from 'react-router-dom';
import CheckoutSkeleton from '../skeletons/CheckoutSkeleton';

const Checkout = () => {
  const user = useAuth();
  const foodsInTheBasket = useSelector((state: RootState) => state.cart.cart);
  const { data: restaurants, isLoading, isFetching } = useGetRestaurantsQuery();
  const totalPrice = useSelector(foodsTotalPrice);
  const navigate = useNavigate();

  const restaurantIdsInBasket = foodsInTheBasket.map((entry) => entry.restaurant);
  const findRestaurant = restaurants?.filter((res) => restaurantIdsInBasket.includes(res._id));
  const deliveryFee = useSelector((state: RootState) => deliveryFeeTotal(state, findRestaurant));

  return (
    <>
      {isLoading || isFetching ? (
        <CheckoutSkeleton />
      ) : (
        <section className="min-h-screen w-full bg-neutral-200">
          {/* Back Nav */}
          <div
            onClick={() => navigate(-1)}
            className="flex h-[4rem] cursor-pointer items-center gap-2 bg-white px-[5%] text-sm text-neutral-700 shadow-sm"
          >
            <ArrowBigLeft size={20} />
            <p>Back to store</p>
          </div>

          {/* Main Checkout Layout */}
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-[5%] py-[3%] md:flex-row md:items-start">
            {/* Left Side - Delivery & Payment */}
            <div className="flex w-full flex-col gap-6 md:w-1/2">
              {/* Delivery Box */}
              <div className="rounded-lg bg-white p-5 shadow-sm">
                <p className="mb-3 text-lg font-semibold">Delivery details</p>
                <div className="flex items-center gap-2 text-sm">
                  <ShoppingBag size={20} />
                  <p className="text-neutral-700">{user?.address?.toUpperCase()}</p>
                </div>
              </div>

              {/* Payment for large screens */}
              <div className="hidden md:block">
                <Payement
                  totalPrice={totalPrice + deliveryFee}
                  foodsInTheBasket={foodsInTheBasket}
                />
              </div>
            </div>

            {/* Right Side - Order Summary */}
            <div className="flex w-full flex-col gap-6 md:w-1/2">
              {/* Cart Items */}
              <div className="max-h-[18rem] overflow-y-auto rounded-lg bg-white p-5 shadow-sm">
                {findRestaurant?.map((restaurant) => {
                  const matchingEntry = foodsInTheBasket.find(
                    (entry) => entry.restaurant === restaurant._id,
                  );
                  const findRestaurantFoods = matchingEntry?.foods || [];
                  return (
                    <div key={restaurant._id} className="py-2">
                      <ShoppingCartAccordion
                        findRestaurantFoods={findRestaurantFoods}
                        restaurant={restaurant}
                      />
                    </div>
                  );
                })}
              </div>

              {/* Order Total */}
              <div className="rounded-lg bg-white p-5 shadow-sm">
                <p className="mb-4 text-lg font-semibold">Order Total</p>
                <div className="space-y-2 text-sm text-neutral-600">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>£{totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery fee</span>
                    <span>£{deliveryFee.toFixed(2)}</span>
                  </div>
                  <hr className="my-2 border-neutral-200" />
                  <div className="flex justify-between text-base font-medium text-black">
                    <span>Total</span>
                    <span>£{(totalPrice + deliveryFee).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Payment for mobile only */}
              <div className="block md:hidden">
                <Payement
                  totalPrice={totalPrice + deliveryFee}
                  foodsInTheBasket={foodsInTheBasket}
                />
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Checkout;
