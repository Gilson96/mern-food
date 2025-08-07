import { HeartPlus, HousePlus, ListPlusIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { logOut } from '@/features/auth/authSlice';

const CustomDrawerGuest = () => {
  return (
    <div className="flex flex-col gap-10 p-[10%]">
      <Button asChild>
        <Link
          to={'/'}
          onClick={() => {
            logOut();
          }}
        >
          Login
        </Link>
      </Button>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col">
          <p className="text-neutral-400 italic">User login required</p>
          <hr className="h-[1px] w-full bg-neutral-100" />
        </div>
        <Link to={'/'} className="flex items-center gap-1">
          <ListPlusIcon />
          <p>Add a review</p>
        </Link>
        <Link to={'/'} className="flex items-center gap-1">
          <HeartPlus />
          <p>Add to your favorites</p>
        </Link>
        <div className="flex flex-col">
          <p className="text-neutral-400 italic">Admin login required</p>
          <hr className="h-[1px] w-full bg-neutral-100" />
        </div>
        <Link to={'/'} className="flex items-center gap-1">
          <HousePlus />
          <p>Add your restaurant</p>
        </Link>
      </div>
    </div>
  );
};

export default CustomDrawerGuest;
