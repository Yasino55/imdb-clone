"use client";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { formatRating, posterFormat } from "@/lib/requests";

interface Props {
  item: {
    title?: string;
    name?: string;
    poster_path?: string;
    media_type: string;
    original_language: string;
    release_date?: string;
    first_air_date?: string;
    vote_average: number;
    vote_count: number;
    overview: string;
  };
}

const SingleInfo = ({ item }: Props) => {
  return (
    <>
      <div className='flex flex-col mt-[50px] pb-10 text-center items-center gap-2 lg:flex-row'>
        <div className='md:min-w-[350px] min-w-[200px] bg-red-800'>
          <Image
            src={posterFormat(item.poster_path as string)}
            alt='Poster'
            width={500}
            height={0}
            className='w-full'
          />
        </div>

        <div className='flex flex-col items-center gap-5'>
          <h1 className='text-4xl font-medium'>{item.title || item.name}</h1>
          <div className='space-y-2 flex flex-col'>
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

          <div className='flex items-center'>
            <FaStar className='fill-yellow-400 mr-1' />
            <p className='mr-2 font-medium text-lg'>
              {formatRating(item.vote_average)}/10
            </p>
            <p className='pt-2 text-xs'>({item.vote_count})</p>
          </div>
          <p className='max-w-[75%] font-medium'>{item.overview}</p>
        </div>
      </div>
    </>
  );
};
export default SingleInfo;
