import CustomDrawer from './customDrawer';
import { Button } from '../ui/button';
import { ShoppingCartIcon } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import useScreenSize from '@/hooks/useScreenSize';
import SearchRestaurantsDesktop from '../home/searchRestaurantsDesktop';
import { ListData } from '@/hooks/dataTypes';
import { HomePageProps } from '../home/homePage';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import ShoppingCart from '../checkout/shoppingCart';
import { logOut } from '@/features/auth/authSlice';
import { emptyCart } from '@/features/cart/cartSlice';
import { persistor } from '@/store';
import { toast } from 'sonner';

type NavigatorProps = {
  listData: ListData;
  loading: boolean;
  setIsFiltered: React.Dispatch<React.SetStateAction<HomePageProps>>;
};

const Navigator = ({ listData, setIsFiltered, loading }: NavigatorProps) => {
  const screenSize = useScreenSize();
  const foodsInTheBasket = useSelector((state: RootState) => state.cart.cart);
  const role = useSelector((state: RootState) => state.auth.role);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await persistor.purge();
      dispatch(logOut());
      dispatch(emptyCart());
      navigate('/login');
    } catch (err) {
      toast('oh no an error');
    }
  };

  return (
    <main className="flex items-center justify-between p-[3%]">
      <div
        onClick={() => setIsFiltered({ sortBy: 'All', price: 'Lowest' })}
        className="flex items-center gap-2"
      >
        <CustomDrawer role={role} handleLogout={handleLogout} />
        <Link to="/" className="text-xl">
          <span className="font-medium text-green-500">Mern</span>
          <span> Foods</span>
        </Link>
      </div>

      {screenSize.width > 767 && (
        <SearchRestaurantsDesktop
          setIsFiltered={setIsFiltered}
          listData={listData}
          loading={loading}
        />
      )}

      <div className="flex cursor-pointer items-center gap-3">
        <div className="relative">
          <ShoppingCart>
            <ShoppingCartIcon className="h-6 w-6 cursor-pointer" />
          </ShoppingCart>
          {foodsInTheBasket.length > 0 && (
            <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-xs font-bold text-white">
              {foodsInTheBasket.length}
            </span>
          )}
        </div>

        <Link
          to="/login"
          onClick={() => {
            dispatch(logOut());
          }}
          className="flex items-center gap-3"
        >
          <Button className="rounded-full">{role === 'guest' ? 'Login' : 'Logout'}</Button>
        </Link>
      </div>
    </main>
  );
};

export default Navigator;
