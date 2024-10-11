"use client";
import { useState } from "react";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { posterFormat, formatRating } from "@/lib/requests";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import Link from "next/link";
// import TrailerButton from "./TrailerButton";
import { Button } from "./ui/button";
import CardSkeleton from "@/components/CardSkeleton";

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
  const [imageLoaded, setImageLoaded] = useState(false);

  const link =
    item.media_type === "movie" ? `/movies/${item.id}` : `/shows/${item.id}`;

  return (
    <Card className='w-[200px] h-[500px] bg-secondary' key={item.id}>
      {!imageLoaded && <CardSkeleton />}
      <Link href={link}>
        <Image
          src={posterFormat(item.poster_path)}
          alt='Poster'
          width={0}
          height={0}
          sizes='100vw'
          className={`w-full h-[300px] rounded-t-md mb-3 transition-opacity duration-500 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setImageLoaded(true)}
        />
      </Link>
      {imageLoaded && (
        <>
          <CardContent>
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
          <CardFooter className='mb-[-5px]'>
            <Button>Trailer</Button>
            {/* <TrailerButton item={item} /> */}
          </CardFooter>
        </>
      )}
    </Card>
  );
};
export default CardInfo;
