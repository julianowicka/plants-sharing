import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { lusitana } from '@/app/ui/fonts';
import { Suspense } from 'react';
import { CardSkeleton, LatestInvoicesSkeleton, RevenueChartSkeleton } from '@/app/ui/skeletons';
import CardWrapper from '../cards-wrapper';
import Header from '../header';
import Search from '../search/search';
import Collection from '@/app/ui/dashboard/collection';
 
export default async function Page() {


  return (
    <main>
      <Header />
      <Search />
      <Suspense fallback={<CardSkeleton />}>
        <CardWrapper />
      </Suspense>
      <div className="p-4">
      <Collection />
    </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
      <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart  />
        </Suspense>
        <Suspense fallback={<LatestInvoicesSkeleton />}>
        <LatestInvoices />
        </Suspense>
      </div>
    </main>
  );
}