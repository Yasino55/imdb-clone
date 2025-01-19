import { auth } from "@/auth";
import CardInfo from "@/components/CardInfo";
import WatchListItem from "@/components/WatchListItem";
import { fetchMovieAndTvDetails, getWatchList } from "@/lib/requests";

interface Props {
  id: string;
  itemId: string;
  itemType: string;
}

const WatchList = async () => {
  const session = await auth();
  const id = session?.user?.id as string;

  const data = await getWatchList(id);
  return (
    <div>
      <h3 className='text-xl font-semibold mt-20 text-center md:text-2xl'>
        Watch List
      </h3>
      <div className='grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-7 lg:grid-cols-4 xl:grid-cols-5 mt-5'>
        {data.map((item: Props) => (
          <WatchListItem
            key={item.id}
            itemId={item.itemId}
            itemType={item.itemType}
          />
        ))}
      </div>
    </div>
  );
};

export default WatchList;
