import { db } from "../../db";
import { PlantsListWrapper } from "./plants-list-wrapper";

export default async function PlantsPage({
    searchParams,
  }: {
    searchParams?: Promise<{ plantName: string }>;
  }) {
    const { plantName = '' } = (await searchParams) || {};
    if (typeof plantName !== 'string') {
      throw new Error('Invalid search parameter');
    }
  
    const plants = await db.plant.findMany({});
    const filteredPlants = plants.filter(plant => plant.name.toLocaleUpperCase().includes(plantName.toLocaleUpperCase()));
  
    return (
      <div className="m-6 p-6">
        <PlantsListWrapper allPlants={plants} plantNameFilter={plantName} filteredPlants={filteredPlants} isMyPlant={false} />
      </div>
    );
}
