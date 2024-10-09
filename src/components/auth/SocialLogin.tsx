import { socialSignIn } from "@/actions/authActions";
import { Button } from "@/components/ui/button";
import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

const SocialLogin = () => {
  return (
    <>
      <form action={socialSignIn} className='mt-4 flex'>
        <Button
          type='submit'
          name='action'
          value='google'
          className='mr-3 w-full'
        >
          <FaGoogle className='mr-2' />
          Google
        </Button>
        <Button type='submit' name='action' value='github' className='w-full'>
          <FaGithub className='mr-2' />
          Github
        </Button>
      </form>
    </>
  );
};
export default SocialLogin;
