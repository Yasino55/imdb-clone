import { fetchTopMovies } from "@/lib/requests";
import CardInfo from "@/components/CardInfo";
import { Pagination } from "@/components/ui/pagination";

interface Props {
  id: number;
  title: string;
  vote_average: number;
  vote_count: number;
  poster_path: string;
  media_type?: string;
}

const TopTrendingMovies = async () => {
  const movies = await fetchTopMovies();

  return (
    <div className=''>
      <h2 className='text-xl font-semibold mt-20 text-center md:text-2xl'>
        Top Trending Movies This Week
      </h2>

      <div className='grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-7 lg:grid-cols-4 xl:grid-cols-5 mt-5'>
        {movies.map((movie: Props) => (
          <CardInfo key={movie.id} item={movie} />
        ))}
        <Pagination />
      </div>
    </div>
  );
};
export default TopTrendingMovies;
