import { useGetRestaurantReviewsQuery } from '@/features/restaurants/restaurantApi';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent } from '../ui/card';
import { Plus, StarIcon } from 'lucide-react';
import useScreenSize from '@/hooks/useScreenSize';
import { Button } from '../ui/button';
import { useAuth } from '@/features/auth/useAuth';
import AddReview from '../profile/addReview';

type ReviewsProps = {
  restaurantId: string;
};

const Reviews = ({ restaurantId }: ReviewsProps) => {
  const { data: reviews, isLoading, isFetching } = useGetRestaurantReviewsQuery(restaurantId!);
  const screenSize = useScreenSize();
  const loading = !reviews || isLoading || isFetching;
  const { role } = useAuth();
  if (loading) return <p>is loading</p>;
  return (
    <>
      <Carousel

        className={`${reviews?.ratings_and_reviews.length <= 0 ? 'hidden' : 'w-[70%] max-md:py-[5%]'}`}
      >
        <CarouselContent>
          {reviews?.ratings_and_reviews?.map((review) => (
            <CarouselItem  className="lg:basis-1/2">
              <Card className="h-auto">
                <CardContent>
                  <div className="pb-[5%]">"{review.description}"</div>
                  <div className="flex">
                    <div className="items-star flex flex-col gap-1 lg:flex-row">
                      <div className="flex items-center gap-0.5">
                        <p className="font-semibold">{Number(review.rating).toFixed(1)}</p>
                        <StarIcon className="h-4 w-4" />
                        <span className="text-neutral-500">&#183;</span>
                        <p className="text-neutral-600">{review.name}</p>
                      </div>
                      <span className="text-neutral-500 max-md:hidden">&#183;</span>
                      <p className="text-neutral-600">{review?.date?.slice(0,10)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      {role === 'user' && <AddReview restaurantId={restaurantId} />}
    </>
  );
};

export default Reviews;
