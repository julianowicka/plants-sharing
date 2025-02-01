import { db } from "../../db";
import { PlantDetailsModel } from "../../ui/plant-details-model";
import { getUserId } from "../dashboard/(overview)/getUserId";
import CalendarPageBody from "./calendar-page-body";

interface CalendarPageProps {
  searchParams?: Promise<{ date?: string }>;
}

export default async function CalendarPage({ searchParams }: CalendarPageProps) {
  const rawDate = (await searchParams)?.date;
  const parsedDate = rawDate ? new Date(rawDate) : new Date();

  const userId = await getUserId();

  const myCollection: PlantDetailsModel[] = (
    await db.userPlant.findMany({
      where: { userId },
      include: {
        plant: {
          select: {
            imageSrc: true,
            name: true,
            id: true,
            wateringInterval: true,
          },
        },
      },
      orderBy: {
        id: "desc",
      },
    })
  )
    .map(({ plant, id, image }) => ({ ...plant, id, image }))
    .filter(Boolean) as PlantDetailsModel[];

  return <CalendarPageBody myCollection={myCollection} currentDate={parsedDate} />;
}
