import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navigator from '../navigator/navigator';
import { useListTabsData } from '@/hooks/useListTabsData';
import { UserCircle2 } from 'lucide-react';
import { useGetUserQuery } from '@/features/auth/authApi';
import { useLocation } from 'react-router-dom';
import { useFavorites } from '@/hooks/useFavorites';
import Favorites from './favorites';
import Orders from './orders';
import AddRestaurant from './addRestaurant';
import OwnedRestaurant from './ownedRestaurant';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

type ProfilePageProps = {
  state: { tabChoice: string };
};

const ProfilePage = () => {
  const role = useSelector((state: RootState) => state.auth.role);
  const {
    listData,
    isLoading: listDataLoading,
    isFetching: listDataFecthing,
  } = useListTabsData(undefined);
  const { data: userDetails, isLoading, isFetching } = useGetUserQuery();
  const { state }: ProfilePageProps = useLocation();
  const findUser = userDetails?.find((u) => u.role === role);
  const { toggleFavorite } = useFavorites();

  const listLoading = listDataLoading || listDataFecthing;
  const userLoading = isLoading || isFetching;

  return (
    <div>
      <Navigator loading={listLoading} listData={listData} setIsFiltered={() => {}} />
      <div className="flex h-[8rem] items-center justify-start gap-2 border-b bg-neutral-100 p-[3%]">
        <UserCircle2 color="oklch(72.3% 0.219 149.579)" size={80} />
        <p className="text-2xl capitalize">{role}</p>
      </div>
      <div className="w-full p-[3%]">
        <Tabs defaultValue={state.tabChoice} className="w-full">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger className="cursor-pointer" value="favorites">
                Favorites
              </TabsTrigger>
              <TabsTrigger className="cursor-pointer" value="orders">
                Orders
              </TabsTrigger>
              {role === 'admin' && (
                <TabsTrigger className="cursor-pointer" value="owned">
                  Owned
                </TabsTrigger>
              )}
            </TabsList>
            {role === 'admin' && <AddRestaurant state={state.tabChoice} findUser={findUser!} />}
          </div>
          <TabsContent value="favorites">
            <Favorites
              listLoading={listLoading}
              userLoading={userLoading}
              findUser={findUser!}
              listData={listData}
              toggleFavorite={toggleFavorite}
            />
          </TabsContent>
          <TabsContent value="orders">
            <Orders findUser={findUser} userLoading={userLoading} />
          </TabsContent>
          {role === 'admin' && (
            <TabsContent value="owned">
              <OwnedRestaurant
                listLoading={listLoading}
                findUser={findUser!}
                listData={listData!}
                userLoading={userLoading}
              />
            </TabsContent>
          )}
        </Tabs>
      </div>
    </div>
  );
};

export default ProfilePage;
