import '@/app/ui/global.css';
import { montserrat } from '@/app/ui/fonts';
import SideNav from '../ui/dashboard/sidenav';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '../api/auth/[...nextauth]/authOptions';


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');


    return (
      <html lang="en">
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" />
          <title>Plant Discovery</title>
  
        </head>
        <body className={`${montserrat.className} antialiased`}>
          <div className="flex h-screen flex-col md:flex-row md:overflow-y-hidden w-full">
            <div className="w-full flex-none md:w-64">
              <SideNav />
            </div>
            <div className="flex-1 overflow-auto p-8 m-8">
              Musisz być zalogowany żeby przeglądać tę stronę
            </div>
          </div>
        </body>
  
      </html>
    );
  }

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" />

      </head>
      <body className={`${montserrat.className} antialiased`}>
        <div className="flex h-screen flex-col md:flex-row md:overflow-y-hidden w-full">
          <div className="w-full flex-none md:w-64">
            <SideNav />
          </div>
          <div className="flex-1 overflow-auto">
            {children}
          </div>
        </div>
      </body>

    </html>
  );
}
