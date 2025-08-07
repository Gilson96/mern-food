import { Food as FoodType, Meal } from '@/hooks/dataTypes';
import type { RootState } from '../../store';
import { useSelector } from 'react-redux';
import useScreenSize from '@/hooks/useScreenSize';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import FoodSelected from './foodSelected';
import UploadImageToImageKit from '../profile/uploadImageToImageKit';

type FoodProps = {
  restaurant: Meal;
  food: FoodType;
  restaurantLoading: boolean;
  foodLoading: boolean;
};

const Food = ({ restaurant, food, restaurantLoading, foodLoading }: FoodProps) => {
  const foodsInTheBasket = useSelector((state: RootState) => state.cart.cart);

  const foodSelected = foodsInTheBasket
    .flatMap((entry) => entry.foods)
    .find((item) => item._id === food._id);

  const foodsQuantity = foodSelected?.quantity ?? 0;
  const screenSize = useScreenSize();

  if (restaurantLoading || foodLoading) {
    return (
      <div className="flex w-full animate-pulse flex-col gap-2 py-[2%]">
        <div className="flex w-full items-center justify-between lg:border-b lg:pb-2">
          <div className="flex flex-col gap-2">
            <div className="h-4 w-24 rounded bg-neutral-300" />
            <div className="h-4 w-16 rounded bg-neutral-200" />
          </div>
          <div
            className="rounded bg-neutral-300"
            style={{
              height: screenSize.width >= 768 ? '8rem' : '6rem',
              width: screenSize.width >= 768 ? '12rem' : '8rem',
            }}
          />
        </div>
        <hr className="my-[3%] h-[1px] w-full bg-neutral-100 md:hidden" />
      </div>
    );
  }

  return (
    <Dialog>
      <DialogTrigger className="flex w-full cursor-pointer flex-col py-[1%] hover:bg-neutral-100">
        <section className="flex w-full items-center justify-between lg:border-b lg:pb-2">
          <div className="flex flex-col items-start">
            <p className="text-lg font-semibold">{food.name}</p>
            <p>£{Number(food.price).toFixed(2)}</p>
          </div>
          {food.poster_image.length <= 0 ? (
            <UploadImageToImageKit
              imageUploadEntity="food"
              foodId={food._id}
              restaurantId={restaurant?._id!}
            />
          ) : (
            <img
              style={{
                height: screenSize.width >= 768 ? '8rem' : '6rem',
                width: screenSize.width >= 768 ? '12rem' : '8rem',
              }}
              src={food.poster_image}
              className="rounded"
            />
          )}
        </section>
      </DialogTrigger>
      <hr className="my-[3%] h-[1px] w-full bg-neutral-100 md:hidden" />
      <DialogContent>
        <FoodSelected food={food} foodLoading={foodLoading} foodsQuantity={foodsQuantity} screenSize={screenSize} />
      </DialogContent>
    </Dialog>
  );
};

export default Food;
