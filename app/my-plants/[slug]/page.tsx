import { db } from "@/app/db";
import { PlantDetailsComponent } from "@/app/plants/[slug]/plant-details-component";
import { redirect } from "next/navigation";

export default async function PlantPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const plantId = Number(slug)

    const userPlant = await db.userPlant.findUnique({
        where: { id: plantId },
        include: {
            plant: true,
        },
    });

    console.log("User plant", userPlant);

    if (!userPlant) {
        return <div>Plant not found</div>;
    }

    const handleImageUpload = async (image: File) => {
        "use server";
        const arrayBuffer = await image.arrayBuffer();
        const buffer = new Uint8Array(arrayBuffer);
        await db.userPlant.update({
            where: { id: plantId },
            data: {
                image: buffer,
            },
        });
        redirect(`/my-plants/${plantId}`);
    }

    return (
        <PlantDetailsComponent
            plant={userPlant.plant}
            onImageUpload={handleImageUpload}
            imageBytes={userPlant.image}
        />
    );
}