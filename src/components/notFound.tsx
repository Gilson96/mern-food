import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { AlertCircle } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-6 bg-white p-6 text-center">
      <AlertCircle className="h-16 w-16 text-red-500" />
      <h1 className="text-3xl font-bold text-gray-800">404 - Page Not Found</h1>
      <p className="max-w-sm text-gray-600">
        Sorry, the page you’re looking for doesn’t exist or has been moved.
      </p>
      <Link to="/" className="mt-4">
        <Button className="cursor-pointer rounded-full bg-green-500 hover:bg-green-600">
          Go to Homepage
        </Button>
      </Link>
    </div>
  );
};

export default NotFound;
