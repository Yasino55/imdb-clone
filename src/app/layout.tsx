import type { Metadata } from "next";
import "@/app/globals.css";
import { ThemeProvider } from "next-themes";

export const metadata: Metadata = {
  title: "IMDb",
  description: "Find movies and tv shows!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body>
        <ThemeProvider attribute='class' defaultTheme='dark'>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
