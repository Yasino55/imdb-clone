import { fetchTopShows } from "@/lib/requests";
import CardInfo from "@/components/CardInfo";

interface Props {
  id: number;
  name: string;
  vote_average: number;
  vote_count: number;
  poster_path: string;
  media_type?: string;
}

const AllShows = async () => {
  const shows = await fetchTopShows();

  return (
    <div className=''>
      <h2 className='text-2xl font-semibold mt-20'>
        Top Trending Shows This Week
      </h2>

      <div className='grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-7 lg:grid-cols-4 xl:grid-cols-5 mt-5'>
        {shows.map((show: Props) => (
          <CardInfo key={show.id} item={show} />
        ))}
      </div>
    </div>
  );
};
export default AllShows;
