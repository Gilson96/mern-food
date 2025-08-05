import { User } from '@/hooks/dataTypes';

type OrdersProps = {
  findUser: User | undefined;
};

const Orders = ({ findUser }: OrdersProps) => {
  const formatStripeTimestampToDate = (timestamp: number): string => {
    const date = new Date(timestamp * 1000);
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const yyyy = date.getFullYear();

    return `${dd}-${mm}-${yyyy}`;
  };

  return (
    <div>
      <p className="my-[1%] font-medium">Past orders</p>
      <div className="flex flex-col gap-3">
        {findUser?.orders?.map((order, index) => (
          <div className="flex flex-col">
            <div className="flex w-full items-center justify-between py-[2%] md:py-[1%]">
              <p className="font-medium">Order #{index}</p>
              <p className="font-medium">£{order.totalPrice.toFixed(2)}</p>
            </div>
            {order.foods.map((food) => (
              <div className="flex w-full items-center justify-between text-neutral-500">
                <p>{food.name}</p>
                <p>x{food.quantity}</p>
              </div>
            ))}
            <p className='text-neutral-500 text-sm pt-1'>{formatStripeTimestampToDate(order.timeStamp)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
