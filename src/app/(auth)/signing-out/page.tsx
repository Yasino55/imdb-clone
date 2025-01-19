"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import FadeLoader from "react-spinners/FadeLoader";

const SigningOut = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("/");
  }, [router]);

  return (
    <div className='flex flex-col items-center justify-center h-screen gap-5'>
      <FadeLoader loading={true} color='#6d28d9' />
      <p>Signing out...</p>
    </div>
  );
};

export default SigningOut;
