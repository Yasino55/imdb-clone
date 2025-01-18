import { auth } from "@/auth";
import { Button } from "../ui/button";
import Link from "next/link";
import { signOut } from "@/auth";

const NavbarButtons = async () => {
  const session = await auth();
  return (
    <div>
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
        <div className='flex gap-3'>
          <div>
            <Link href='/sign-in'>
              <Button>Sign In</Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavbarButtons;
