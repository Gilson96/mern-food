import { Label } from '@radix-ui/react-label';
import { Button } from '../ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../ui/card';
import { Input } from '../ui/input';
import { LoaderCircle, Utensils } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
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
    const userData = Object.fromEntries(formData.entries());
    let { email, password } = userData;
    email = String(email);
    password = String(password);

    try {
      const userLogin = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...userLogin }));
      email = '';
      password = '';
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
              <span className="font-bold text-green-500">Mern</span>
              <span>-foods</span>
            </p>
          </CardTitle>
        </CardHeader>
        <CardContent className="w-full">
          <form onSubmit={handleSubmit} className="flex w-full flex-col gap-6">
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="m@example.com" required />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input id="password" type="password" required />
              </div>
            </div>
            <div className="flex w-full flex-col gap-2">
              <button
                type="submit"
                className={`flex w-full cursor-pointer items-center justify-center rounded-md border px-4 py-2 font-medium text-white shadow ${isLoading ? 'bg-neutral-300' : 'bg-green-500 hover:bg-green-600'} `}
              >
                {isLoading ? <LoaderCircle color="white" className="animate-spin" /> : 'Login'}
              </button>
              <Button variant="outline" className="w-full cursor-pointer">
                Continue as a guest
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
};

export default LoginPage;
