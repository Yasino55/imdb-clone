import Link from "next/link";
import { Button } from "./ui/button";
import { signOut } from "@/auth";
import { auth } from "@/auth";
import SearchInput from "./SearchInput";
import NavbarButtons from "./header/NavbarButtons";
import NavbarDropdown from "./header/NavbarDropdown";
import UserButton from "./header/UserButton";

const Navbar = async () => {
  const session = await auth();

  return (
    <div className='flex justify-between mt-3'>
      <Link href='/'>
        <div className='flex items-center justify-center h-[35px] w-[75px] rounded-sm bg-primary'>
          <h1 className='text-xl font-bold'>IMDb</h1>
        </div>
      </Link>
      <div className='flex gap-3'>
        <SearchInput />
        {session ? (
          <div className=''>
            <UserButton />
          </div>
        ) : (
          <div>
            <div className='md:hidden'>
              <NavbarDropdown />
            </div>
            <div className='hidden md:block'>
              <NavbarButtons />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Navbar;
