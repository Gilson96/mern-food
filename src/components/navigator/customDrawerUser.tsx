import { Heart, ReceiptText, Store, UserCircle2, UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CustomDrawerProps } from './customDrawer';

const CustomDrawerUser = ({ role }: CustomDrawerProps) => {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-1">
          <UserCircle2 size={50} />
          <p className="text-lg font-medium capitalize">{role}</p>
        </div>
      </div>
      <div className="flex flex-col gap-3 px-[2%]">
        <Link
          to={'/profile'}
          state={{ tabChoice: 'favorites' }}
          className="flex items-center gap-0.5"
        >
          <Heart />
          <p>Favorites</p>
        </Link>
        <Link to={'/profile'} state={{ tabChoice: 'orders' }} className="flex items-center gap-0.5">
          <ReceiptText />
          <p>Orders</p>
        </Link>
        {role === 'admin' && (
          <Link
            to={'/profile'}
            state={{ tabChoice: 'owned' }}
            className="flex items-center gap-0.5"
          >
            <Store />
            <p>Owned Restaurants</p>
          </Link>
        )}
        {role !== 'admin' && (
          <div className="flex flex-col pt-[2%]">
            <p className="text-neutral-400 italic">Admin login required</p>
            <hr className="h-[1px] w-full bg-neutral-100" />
          </div>
        )}

        <Link
          to={'/profile'}
          state={{ tabChoice: 'addRestaurant' }}
          className={`flex items-center gap-1 ${role === 'admin' && 'pt-[5%]'}`}
        >
          <UserPlus />
          <p>Add your restaurant</p>
        </Link>
      </div>
    </div>
  );
};

export default CustomDrawerUser;
