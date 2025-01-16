import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { fetchTvSeasons, formatRating, posterFormat } from "@/lib/requests";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import TvSeasons from "@/components/shows/TvSeasons";
import TvShowCast from "./TvShowCast";

interface Props {
  item: {
    id: string;
    name: string;
    poster_path: string;
    media_type: string;
    original_language: string;
    first_air_date: string;
    vote_average: number;
    vote_count: number;
    overview: string;
  };
}

const TvShowInfoPage = async ({ item }: Props) => {
  const data = await fetchTvSeasons(item.id);
  // console.log(seasons);
  return (
    <div className='space-y-10'>
      <div className='flex flex-col mt-[50px] gap-10 md:px-10 md:flex-row md:space-x-10'>
        <div className='flex items-center justify-center'>
          <Image
            src={posterFormat(item.poster_path as string)}
            alt='Poster'
            width={500}
            height={0}
            priority
            className='md:min-w-[350px] max-w-[350px]'
          />
        </div>

        <div className='flex flex-col gap-5 w-full'>
          <h1 className='text-4xl font-medium md:text-5xl'>{item.name}</h1>
          <div className='flex flex-col gap-1'>
            <p>- Tv Series</p>

            <p>- {item.first_air_date}</p>
          </div>

          <div className='flex items-center'>
            <FaStar className='fill-yellow-400 mr-1' />
            <p className='mr-2 font-medium text-lg'>
              {formatRating(item.vote_average)}/10
            </p>
            <p className='pt-2 text-xs'>({item.vote_count})</p>
          </div>
          <div>
            <Accordion type='single' collapsible className='w-full'>
              <AccordionItem value='item-1'>
                <AccordionTrigger className='text-xl'>
                  Overview
                </AccordionTrigger>
                <AccordionContent>{item.overview}</AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
      <div className='space-y-10'>
        <TvSeasons data={data} id={item.id} />
        <TvShowCast id={item.id} />
      </div>
    </div>
  );
};
export default TvShowInfoPage;
