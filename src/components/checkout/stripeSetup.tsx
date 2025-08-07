import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useGetUserQuery, usePostToOrdersMutation } from '@/features/auth/authApi';
import { toast } from 'sonner';
import { emptyCart, RestaurantCart } from '@/features/cart/cartSlice';
import { Button } from '../ui/button';
import { useAuth } from '@/features/auth/useAuth';
import { Loader2, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';

type StripeSetupProps = {
  foodsInTheBasket: RestaurantCart[];
  totalPrice: number;
};

const StripeSetup = ({ foodsInTheBasket, totalPrice }: StripeSetupProps) => {
  const user = useAuth();
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data: userId, isLoading: userLoading } = useGetUserQuery();
  const [addToOrders, { isLoading }] = usePostToOrdersMutation();
  const [showSuccess, setShowSuccess] = useState(false);

  const allFoods = foodsInTheBasket.flatMap((entry) => entry.foods);

  const findUserId = userId?.find((u) => u.role === user.role)?._id;

  if (userLoading) {
    return (
      <div className="flex w-full items-center justify-center py-8">
        <Loader2 className="h-6 w-6 animate-spin text-green-600" />
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const result = await stripe.confirmPayment({ elements, redirect: 'if_required' });

    if (result.error) {
      console.error(result.error.message);
      toast('An error occurred', { position: 'top-center' });
    } else {
      if (user.role !== 'guest') {
        await addToOrders({
          _id: findUserId!,
          body: {
            foods: allFoods,
            totalPrice,
            timeStamp: result.paymentIntent.created,
          },
        }).unwrap();
      }

      setShowSuccess(true);
      setTimeout(() => {
        dispatch(emptyCart());
        navigate('/home');
      }, 2500);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} id="payment-form" className="flex flex-col gap-4">
        <PaymentElement id="payment-element" />

        <Button
          type="submit"
          className="bg-green-500 text-white hover:bg-green-600"
          disabled={!stripe || isLoading}
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Processing...
            </span>
          ) : (
            'Pay Now'
          )}
        </Button>
      </form>

      <Dialog open={showSuccess}>
        <DialogContent className="flex flex-col items-center justify-center gap-4 py-8 text-center">
          <CheckCircle2 className="animate-ping-once h-12 w-12 text-green-500" />
          <h2 className="text-lg font-semibold">Order Placed Successfully</h2>
          <p className="text-neutral-500">You will be redirected shortly.</p>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default StripeSetup;
