import { usePostPayementIntentMutation } from '@/features/auth/authApi';
import { Meal, PaymentIntent } from '@/hooks/dataTypes';
import { toast } from 'sonner';
import { useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import StripeSetup from './stripeSetup';
import { Button } from '../ui/button';
import { RestaurantCart } from '@/features/cart/cartSlice';

const stripePromise = loadStripe(
  'pk_test_51RM9WqQc9p8NGwhTGXbjwQ5KMsekxrYc5yD1H0GK56gnIt36JQ7tVEcTh2meimwMIHPXTKkB9sRrGLtTBDCgNyNb00QhG8jYeZ',
);

type CheckoutModelFooterProps = {
  totalPrice: number;
  foodsInTheBasket: RestaurantCart[];
};

const Payement = ({ totalPrice, foodsInTheBasket }: CheckoutModelFooterProps) => {
  const [payementIntent, { isLoading }] = usePostPayementIntentMutation();
  const [clientSecret, setClientSecret] = useState<PaymentIntent>();

  const castString = String(totalPrice);
  const newTotalPrice = parseInt(castString);

  const handlePaymentIntent = async () => {
    try {
      const intent = await payementIntent({
        totalPrice: newTotalPrice + 20,
      }).unwrap();

      setClientSecret(intent);

      return intent;
    } catch (err) {
      toast('An error occurred');
      console.log(err);
    }
  };

  return (
    <div>
      <div className="flex h-full w-full flex-col">
        {!clientSecret ? (
          <>
            <Button className="cursor-pointer bg-green-500" onClick={handlePaymentIntent}>
              Order and Pay
            </Button>
          </>
        ) : (
          <Elements stripe={stripePromise} options={clientSecret}>
            <StripeSetup foodsInTheBasket={foodsInTheBasket} totalPrice={totalPrice} />
          </Elements>
        )}
      </div>
    </div>
  );
};

export default Payement;
