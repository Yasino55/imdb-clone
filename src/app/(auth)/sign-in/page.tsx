import SignInForm from "@/components/auth/SignInForm";
import SocialLogin from "@/components/auth/SocialLogin";
import Link from "next/link";
import { Suspense } from "react";

const SignInPage = async () => {
  return (
    <Suspense>
      <div className='flex flex-col justify-center items-center h-screen '>
        <h1 className='text-3xl my-3'>Sign In</h1>
        <div className='w-[300px]'>
          <SignInForm />
          <SocialLogin />
          <div className='mt-2 text-center'>
            <p className='font-semibold text-muted-foreground'>
              Don't have an account?
              <Link href='/sign-up' className='underline ml-1'>
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Suspense>
  );
};
export default SignInPage;
