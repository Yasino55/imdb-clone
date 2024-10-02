import { socialSignIn } from "@/authActions";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

const SignInForm = () => {
  return (
    <form action={socialSignIn}>
      <Button type='submit' name='action' value='google' className='mr-3'>
        <FaGoogle className='mr-2' />
        Log in with google
      </Button>
      <Button type='submit' name='action' value='github'>
        <FaGithub className='mr-2' />
        Log in with github
      </Button>
    </form>
  );
};
export default SignInForm;
