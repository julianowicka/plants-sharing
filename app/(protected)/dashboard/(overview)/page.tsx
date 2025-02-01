import CardWrapper from '../cards-wrapper';
import Header from '../header';
import Collection from '@/app/ui/dashboard/collection';
import { db } from '@/app/db';
import { DashboardSearch } from './dasboard-search';
import { PlantDetailsModel } from '@/app/ui/plant-details-model';
import { getUserId } from './getUserId';


export default async function Page() {

  const userId = await getUserId();

  const myCollection: PlantDetailsModel[] = (await db.userPlant.findMany({
    where: { userId },
    include: {
      plant: {
        select: {
          imageSrc: true,
          name: true,
          id: true,
        }
      }
    },
    orderBy: {
      id: 'desc',
    }
  }))
    .map(({ plant, id, image }) => ({ ...plant, id, image }))
    .filter(Boolean) as PlantDetailsModel[];

  return (
    <div className='m-0 p-1 sm:p-10  pt-10 w-[100%] '>
      <Header />
      <DashboardSearch />
      <CardWrapper />
      <div className="pt-14">
        <Collection plants={myCollection} title='Twoja kolekcja' />
      </div>
    </div>
  );
}