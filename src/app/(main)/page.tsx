import TopMoviesCarousel from "@/components/movies/TopMoviesCarousel";
import Hero from "@/components/Hero";
import TopShowsCarousel from "@/components/shows/TopShowsCarousel";

const home = () => {
  return (
    <div>
      <main className='space-y-20 mb-10'>
        <Hero />
        <TopMoviesCarousel />
        <TopShowsCarousel />
      </main>
    </div>
  );
};
export default home;
