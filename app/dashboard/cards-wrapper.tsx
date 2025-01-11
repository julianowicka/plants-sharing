"use client"
import { fetchCardData } from "../lib/data";
import { Card } from "../ui/dashboard/cards";

export default function CardWrapper() {
    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card title="Change" type="change" />
        <Card title="Catalog"  type="catalog" />
        <Card title="Calendar" type="calendar" />

      </div>
        );
}