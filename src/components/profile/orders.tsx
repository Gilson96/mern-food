import { User } from '@/hooks/dataTypes';

type OrdersProps = {
  findUser: User | undefined;
  userLoading: boolean;
};

const Orders = ({ findUser, userLoading }: OrdersProps) => {
  const formatStripeTimestampToDate = (timestamp: number): string => {
    const date = new Date(timestamp * 1000);
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const yyyy = date.getFullYear();

    return `${dd}-${mm}-${yyyy}`;
  };

  if (userLoading) {
    return (
      <div>
        <p className="my-[1%] font-medium">Past orders</p>
        <div className="flex flex-col gap-3">
          {Array.from({ length: 2 }).map((_, idx) => (
            <div key={idx} className="flex animate-pulse flex-col gap-2">
              <div className="flex justify-between">
                <div className="h-4 w-[30%] rounded bg-neutral-300" />
                <div className="h-4 w-[20%] rounded bg-neutral-300" />
              </div>
              <div className="flex justify-between">
                <div className="h-3 w-[40%] rounded bg-neutral-200" />
                <div className="h-3 w-[10%] rounded bg-neutral-200" />
              </div>
              <div className="h-3 w-[30%] rounded bg-neutral-100" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!findUser?.orders?.length) {
    return <div className="pt-2 text-sm text-neutral-500">No past orders found.</div>;
  }

  return (
    <div>
      <p className="my-[1%] font-medium">Past orders</p>
      <div className="flex flex-col gap-3">
        {findUser.orders.map((order, index) => (
          <div key={index} className="flex flex-col">
            <div className="flex w-full items-center justify-between py-[2%] md:py-[1%]">
              <p className="font-medium">Order #{index + 1}</p>
              <p className="font-medium">£{order.totalPrice.toFixed(2)}</p>
            </div>
            {order.foods.map((food, foodIndex) => (
              <div
                key={foodIndex}
                className="flex w-full items-center justify-between text-neutral-500"
              >
                <p>{food.name}</p>
                <p>x{food.quantity}</p>
              </div>
            ))}
            <p className="pt-1 text-sm text-neutral-500">
              {formatStripeTimestampToDate(order.timeStamp)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
