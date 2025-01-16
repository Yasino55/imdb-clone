"use client";

import {
  fetchTvEpisodes,
  formatDate,
  formatRating,
  posterFormat,
} from "@/lib/requests";
import { useEffect, useState } from "react";
import { Card, CardContent, CardTitle } from "../ui/card";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { MdOutlineImageNotSupported } from "react-icons/md";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface Seasons {
  season_number: string;
}

interface Props {
  data: Seasons[];
  id: string;
}

interface Episode {
  id: string;
  name: string;
  runtime: string;
  vote_average: number;
  vote_count: string;
  still_path: string;
  episode_number: string;
  air_date: string;
  overview: string;
}

const TvSeasons = ({ data, id }: Props) => {
  const [selectedSeason, setSelectedSeason] = useState<string>("1");
  const [episodes, setEpisodes] = useState<any>([]);

  useEffect(() => {
    if (selectedSeason) {
      const fetchEpisodes = async () => {
        try {
          const fetchedEpisodes = await fetchTvEpisodes(id, selectedSeason);
          setEpisodes(fetchedEpisodes);
        } catch (error) {
          console.error("Error fetching episodes:", error);
        }
      };
      fetchEpisodes();
    }
  }, [selectedSeason]);

  return (
    <div className='space-y-10 flex flex-col items-center'>
      <div className='flex flex-col items-center gap-3'>
        <p className='text-lg text-muted-foreground font-semibold'>Seasons:</p>
        <Select onValueChange={(value) => setSelectedSeason(value)}>
          <SelectTrigger className='w-[100px]'>
            <SelectValue placeholder='1' />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {data.map((season) => (
                <SelectItem
                  key={season.season_number}
                  value={season.season_number}
                  className={`${
                    season.season_number == "0" ? "hidden" : "block"
                  }`}
                >
                  {season.season_number}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10'>
        {episodes.map((episode: Episode) => (
          <Card key={episode.id} className='w-[250px]'>
            {episode.still_path ? (
              <Image
                src={posterFormat(episode.still_path)}
                alt='poster'
                width={500}
                height={0}
                className='rounded-t-md'
              />
            ) : (
              <div className='flex items-center justify-center w-full h-[140px] border-solid border-2 border-slate-500'>
                <MdOutlineImageNotSupported size={50} />
              </div>
            )}

            <CardContent className='p-3 space-y-1 overflow-hidden'>
              <CardTitle className='text-md'>
                {episode.episode_number}. {episode.name}
              </CardTitle>
              <div className='flex gap-3'>
                <div className='flex items-center'>
                  <FaStar className='fill-yellow-400 mr-1' size={13} />
                  <p className='mr-1 text-sm'>
                    {formatRating(episode.vote_average)}
                  </p>
                  <p className='text-muted-foreground text-xs'>
                    ({episode.vote_count})
                  </p>
                </div>
                <div className='flex gap-3'>
                  <p className='text-sm text-muted-foreground'>
                    {formatDate(episode.air_date)}
                  </p>
                  <p className='text-sm text-muted-foreground'>
                    {episode.runtime ? `${episode.runtime}m` : ""}
                  </p>
                </div>
              </div>
              <p className='line-clamp-4'>{episode.overview}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TvSeasons;
