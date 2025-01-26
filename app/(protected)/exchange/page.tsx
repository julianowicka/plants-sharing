import { Typography } from "@mui/material";
import { db } from "../../db";
import { PlantsListWrapper } from "../plants/plants-list-wrapper";

export default async function CalendarPage() {

    const offers = await db.exchangeOffer.findMany({
        include: {
            userPlant: {
                include: {
                    plant: true,
                }
            }
        }
    });

    const plants = offers.map(offer => ({ ...offer.userPlant.plant, id: offer.userPlant.id }));

    return (
        <div className="m-6 p-6">
            <Typography variant="h4" className="text-bold">Rośliny wystawione do wymiany przez innych użytkowników: </Typography>
            <br />
            <PlantsListWrapper allPlants={plants} plantNameFilter={''} filteredPlants={plants} isMyPlant={true} />
        </div>
    );
}