import TopMoviesCarousel from "@/components/movies/TopMoviesCarousel";
import Hero from "@/components/Hero";
import TopShowsCarousel from "@/components/shows/TopShowsCarousel";

const home = () => {
  return (
    <div>
      <Hero />
      <div className='space-y-20 mb-10'>
        <TopMoviesCarousel />
        <TopShowsCarousel />
      </div>
    </div>
  );
};
export default home;
