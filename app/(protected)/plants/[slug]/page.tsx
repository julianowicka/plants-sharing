import { db } from "@/app/db";
import { PlantDetailsComponent } from "./plant-details-component";
import { getUserId } from "../../dashboard/(overview)/getUserId";

export default async function PlantPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const flower = await db.plant.findUnique({ where: { slug } })
  const userId = await getUserId();

  if (!flower) {
    return <div>Plant not found</div>;
  }

  const { id } = flower;

  const handleAddPlant = async () => {
      "use server";
      await db.userPlant.create({
          data: {
              userId,
              plantId: id,
          },
      });
  };

  return (
    <PlantDetailsComponent plant={flower} handleAddPlant={handleAddPlant} />
  );
}
