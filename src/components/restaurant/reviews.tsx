import { useGetRestaurantReviewsQuery } from '@/features/restaurants/restaurantApi';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent } from '../ui/card';
import { StarIcon } from 'lucide-react';
import { useAuth } from '@/features/auth/useAuth';
import AddReview from '../profile/addReview';
import { Skeleton } from '../ui/skeleton';

type ReviewsProps = {
  restaurantId: string;
};

const Reviews = ({ restaurantId }: ReviewsProps) => {
  const { data: reviews, isLoading, isFetching } = useGetRestaurantReviewsQuery(restaurantId!);
  const loading = !reviews || isLoading || isFetching;
  const { role } = useAuth();

  const isSingleReview = reviews?.ratings_and_reviews?.length === 1;

  console.log(reviews?.ratings_and_reviews);
  return (
    <>
      <Carousel
        className={`${
          loading || reviews?.ratings_and_reviews.length <= 0
            ? 'hidden'
            : 'w-[70%] max-md:py-[5%] lg:w-[85%]'
        }`}
      >
        <CarouselContent
          className={`${isSingleReview ? 'lg:justify-center' : ''} flex`}
        >
          {loading
            ? Array.from({ length: 2 }).map((_, index) => (
                <CarouselItem key={index} className="lg:basis-1/2">
                  <Card className="h-auto">
                    <CardContent className="space-y-3 py-4">
                      <Skeleton className="h-4 w-[90%]" />
                      <Skeleton className="h-4 w-[60%]" />
                      <div className="flex gap-2 pt-2">
                        <Skeleton className="h-4 w-10" />
                        <Skeleton className="h-4 w-20" />
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))
            : reviews?.ratings_and_reviews?.map((review) => (
                <CarouselItem
                  key={review._id}
                  className={`${
                    isSingleReview ? 'lg:max-w-md lg:basis-auto' : 'lg:basis-1/2'
                  }`}
                >
                  <Card className="h-auto">
                    <CardContent className="py-4">
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
                          <p className="text-neutral-600">{review?.date?.slice(0, 10)}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
        </CarouselContent>

        {!isSingleReview && (
          <>
            <CarouselPrevious />
            <CarouselNext />
          </>
        )}
      </Carousel>

      {role === 'user' && <AddReview restaurantId={restaurantId} />}
    </>
  );
};

export default Reviews;
