import { auth } from "@/auth";
import SignInForm from "@/components/auth/SignInForm";
import SocialLogin from "@/components/auth/SocialLogin";

const SignInPage = async () => {
  return (
    <div className='flex flex-col justify-center items-center h-screen '>
      <h1 className='text-3xl my-3'>Sign In</h1>
      <div className='w-[300px]'>
        <SignInForm />
        <SocialLogin />
      </div>
    </div>
  );
};
export default SignInPage;
