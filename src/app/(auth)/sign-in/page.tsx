import SignInForm from "@/components/SignInForm";

const SignInPage = () => {
  return (
    <div className='flex flex-col justify-center items-center h-screen'>
      <h1 className='text-3xl my-3'>Sign In</h1>
      <SignInForm />
    </div>
  );
};
export default SignInPage;
