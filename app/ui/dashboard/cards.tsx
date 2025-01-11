"use client";
import { montserrat } from '@/app/ui/fonts';
import ChangeIcon from './card-item/change-icon';
import CatalogIcon from './card-item/catalog-icon';
import CalendarIcon from './card-item/calendar-icon';

const iconMap = {

  change: ChangeIcon,
  catalog: CatalogIcon,
  calendar: CalendarIcon,
};

export default async function CardWrapper() {
  return (
    <>
      {/* NOTE: Uncomment this code in Chapter 9 */}

      {/* <Card title="Collected" value={totalPaidInvoices} type="collected" />
      <Card title="Pending" value={totalPendingInvoices} type="pending" />
      <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
      <Card
        title="Total Customers"
        value={numberOfCustomers}
        type="customers"
      /> */}
    </>
  );
}

export function Card({
  title,
  type,
}: {
  title: string;
  type: 'change' | 'catalog' | 'calendar' ;
}) {
  const Icon = iconMap[type];

  return (
    <div className="w-[87.94px] h-[87px] bg-[#e8f3fb] rounded-[17.95px] flex flex-col items-center justify-center gap-2
    shadow-[19px_21px_50px_0px_rgba(176,195,210,0.73),-8px_0px_8px_0px_rgba(244,248,251,0.50),-8px_-40px_22px_0px_rgba(246,251,255,0.38),-11px_-11px_20px_0px_rgba(255,255,255,0.27)]">
    {Icon ? <Icon /> : null}
    <h3 className={`${montserrat.className} text-xs font-medium text-gray-600`}>
      {title}
    </h3>
  </div>
  );
}
