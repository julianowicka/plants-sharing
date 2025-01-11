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
    console.log("value",value);
    console.log("plantName",plantName);
   
  }
  return (
    <main>
      <Header />
      <Search value={plantName} onChange={handleChange} />
      <Suspense fallback={<CardSkeleton />}>
        <CardWrapper />
      </Suspense>
      <div className="p-4">
      <Collection />
    </div>
    </main>
  );
}