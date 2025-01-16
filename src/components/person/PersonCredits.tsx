"use client";

import { fetchPersonCredits, posterFormat } from "@/lib/requests";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import { Card, CardContent, CardTitle } from "../ui/card";
import Link from "next/link";
import Image from "next/image";
import { MdOutlineImageNotSupported } from "react-icons/md";
import { useEffect, useState } from "react";

interface Props {
  id: string;
  poster_path: string;
  title?: string;
  name?: string;
  release_date?: string;
  first_air_date?: string;
  credit_id: string;
}

const PersonCredits = ({ id }: { id: string }) => {
  const [selectedType, setSelectedType] = useState<string>("movie");
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    if (selectedType) {
      const fetchEpisodes = async () => {
        try {
          const fetchedEpisodes = await fetchPersonCredits(id, selectedType);
          setData(fetchedEpisodes);
        } catch (error) {
          console.error("Error fetching episodes:", error);
        }
      };
      fetchEpisodes();
    }
  }, [selectedType]);

  return (
    <div className='space-y-8'>
      <div>
        <ToggleGroup
          type='single'
          value={selectedType}
          onValueChange={(value) => {
            setSelectedType(value);
          }}
        >
          <ToggleGroupItem value='movie'>Movie</ToggleGroupItem>
          <ToggleGroupItem value='tv'>Tv-show</ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-10'>
        {data.map((credit: Props) => (
          <Card className='bg-secondary border-none' key={credit.credit_id}>
            {credit.poster_path ? (
              <Link
                href={
                  selectedType == "movie"
                    ? `/movie/${credit.id}`
                    : `/show/${credit.id}`
                }
              >
                <Image
                  src={posterFormat(credit.poster_path)}
                  alt='Poster'
                  width={500}
                  height={0}
                  className=' rounded-t-md'
                />
              </Link>
            ) : (
              <div className='flex items-center justify-center w-full h-[324px] border-solid border-2 border-slate-500'>
                <MdOutlineImageNotSupported size={50} />
              </div>
            )}

            <CardContent className='w-[200px] p-4'>
              <Link href={"/"}>
                <CardTitle className='text-md truncate'>
                  {credit.title || credit.name}
                </CardTitle>
              </Link>
              <p>{credit.release_date || credit.first_air_date}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PersonCredits;
