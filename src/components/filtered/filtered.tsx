import { useListTabsData } from '@/hooks/useListTabsData';
import { useLocation, useParams } from 'react-router-dom';
import Navigator from '../navigator/navigator';

type FilteredProps = {
  state: { category: string };
};

const Filtered = () => {
  const { _id } = useParams();
  const { listData, isLoading, isFetching } = useListTabsData();

  const { state }: FilteredProps = useLocation();
  console.log(state);

  return (
    <div className="main flex flex-col">
      <Navigator listData={listData} />
    </div>
  );
};

export default Filtered;
