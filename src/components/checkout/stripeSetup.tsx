import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { persistor } from '../../store';
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

  if (userLoading)
    return (
      <i className="animate-spin">
        <Loader2 />
      </i>
    );

  const findUserId = userId?.find((u) => u.role === user.role)?._id;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const result = await stripe.confirmPayment({ elements, redirect: 'if_required' });

    if (result.error) {
      console.log(result.error.message);
      toast('an error occurred', { position: 'top-center' });
    } else {
      user.role !== 'guest' &&
        (await addToOrders({
          _id: findUserId!,
          body: {
            foods: allFoods,
            totalPrice,
            timeStamp: result.paymentIntent.created,
          },
        }).unwrap());

      setShowSuccess(true);
      setTimeout(() => {
        dispatch(emptyCart());
        navigate('/home');
      }, 2500);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} id="payment-form" className="flex flex-col gap-2">
        <PaymentElement id="payment-element" />
        <Button disabled={!stripe} type="submit" className="bg-green-500">
          Pay Now
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
