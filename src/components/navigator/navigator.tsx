import CustomDrawer from './customDrawer';
import { useAuth } from '@/features/auth/useAuth';
import { Button } from '../ui/button';
import { MapPin, ShoppingCartIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import useScreenSize from '@/hooks/useScreenSize';
import SearchRestaurantsDesktop from '../home/searchRestaurantsDesktop';
import { ListData } from '@/hooks/dataTypes';
import { HomePageProps } from '../home/homePage';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useState } from 'react';
import ShoppingCart from '../checkout/shoppingCart';

type NavigatorProps = {
  listData: ListData;
  loading: boolean;
  setIsFiltered: React.Dispatch<React.SetStateAction<HomePageProps>>;
};

const Navigator = ({ listData, setIsFiltered, loading }: NavigatorProps) => {
  const screenSize = useScreenSize();
  const user = useAuth();
  const userRole = user.role;
  const foodsInTheBasket = useSelector((state: RootState) => state.cart.cart);
  const [open, setOpen] = useState(false);

  return (
    <main className="flex items-center justify-between p-[3%]">
      {/*  logo and drawer */}
      <div
        onClick={() => setIsFiltered({ sortBy: 'All', price: 'Lowest' })}
        className="flex items-center gap-2"
      >
        <CustomDrawer />
        <Link to="/home" className="text-xl">
          <span className="font-medium text-green-500">Mern</span>
          <span> Foods</span>
        </Link>
      </div>

      {/*  address or loading skeleton */}
      <div className="flex w-auto items-center gap-1 rounded-full border border-black px-[2%] py-[0.5%]">
        <MapPin size={15} />
        {loading ? (
          <div className="h-4 w-24 animate-pulse rounded bg-neutral-300" />
        ) : (
          <p className="font-medium">{user?.address?.toUpperCase()}</p>
        )}
      </div>

      {/* desktop search bar */}
      {screenSize.width > 767 && (
        <SearchRestaurantsDesktop
          setIsFiltered={setIsFiltered}
          listData={listData}
          loading={loading}
        />
      )}

      {/* shopping cart */}
      <div className="flex items-center gap-3" onClick={() => setOpen(true)}>
        <div className="relative">
          <ShoppingCartIcon className="h-6 w-6" />
          <div className="hidden">
            <ShoppingCart open={open} setOpen={setOpen} />
          </div>
          {foodsInTheBasket.length > 0 && (
            <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-xs font-bold text-white">
              {foodsInTheBasket.length}
            </span>
          )}
        </div>

        {/* login */}
        {userRole === 'guest' && (
          <Link to="/" className="flex items-center gap-3">
            <Button className="rounded-full">Login</Button>
          </Link>
        )}
      </div>
    </main>
  );
};

export default Navigator;
