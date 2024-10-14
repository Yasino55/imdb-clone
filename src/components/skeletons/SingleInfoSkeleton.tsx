import { Skeleton } from "@/components/ui/skeleton";

const SingleInfoSkeleton = () => {
  return (
    <div className='flex mt-[100px]'>
      <Skeleton className='w-[400px] h-[450px]' />
      <div className='ml-20 w-full'>
        <div className='h-10 rounded-md w-3/4 mb-8' />

        <div className='flex justify-between my-8'>
          <Skeleton className='h-6 rounded-md w-1/4' />
          <Skeleton className='h-6 rounded-md w-1/4' />
          <Skeleton className='h-6 rounded-md w-1/4' />
        </div>

        <div className='flex items-center mb-8'>
          <div className='flex items-center'>
            <Skeleton className='w-6 h-6 rounded-full' />
            <Skeleton className='h-6 rounded-md w-20 ml-2' />
          </div>
          <Skeleton className='h-4 rounded-md w-10 ml-2' />
        </div>

        <Skeleton className='h-20 rounded-md w-full max-w-[75%]' />
      </div>
    </div>
  );
};
export default SingleInfoSkeleton;
