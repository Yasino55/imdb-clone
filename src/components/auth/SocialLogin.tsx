"use client";

import { socialSignIn } from "@/actions/authActions";
import { Button } from "@/components/ui/button";
import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const SocialLogin = () => {
  const params = useSearchParams();
  const linkError = params.get("error");
  const router = useRouter();

  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (linkError) {
      switch (linkError) {
        case "OAuthAccountNotLinked":
          setError("Please use your email and password to sign in.");
          break;
        default:
          setError("An unexpected error occurred. Please try again.");
      }
    }
    router.replace("/sign-in");
  }, [linkError, router]);

  return (
    <>
      <form action={socialSignIn} className='mt-4 flex gap-3'>
        <Button type='submit' name='action' value='google' className='w-full'>
          <FaGoogle className='mr-2' />
          Google
        </Button>
        <Button type='submit' name='action' value='github' className='w-full'>
          <FaGithub className='mr-2' />
          Github
        </Button>
      </form>
      <div className='text-red-500 text-sm font-light mt-3'>{error}</div>
    </>
  );
};
export default SocialLogin;
