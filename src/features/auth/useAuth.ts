import { RootState } from '@/store';
import { useSelector } from 'react-redux';
/**
 * useAuth hook extracts the current user's role from Redux state
 */
export function useAuth() {
  const user = useSelector((state: RootState) => state.auth);
  let role: 'admin' | 'user' | 'guest' = 'guest';
  if (user?.role === 'admin') role = 'admin';
  else if (user?.role === 'user') role = 'user';

  const address = user?.role === 'guest' ? user?.address || '' : user?.address;

  return {
    isAuthenticated: !!user,
    role,
    address,
    user,
  };
}
