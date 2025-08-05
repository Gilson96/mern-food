import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { useLogoutMutation } from '@/features/auth/authApi';
import { logOut } from '@/features/auth/authSlice';
import { useAuth } from '@/features/auth/useAuth';
import { emptyCart } from '@/features/cart/cartSlice';
import { persistor } from '@/store';
import {
  Heart,
  HeartPlus,
  HousePlus,
  ListPlusIcon,
  LogOut,
  Menu,
  ReceiptText,
  Store,
  UserCircle2,
  UserPlus,
} from 'lucide-react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function CustomDrawer() {
  const user = useAuth();
  const [logout] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      await persistor.purge();
      dispatch(logOut());
      dispatch(emptyCart());
      navigate('/');
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      toast('oh no an error');
    }
  };

  return (
    <Drawer direction="left">
      <DrawerTrigger asChild>
        <Menu className='cursor-pointer'/>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto h-full w-full max-w-sm">
          {user.role === 'guest' ? (
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
          ) : (
            <div className="flex h-full flex-col justify-between p-[3%]">
              <div className="flex flex-col gap-8">
                <div className="flex w-full items-center justify-between">
                  <div className="flex items-center gap-1">
                    <UserCircle2 size={50} />
                    <p className="text-lg font-medium capitalize">{user.role}</p>
                  </div>
                  <div className="rounded-full border border-black px-[4%] py-[2%]">
                    <p>{user.address?.toUpperCase()}</p>
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
                  <Link
                    to={'/profile'}
                    state={{ tabChoice: 'orders' }}
                    className="flex items-center gap-0.5"
                  >
                    <ReceiptText />
                    <p>Orders</p>
                  </Link>
                  {user.role === 'admin' && (
                    <Link
                      to={'/profile'}
                      state={{ tabChoice: 'owned' }}
                      className="flex items-center gap-0.5"
                    >
                      <Store />
                      <p>Owned Restaurants</p>
                    </Link>
                  )}
                  {user.role !== 'admin' && (
                    <div className="flex flex-col pt-[2%]">
                      <p className="text-neutral-400 italic">Admin login required</p>
                      <hr className="h-[1px] w-full bg-neutral-100" />
                    </div>
                  )}

                  <Link
                    to={'/profile'}
                    state={{ tabChoice: 'addRestaurant' }}
                    className={`flex items-center gap-1 ${user.role === 'admin' && 'pt-[5%]'}`}
                  >
                    <UserPlus />
                    <p>Add your restaurant</p>
                  </Link>
                </div>
              </div>
              <Link to={'/'} className="flex items-center gap-1 pb-2" onClick={handleLogout}>
                <p>Logout</p>
                <LogOut size={20} />
              </Link>
            </div>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
