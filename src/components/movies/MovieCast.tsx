import { fetchCast, posterFormat } from "@/lib/requests";
import { Card, CardContent, CardTitle } from "../ui/card";
import Link from "next/link";
import Image from "next/image";
import { CgProfile } from "react-icons/cg";

interface Props {
  id: string;
  name: string;
  profile_path: string;
  character: string;
  known_for_department: string;
}

const MovieCast = async ({ id }: { id: string }) => {
  const data = await fetchCast(id, "movie");
  return (
    <div className='flex flex-col items-center mt-10 gap-10'>
      <h2 className='text-2xl font-semibold'>Cast</h2>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-10'>
        {data.map((cast: Props) => (
          <Card className=' w-[200px]' key={cast.id}>
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

            <CardContent className='w-[200px] p-4'>
              <Link href={"/"}>
                <CardTitle className='text-lg font-semibold'>
                  {cast.name}
                </CardTitle>
              </Link>
              <div>
                <p className='text-sm text-muted-foreground'>
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

export default MovieCast;
