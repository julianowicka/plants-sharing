'use client';
import { Suspense, useState } from 'react';
import { CardSkeleton } from '@/app/ui/skeletons';
import CardWrapper from '../cards-wrapper';
import Header from '../header';
import Search from '../search/search';
import Collection from '@/app/ui/dashboard/collection';

export default function Page() {

  const [plantName, setPlantName] = useState('');

  const handleChange = (value: string) => {
    setPlantName(value);
    console.log("value", value);
    console.log("plantName", plantName);

  }
  return (
    <div className='m-6 p-6 pt-10'>
      <Header />
      <Search value={plantName} onChange={handleChange} />
      <CardWrapper />
      <div className="pt-14">
        <Collection />
      </div>
    </div>
  );
}