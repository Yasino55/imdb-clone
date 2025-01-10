"use client";
import { backdropFormat, fetchTopMovies, fetchTopShows } from "@/lib/requests";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Skeleton } from "./ui/skeleton";

interface Props {
  backdrop_path: string;
  id: string;
}

const Hero = () => {
  const [posters, setPosters] = useState<Props[]>([]);
  const [loading, setLoading] = useState(true);

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
    <>
      {loading && (
        <Skeleton className='h-[200px] md:h-[300px] lg:h-[400px] xl:h-[500px] mb-20 mt-5'></Skeleton>
      )}
      <div className='flex gap-4 relative mb-20 mt-5'>
        <Carousel opts={{ loop: true }} plugins={[Autoplay({ delay: 4000 })]}>
          <CarouselContent>
            {posters.map((poster: Props) => (
              <CarouselItem key={poster.id}>
                <Image
                  src={backdropFormat(poster.backdrop_path)}
                  alt='Poster'
                  height={0}
                  width={1280}
                  style={{ objectFit: "cover" }}
                  className='h-[200px] md:h-[300px] lg:h-[400px] xl:h-[500px]'
                  onLoad={() => setLoading(false)}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </>
  );
};
export default Hero;
