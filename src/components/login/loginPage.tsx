import { Label } from '@radix-ui/react-label';
import { Button } from '../ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../ui/card';
import { Input } from '../ui/input';
import { LoaderCircle, Utensils } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useLoginMutation } from '@/features/auth/authApi';
import { toast } from 'sonner';
import { setCredentials } from '@/features/auth/authSlice';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    console.log(email);
    try {
      const userLogin = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...userLogin }));
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
    <main className="flex h-screen w-screen items-center justify-center">
      <Card className="w-[80%] sm:w-full sm:max-w-sm">
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
          <form onSubmit={handleSubmit} className="flex w-full flex-col gap-6">
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="m@example.com" />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input id="password" name="password" type="password" placeholder='abc123' />
              </div>
            </div>
            <div className="flex w-full flex-col gap-2">
              <button
                type="submit"
                className={`flex w-full cursor-pointer items-center justify-center rounded-md border px-4 py-2 font-medium text-white shadow ${isLoading ? 'bg-neutral-300' : 'bg-green-500 hover:bg-green-600'} `}
              >
                {isLoading ? <LoaderCircle color="white" className="animate-spin" /> : 'Login'}
              </button>
              <Button asChild variant="outline" className="w-full cursor-pointer">
                <Link to={'/guestAddress'}>Continue as a guest</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
};

export default LoginPage;
