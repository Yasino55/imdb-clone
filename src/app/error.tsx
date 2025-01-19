"use client";

import { Button } from "@/components/ui/button";
import { BsExclamationTriangle } from "react-icons/bs";

const Error = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen w-screen'>
      <div className='flex flex-col items-center p-6 w-1/3 rounded-lg shadow-md text-center gap-5'>
        <BsExclamationTriangle size={100} className='fill-destructive' />
        <p className='text-destructive'>Oops!! Something went wrong.</p>
        <Button
          variant='outline'
          className='mt-4 ml-4'
          onClick={() => (window.location.href = "/")}
        >
          Back To Home
        </Button>
      </div>
    </div>
  );
};

export default Error;
