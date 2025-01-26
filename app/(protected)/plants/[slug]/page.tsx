import { db } from "@/app/db";
import { PlantDetailsComponent } from "./plant-details-component";

export default async function PlantPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const flower = await db.plant.findUnique({ where: { slug } })

  if (!flower) {
    return <div>Plant not found</div>;
  }

  const { id } = flower;

  const handleAddPlant = async () => {
      "use server";
      await db.userPlant.create({
          data: {
              userId: 1, // Replace with the authenticated user's ID
              plantId: id,
          },
      });
  };

  return (
    <PlantDetailsComponent plant={flower} handleAddPlant={handleAddPlant} />
  );
}
