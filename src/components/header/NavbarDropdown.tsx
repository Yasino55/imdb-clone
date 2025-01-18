import { IoMenuSharp } from "react-icons/io5";
import { auth, signOut } from "@/auth";
import { Button } from "../ui/button";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const NavbarDropdown = async () => {
  const session = await auth();
  return (
    <div className=''>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className='cursor-pointer w-6 h-6'>
          <IoMenuSharp size={20} className='mt-1' />
        </DropdownMenuTrigger>
        <DropdownMenuContent className='fixed w-36 h-28 mt-3 mr-5 right-[0px] z-10 p-3 flex justify-center items-center'>
          <div className=''>
            <div className='space-y-3'>
              <div>
                <Button className='w-[75px]' asChild>
                  <Link href='sign-in'>Sign In</Link>
                </Button>
              </div>
            </div>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default NavbarDropdown;
