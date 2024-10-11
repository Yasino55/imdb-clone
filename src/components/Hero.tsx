"use client";
import { fetchTopMovies, fetchTopShows, posterFormat } from "@/lib/requests";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import Autoplay from "embla-carousel-autoplay";

interface Props {
  backdrop_path: string;
}

const Hero = () => {
  const [posters, setPosters] = useState<Props[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const shows = await fetchTopMovies();
        const movies = await fetchTopShows();

        const showsArray = shows.slice(0, 5);
        const moviesArray = movies.slice(0, 5);
        let postersData = [...showsArray, ...moviesArray];
        postersData = shuffleArray(postersData);
        setPosters(postersData);
      } catch (error) {
        console.error("Error Fetching Hero Posters Data:", error);
      }
    };

    fetchData();
  }, []);

  const shuffleArray = (array: Props[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  return (
    <div className='flex gap-4 h-[500px] relative mb-20 mt-5'>
      <div className='flex flex-col justify-center items-center w-full z-50 '>
        <h2 className='text-3xl font-bold mb-2'>Welcome To IMDb</h2>
        <p className='text-center font-semibold text-muted-foreground'>
          Discover the ultimate destination for movie buffs and TV enthusiasts
          alike. Explore our vast collection of films and shows, all in one
          place.
        </p>
      </div>
      <div className='absolute'>
        <Carousel opts={{ loop: true }} plugins={[Autoplay({ delay: 4000 })]}>
          <CarouselContent>
            {posters.map((poster: Props) => (
              <CarouselItem>
                <Image
                  src={posterFormat(poster.backdrop_path)}
                  alt='Poster'
                  height={0}
                  width={0}
                  sizes='100vw'
                  className='w-full h-[475px]'
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className='absolute inset-0 bg-black bg-opacity-60 backdrop-blur-xs'></div>
      </div>
    </div>
  );
};
export default Hero;
