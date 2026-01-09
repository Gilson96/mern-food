import { Button } from '../ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Loader2Icon, Utensils } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLogin } from '@/features/auth/authSlice';
import { useGetUserQuery } from '@/features/auth/authApi';

const LoginPage = () => {
  const { data: userDetails, isLoading, isFetching, refetch } = useGetUserQuery();
  const dispatch = useDispatch();

  return (
    <main className="flex h-full w-full items-center justify-center">
      <Card className="mt-[3rem] w-[80%] sm:w-full sm:max-w-sm">
        <CardHeader className="flex items-center justify-center">
          <CardTitle className="flex items-center gap-1">
            <Utensils color="oklch(72.3% 0.219 149.579)" />
            <p className="flex text-2xl">
              <span className="font-medium text-green-500">Mern</span>
              <span>-foods</span>
            </p>
          </CardTitle>
        </CardHeader>
        <CardContent className="w-full">
          <div className="flex w-full flex-col gap-2">
            <Button
              onClick={() => {
                dispatch(setLogin({ role: 'guest' }));
              }}
              asChild
              variant="outline"
              className="w-full cursor-pointer"
            >
              <Link to={'/'}>Continue as a guest</Link>
            </Button>
            <Button
              onClick={() => {
                dispatch(setLogin({ role: 'user', user_id: userDetails?.[1]._id }));
              }}
              asChild
              variant="outline"
              className="w-full cursor-pointer bg-green-500 text-white"
            >
              <Link to={'/'}>
                {isLoading || isFetching ? (
                  <Loader2Icon className="animate animate-spin text-white" />
                ) : (
                  'Login as a user'
                )}{' '}
              </Link>
            </Button>
            <Button
              onClick={() => {
                dispatch(setLogin({ role: 'admin', user_id: userDetails?.[0]._id }));
              }}
              asChild
              variant="outline"
              className="w-full cursor-pointer bg-black text-white"
            >
              <Link to={'/'}>
                {isLoading || isFetching ? (
                  <Loader2Icon className="animate animate-spin text-white" />
                ) : (
                  'Login as an Admin'
                )}{' '}
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
};

export default LoginPage;
