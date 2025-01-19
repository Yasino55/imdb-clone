import Footer from "@/components/footer";
import Navbar from "@/components/Navbar";
import { SessionProvider } from "next-auth/react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className='max-w-7xl px-5 mx-auto '>
        <Navbar />
        <SessionProvider>
          <main>{children}</main>
        </SessionProvider>
        <Footer />
      </div>
    </>
  );
}
