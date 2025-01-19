import { posterFormat, formatRating } from "@/lib/requests";
import Image from "next/image";
import Link from "next/link";
import { FaStar } from "react-icons/fa";
import { MdOutlineImageNotSupported } from "react-icons/md";

interface Props {
  item: {
    id: number;
    title?: string;
    name?: string;
    vote_average?: number;
    poster_path?: string;
    media_type?: string;
    release_date?: string;
    first_air_date?: string;
    profile_path?: string;
  };
}

const SearchResults = ({ item }: Props) => {
  const link =
    item.media_type === "movie"
      ? `/movie/${item.id}`
      : item.media_type === "tv"
      ? `/show/${item.id}`
      : `/person/${item.id}`;

  return (
    <Link href={link}>
      <div className='flex m-2' key={item.id}>
        {item.profile_path ? (
          <div className=''>
            <Image
              src={posterFormat(item.profile_path)}
              alt='Poster'
              width={100}
              height={0}
            />
          </div>
        ) : item.poster_path ? (
          <div className=''>
            <Image
              src={posterFormat(item.poster_path as string)}
              alt='Poster'
              width={100}
              height={0}
            />
          </div>
        ) : (
          <div className='flex items-center justify-center w-[100px] h-[100px] border-solid border-2 border-slate-500'>
            <MdOutlineImageNotSupported size={25} />
          </div>
        )}

        <div className='ml-5 w-full truncate'>
          <div>
            <p className=''>{item.title || item.name}</p>
            <p className='text-sm text-muted-foreground'>
              {item.release_date || item.first_air_date}
            </p>
            {!item.vote_average ? (
              <div></div>
            ) : (
              <div className='flex items-center'>
                <FaStar className='fill-yellow-400 mr-1' />
                <p className='text-sm'>{formatRating(item.vote_average)}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};
export default SearchResults;
