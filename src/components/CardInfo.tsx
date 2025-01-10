"use client";
import { useState } from "react";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { posterFormat, formatRating } from "@/lib/requests";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import Link from "next/link";
// import TrailerButton from "./TrailerButton";
import { Button } from "./ui/button";
import CardSkeleton from "@/components/skeletons/CardSkeleton";
import AddToWatchListButton from "./AddToWatchListButton";

interface Props {
  item: {
    id: number;
    title?: string;
    name?: string;
    vote_average: number;
    vote_count: number;
    poster_path: string;
    media_type?: string;
  };
}

const CardInfo = ({ item }: Props) => {
  const [imageLoaded, setImageLoaded] = useState(true);

  const link =
    item.media_type === "movie" ? `/movie/${item.id}` : `/show/${item.id}`;

  return (
    <Card className='bg-secondary' key={item.id}>
      {imageLoaded && <CardSkeleton />}
      <Link href={link}>
        <Image
          src={posterFormat(item.poster_path)}
          alt='Poster'
          width={0}
          height={0}
          sizes='100vw'
          className={`w-full rounded-t-md mb-3 transition-opacity duration-500 ${
            !imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setImageLoaded(false)}
        />
      </Link>

      <CardContent className='w-[200px]'>
        <div className='flex items-center mb-1'>
          <FaStar className='fill-yellow-400 mr-2' />
          <p className='mt-1 mr-2'>{formatRating(item.vote_average)}</p>
          <p className='mt-1 text-muted-foreground text-sm'>
            ({item.vote_count})
          </p>
        </div>
        <Link href={link}>
          <CardTitle className='text-md truncate'>
            {item.title || item.name}
          </CardTitle>
        </Link>
      </CardContent>
      <CardFooter className='flex justify-between mb-[-5px]'>
        <Button>Trailer</Button>
        <AddToWatchListButton item={item} />
        {/* <TrailerButton item={item} /> */}
      </CardFooter>
    </Card>
  );
};
export default CardInfo;
