import { PlantsListWrapper } from "./plants-list-wrapper";
import { db } from "../db";


export  default async function PlantsPage() {
    const plants = await db.plant.findMany()

    return (
        <>
            <PlantsListWrapper plants={plants} />
        </>
    );
}
