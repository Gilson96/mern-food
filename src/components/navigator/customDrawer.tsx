import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { LogOut, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';
import CustomDrawerGuest from './customDrawerGuest';
import CustomDrawerUser from './customDrawerUser';

export type CustomDrawerProps = {
  role?: 'admin' | 'user' | 'guest' | null;
  handleLogout?: () => Promise<void>;
};

export default function CustomDrawer({ handleLogout, role }: CustomDrawerProps) {
  return (
    <Drawer direction="left">
      <DrawerTrigger asChild>
        <Menu className="cursor-pointer" />
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto h-full w-full max-w-sm">
          {role === 'guest' ? (
            <CustomDrawerGuest />
          ) : (
            <div className="flex h-full flex-col justify-between p-[3%]">
              <CustomDrawerUser role={role} />
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
