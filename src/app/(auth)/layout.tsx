import { ThemeProvider } from "@/components/theme-provider";
import "@/app/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className='container mx-auto'>
        <ThemeProvider attribute='class' defaultTheme='dark'>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
