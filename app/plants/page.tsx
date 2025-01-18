import { PlantsListWrapper } from "./plants-list-wrapper";
import { db } from "../db";


export  default async function PlantsPage() {
    const plants = await db.plant.findMany()

    return (
        <div className="m-6 p-6">
            <PlantsListWrapper plants={plants} />
        </ div>
    );
}
