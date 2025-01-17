"use client";
import { fetchCast, posterFormat } from "@/lib/requests";
import { Card, CardContent, CardTitle } from "../ui/card";
import Link from "next/link";
import { CgProfile } from "react-icons/cg";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Props {
  id: string;
  name: string;
  profile_path: string;
  character: string;
  known_for_department: string;
}

const TvShowCast = ({ id }: { id: string }) => {
  const [cast, setCast] = useState<any>([]);

  useEffect(() => {
    const fetchTvCast = async () => {
      try {
        const data = await fetchCast(id, "tv");
        setCast(data);
      } catch (error) {
        console.error("Error fetching episodes:", error);
      }
    };
    fetchTvCast();
  }, [id]);

  return (
    <div className=''>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-10 mt-10'>
        {cast.map((cast: Props) => (
          <Card className=' w-[px]' key={cast.id}>
            {cast.profile_path ? (
              <Link href={`/person/${cast.id}`}>
                <Image
                  src={posterFormat(cast.profile_path)}
                  alt='Poster'
                  width={500}
                  height={0}
                  sizes=''
                  className={"rounded-t-md"}
                />
              </Link>
            ) : (
              <div className='flex items-center justify-center w-full h-[300px] border-solid border-2 border-slate-500'>
                <CgProfile size={50} />
              </div>
            )}

            <CardContent className=' p-4'>
              <Link href={"/"}>
                <CardTitle className='text-lg font-semibold tracking-wide md:text-lg'>
                  {cast.name}
                </CardTitle>
              </Link>
              <div>
                <p className='text-sm text-muted-foreground md:text-sm'>
                  {cast.character}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TvShowCast;
