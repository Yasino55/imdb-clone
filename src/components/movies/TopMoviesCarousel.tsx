import { fetchTopMovies } from "@/lib/requests";
import CardInfo from "@/components/CardInfo";
import CarouselBox from "@/components/CarouselBox";
import Link from "next/link";

const TopMoviesCarousel = async () => {
  const data = await fetchTopMovies();
  const moviesData = data.slice(0, 10);

  return (
    <div className='space-y-5'>
      <div className='flex items-center justify-between'>
        <h3 className='text-muted-foreground text-xl font-semibold'>
          Top 10 Movies This Week
        </h3>
        <Link className='text-primary underline' href='/top-trending-movies'>
          View All
        </Link>
      </div>
      <div>
        <CarouselBox data={moviesData}>
          {(movie) => <CardInfo item={movie} />}
        </CarouselBox>
      </div>
    </div>
  );
};
export default TopMoviesCarousel;
