import Link from "next/link";
import { Button } from "./ui/button";
import { signOut } from "@/auth";
import { auth } from "@/auth";

const Navbar = async () => {
  const session = await auth();
  return (
    <div className='flex justify-between mt-3'>
      <Link href='/'>
        <div className='flex items-center justify-center h-[35px] w-[75px] rounded-sm bg-primary'>
          <h1 className='text-xl font-bold'>IMDb</h1>
        </div>
      </Link>
      <div className='flex'>
        {session ? (
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/" });
            }}
          >
            <Button type='submit'>Sign Out</Button>
          </form>
        ) : (
          <div className='space-x-3'>
            <Link href='/sign-in'>
              <Button>Sign In</Button>
            </Link>
            <Link href='/sign-up'>
              <Button variant={"outline"}>Sign Up</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
export default Navbar;
