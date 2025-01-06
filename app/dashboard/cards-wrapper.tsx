import { fetchCardData } from "../lib/data";
import { Card } from "../ui/dashboard/cards";

export default async function CardWrapper() {
    const {
        numberOfInvoices,
        numberOfCustomers,
        totalPaidInvoices,
        totalPendingInvoices,
      } = await fetchCardData();
      await new Promise((resolve) => setTimeout(resolve, 1000));
    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card title="Change" value={totalPaidInvoices} type="change" />
        <Card title="Catalog" value={totalPendingInvoices} type="catalog" />
        <Card title="Calendar" value={numberOfInvoices} type="calendar" />

      </div>
        );
}