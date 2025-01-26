import { Divider, Typography } from "@mui/material";
import { db } from "../db";
import { PlantDetailsModel } from "../ui/plant-details-model";
import Collection from "../ui/dashboard/collection";


const dayNumberInYear = (date: Date): number => {
    const start = new Date(date.getFullYear(), 0, 0);
    const diff = date.getTime() - start.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
}

const shouldWaterToday = (today: Date, wateringInterval: number): boolean => {
    const dayNumber = dayNumberInYear(today);
    return dayNumber % wateringInterval === 0;
}




export default async function CalendarPage() {

    const myCollection: PlantDetailsModel[] = (await db.userPlant.findMany({
        where: { userId: 1 },
        include: {
            plant: {
                select: {
                    imageSrc: true,
                    name: true,
                    id: true,
                    wateringInterval: true,
                }
            }
        },
        orderBy: {
            id: 'desc',
        }
    }))
        .map(({ plant, id, image }) => ({ ...plant, id, image }))
        .filter(Boolean) as PlantDetailsModel[];

    const today = new Date();
    const plantsToWater = myCollection.filter(plant => shouldWaterToday(today, plant.wateringInterval));
    const dateFormatted = today.toLocaleDateString();

    return (
        <div className="m-6 p-6">
            <Typography variant="h1">{dateFormatted}</Typography>
            <Divider />
            <br /><br />
            <Typography variant="h3">Dzisiaj podlej:</Typography>
            <div className="pt-14">
                <Collection plants={plantsToWater} title="" />
            </div>
        </div>
    );
}