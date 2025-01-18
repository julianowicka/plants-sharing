import '@/app/ui/global.css';
import { montserrat } from '@/app/ui/fonts';
import SideNav from './ui/dashboard/sidenav';


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"/>

      </head>
        <body className={`${montserrat.className} antialiased`}>
           <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
                <div className="w-full flex-none md:w-64">
                  <SideNav />
                </div>
                <div className="flex-grow">{children}</div>
              </div>
        </body>

    </html>
  );
}
