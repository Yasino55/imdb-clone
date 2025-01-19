import { fetchMovieAndTvDetails } from "@/lib/requests";
import CardInfo from "./CardInfo";

const WatchListItem = async ({
  itemId,
  itemType,
}: {
  itemId: string;
  itemType: string;
}) => {
  const data = await fetchMovieAndTvDetails(itemId, itemType);
  const items = Array.isArray(data.results) ? data.results : [data];
  return (
    <div>
      {items.map((item: any) => (
        <CardInfo key={item.id} item={item} />
      ))}
    </div>
  );
};

export default WatchListItem;
