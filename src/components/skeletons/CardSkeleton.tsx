import { CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const CardSkeleton = () => {
  return (
    <div>
      <Skeleton className='w-full h-[300px]' />
      <CardContent>
        <div className='flex items-center mb-1'>
          <Skeleton className='w-full h-6 mt-2' />
        </div>
        <Skeleton className='w-full h-4' />
      </CardContent>
      <CardFooter className='mb-[-5px]'>
        <Skeleton className='w-full h-10' />
      </CardFooter>
    </div>
  );
};

export default CardSkeleton;
