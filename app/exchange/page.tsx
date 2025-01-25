import { db } from "../db";

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

    return (
        <div className="m-6 p-6">
            <h1>Rośliny wystawione do wymiany przez innych użytkowników: </h1>
            <br />
            <ul>
                {offers?.map(offer => (
                    <li key={offer.id}>
                        - {offer.userPlant.plant.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}