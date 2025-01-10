import { Skeleton } from "@/components/ui/skeleton";

const SingleInfoSkeleton = () => {
  return (
    <div className='flex flex-col items-center my-10 md:flex-row'>
      <Skeleton className='w-[300px] h-[400px]' />
      <div className='w-full space-y-3 mt-3'>
        {/* <div className='h-10 rounded-md w-3/4' /> */}

        <div className='flex flex-col gap-3 items-center justify-between'>
          <Skeleton className='h-6 rounded-md w-1/4' />
          <Skeleton className='h-6 rounded-md w-1/4' />
          <Skeleton className='h-6 rounded-md w-1/4' />
        </div>

        <div className='flex flex-col items-center gap-3'>
          <div className='flex items-center'>
            <Skeleton className='w-6 h-6 rounded-full' />
            <Skeleton className='h-6 rounded-md w-20 ml-2' />
          </div>
          {/* <Skeleton className='h-4 rounded-md w-10 ml-2' /> */}
          <Skeleton className='h-20 rounded-md w-full max-w-[75%]' />
        </div>
      </div>
    </div>
  );
};
export default SingleInfoSkeleton;
