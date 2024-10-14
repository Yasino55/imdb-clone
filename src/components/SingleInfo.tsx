"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { formatRating, posterFormat } from "@/lib/requests";
import SingleInfoSkeleton from "@/components/skeletons/SingleInfoSkeleton";

interface Props {
  title?: string;
  name?: string;
  poster_path: string;
  media_type: string;
  original_language: string;
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
  vote_count: number;
  overview: string;
}

interface ItemProps {
  item: Props;
}

const SingleInfo = ({ item }: ItemProps) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <SingleInfoSkeleton />;
  }

  return (
    <div className='flex mt-[100px] container'>
      <Image
        src={posterFormat(item.poster_path)}
        alt='Poster'
        width={400}
        height={0}
      />
      <div className='ml-20'>
        <h1 className='text-4xl font-medium'>{item.title || item.name}</h1>
        <div className='flex justify-between my-8'>
          <p>
            Type: <span className='font-semibold'>{item.media_type}</span>
          </p>
          <p>
            Language:{" "}
            <span className='font-semibold'>{item.original_language}</span>
          </p>
          <p>
            Release Date:{" "}
            <span className='font-semibold'>
              {item.release_date || item.first_air_date}
            </span>
          </p>
        </div>

        <div className='flex items-center mb-8'>
          <div className='flex items-center'>
            <FaStar className='fill-yellow-400 mr-1' />
            <p className='mr-2 mt-1 font-medium text-lg'>
              {formatRating(item.vote_average)}/10
            </p>
          </div>
          <p className='mt-1 text-xs pt-1'>({item.vote_count})</p>
        </div>
        <p className='max-w-[75%] font-medium'>{item.overview}</p>
      </div>
    </div>
  );
};
export default SingleInfo;
