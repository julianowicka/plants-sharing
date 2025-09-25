"use client"
import Link from "next/link";
import { Card } from "../../ui/dashboard/cards";

export default function CardWrapper() {
  return (
    <div className="grid gap-6 grid-cols-2 sm:grid-cols-5 mt-10 max-w-[1200px]">
      <Link href="/exchange" className="flex justify-center" >
        <Card title="Wymień" type="change" />
      </Link>
      <Link href="/plants" className="flex justify-center" >
        <Card title="Katalog" type="catalog" />
      </Link>
      <Link href="/calendar" className="flex justify-center" >
        <Card title="Kalendarz" type="calendar" />
      </Link>
      <Link href="/plants" className="flex justify-center" >
        <Card title="Dodaj" type="add" />
      </Link>
      <Link href="/ai-tools" className="flex justify-center" >
        <Card title="AI Doctor" type="ai" />
      </Link>
    </div>
  );
}