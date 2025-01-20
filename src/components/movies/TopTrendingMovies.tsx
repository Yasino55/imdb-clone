import { fetchTopMovies } from "@/lib/requests";
import CardInfo from "@/components/CardInfo";

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
    <div>
      <h2 className='text-xl font-semibold mt-20 text-center md:text-2xl'>
        Top Trending Movies This Week
      </h2>

      <div className='grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-7 lg:grid-cols-4 xl:grid-cols-5 mt-5'>
        {movies.map((movie: Props) => (
          <div className='min-w-[100px] md:min-w-[210px]' key={movie.id}>
            <CardInfo item={movie} />
          </div>
        ))}
      </div>
    </div>
  );
};
export default TopTrendingMovies;
