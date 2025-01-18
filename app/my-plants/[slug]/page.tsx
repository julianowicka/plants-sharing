import { db } from "@/app/db";
import { PlantDetailsComponent } from "@/app/plants/[slug]/plant-details-component";

export default async function PlantPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const plantId = Number(slug)

    const userPlant = await db.userPlant.findUnique({
        where: { id: plantId },
        include: {
            plant: true,
        },
    });

    if (!userPlant) {
        return <div>Plant not found</div>;
    }

    return (
        <PlantDetailsComponent plant={userPlant.plant} />
    );
}