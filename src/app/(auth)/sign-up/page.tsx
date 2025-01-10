import SocialLogin from "@/components/auth/SocialLogin";
import SignUpForm from "@/components/auth/SignUpForm";
import Link from "next/link";

const SignInPage = async () => {
  return (
    <div className='flex flex-col justify-center items-center h-screen '>
      <h1 className='text-3xl my-3'>Sign Up</h1>
      <div className='w-[300px]'>
        <SignUpForm />
        <div className='mt-2 text-center'>
          <p className='font-semibold text-muted-foreground'>
            Already have an account?
            <Link href='/sign-in' className='underline ml-1'>
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
export default SignInPage;
