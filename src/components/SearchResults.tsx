import { posterFormat, formatRating } from "@/lib/requests";
import Image from "next/image";
import Link from "next/link";
import { FaStar } from "react-icons/fa";

interface Props {
  id: number;
  title?: string;
  name?: string;
  vote_average: number;
  poster_path: string;
  media_type?: string;
  release_date?: string;
  first_air_date?: string;
}

interface ListProps {
  item: Props;
}

const SearchResults = ({ item }: ListProps) => {
  return (
    <Link href={`/movies/${item.id}`}>
      <div className='flex m-2' key={item.id}>
        <div className='min-w-[40px] max-w-[60px]'>
          <Image
            src={posterFormat(item.poster_path)}
            alt='Poster'
            width={0}
            height={0}
            sizes='100vw'
            className='w-full'
          />
        </div>
        <div className='ml-5 w-full truncate'>
          <div>
            <p className=''>{item.title || item.name}</p>
            <p className='text-sm text-muted-foreground'>
              {item.release_date || item.first_air_date}
            </p>
            <div className='flex items-center'>
              <FaStar className='fill-yellow-400 mr-1' />
              <p className='text-sm'>{formatRating(item.vote_average)}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
export default SearchResults;
