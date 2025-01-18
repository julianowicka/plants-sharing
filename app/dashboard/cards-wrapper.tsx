"use client"
import Link from "next/link";
import { Card } from "../ui/dashboard/cards";

export default function CardWrapper() {
  return (
    <div className="grid gap-6 grid-cols-2 sm:grid-cols-4 mt-6 max-w-[1000px]">
      <Link href="/exchange" >
        <Card title="Wymień" type="change" />
      </Link>
      <Link href="/catalog" >
        <Card title="Katalog" type="catalog" />
      </Link>
      <Link href="/calendar" >
        <Card title="Kalendarz" type="calendar" />
      </Link>
      <Link href="/plants" >
        <Card title="Dodaj" type="add" />
      </Link>
    </div>
  );
}