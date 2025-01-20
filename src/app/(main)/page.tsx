import TopMoviesCarousel from "@/components/movies/TopMoviesCarousel";
import Hero from "@/components/Hero";
import TopShowsCarousel from "@/components/shows/TopShowsCarousel";

const home = () => {
  return (
    <div>
      <main>
        <Hero />
        <div className='space-y-20'>
          <TopMoviesCarousel />
          <TopShowsCarousel />
        </div>
      </main>
    </div>
  );
};
export default home;
