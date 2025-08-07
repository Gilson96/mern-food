import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { useLogoutMutation } from '@/features/auth/authApi';
import { logOut } from '@/features/auth/authSlice';
import { useAuth } from '@/features/auth/useAuth';
import { emptyCart } from '@/features/cart/cartSlice';
import { persistor } from '@/store';
import { LogOut, Menu } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import CustomDrawerGuest from './customDrawerGuest';
import CustomDrawerUser from './customDrawerUser';

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
        <Menu className="cursor-pointer" />
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto h-full w-full max-w-sm">
          {user.role === 'guest' ? (
            <CustomDrawerGuest />
          ) : (
            <div className="flex h-full flex-col justify-between p-[3%]">
              <CustomDrawerUser user={user} />
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
