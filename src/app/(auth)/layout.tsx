import Link from "next/link";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className='p-2'>
        <Link href='/'>
          <div className='flex items-center justify-center h-[35px] w-[75px] rounded-sm bg-primary'>
            <h1 className='text-xl font-bold'>IMDb</h1>
          </div>
        </Link>
      </div>
      <div className='flex items-center justify-center min-h-screen w-full'>
        {children}
      </div>
    </>
  );
}
