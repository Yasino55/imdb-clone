import { fetchMovieAndTvDetails } from "@/lib/requests";
import CardInfo from "./CardInfo";

interface Props {
  id: number;
  title?: string;
  name?: string;
  vote_average: number;
  vote_count: number;
  poster_path: string;
  media_type?: string;
}

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
      {items.map((item: Props) => (
        <CardInfo key={item.id} item={item} />
      ))}
    </div>
  );
};

export default WatchListItem;
