import SocialLogin from "@/components/auth/SocialLogin";
import SignUpForm from "@/components/auth/SignUpForm";

const SignInPage = async () => {
  return (
    <div className='flex flex-col justify-center items-center h-screen '>
      <h1 className='text-3xl my-3'>Sign Up</h1>
      <div className='w-[300px]'>
        <SignUpForm />
        <SocialLogin />
      </div>
    </div>
  );
};
export default SignInPage;
