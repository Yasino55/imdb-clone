import "@/app/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/Navbar";
import { SessionProvider } from "next-auth/react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className='max-w-7xl px-5 mx-auto '>
        <ThemeProvider attribute='class' defaultTheme='dark'>
          <SessionProvider>
            <Navbar />
            {children}
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
