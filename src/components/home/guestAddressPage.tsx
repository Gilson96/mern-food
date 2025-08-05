import { setCredentials } from '@/features/auth/authSlice';
import { MapPin } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import green_bg from '../../assets/green_bg.jpg';
import { Input } from '../ui/input';
import { useAuth } from '@/features/auth/useAuth';

const GuestAddressPage = () => {
  const user = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formatPostcode = (postcode: string): string => {
    return postcode.trim().toUpperCase().replace(/\s+/, ' ');
  };

  const isManchesterPostcode = (postcode: string): boolean => {
    return /^M\d{1,2}\s?\d[A-Z]{2}$/i.test(postcode.trim());
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    let address = formData.get('address') as string;
    address = formatPostcode(address);

    try {
      if (!isManchesterPostcode(address)) {
        toast(
          'Please enter a valid Manchester UK postcode (e.g. M1 1AA) as restaurants are Manchester-based',
          {
            position: 'bottom-center',
            style: { backgroundColor: 'red', color: 'white' },
          },
        );
        return;
      }
      dispatch(setCredentials({ ...user.user, address: address }));
      navigate('/home');
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      toast('Invalid credentials. Please try again', {
        position: 'bottom-center',
        style: { backgroundColor: 'red', color: 'white' },
      });
    }
  };

  return (
    <main
      style={{ backgroundImage: `url(${green_bg})` }}
      className="flex min-h-screen w-full flex-col items-center justify-center gap-5 bg-cover bg-center bg-no-repeat"
    >
      <h1 className="text-2xl font-medium max-md:max-w-sm md:relative md:bottom-[3rem] md:w-[80%] md:text-5xl">
        Order delivery near you
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex w-[80%] flex-col items-center justify-center gap-6 max-md:max-w-sm md:flex-row"
      >
        <div className="flex flex-col w-[80%] gap-6 md:w-[100%]">
          <div className="relative w-full">
            <MapPin className="absolute top-1/2 left-3 -translate-y-1/2 text-black" size={18} />
            <Input
              id="address"
              name="address"
              type="text"
              placeholder="Enter delivery address"
              className="h-[3rem] bg-white pl-10 shadow"
            />
          </div>
        </div>
        <div className="flex w-[80%] flex-col gap-2 md:flex-row">
          <button
            type="submit"
            className={`flex cursor-pointer  items-center justify-center rounded-md border bg-green-500 px-4 py-[3%] font-medium text-white shadow hover:bg-green-600 md:h-[3rem]`}
          >
            Find Food
          </button>
          <div className="flex items-center justify-between md:hidden">
            <hr className="h-[1px] w-full bg-white" />
            <p className="px-3 text-sm font-medium text-green-500">or</p>
            <hr className="h-[1px] w-full bg-white" />
          </div>
          <Link
            to={'/'}
            type="submit"
            className={`flex max-w-sm cursor-pointer items-center justify-center rounded-md border bg-black px-4 py-[3%] font-medium text-white shadow hover:bg-neutral-800 md:h-[3rem] md:w-[30%]`}
          >
            Login
          </Link>
        </div> 
      </form>
    </main>
  );
};

export default GuestAddressPage;
