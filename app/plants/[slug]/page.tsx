import { db } from "@/app/db";
import Calendar from "./calendar";
import AddPlant from "./add-plant";

export default async function PlantPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  console.log("start")
  const flower = await db.plant.findUnique({ where: { slug } })
  console.log("start2")


  if (!flower) {
    return <div>Plant not found</div>;
  }

  const {
    name,
    description,
    difficulty,
    imageSrc,
    lightExposure,
    wateringInterval,
    soilType,
    id,
  } = flower;

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
    // scrollable container
    <div className="w-full relative overflow-y-auto  bg-[#e4f0fa]" style={{ height: "100vh" }}>
      {/* Image section */}
      <div className="w-full h-[500px] max-h-[40vh] relative">
        <img src={imageSrc} alt={name} className="w-full h-[500px] max-h-[40vh] object-cover" />
        <div className="absolute left-0 bottom-0 m-4">
          <AddPlant handleAddPlant={handleAddPlant} />
        </div>
      </div>

      {/* Content section */}
      <div className="w-full">

        {/* Plant description */}
        <div className="px-[30px] pt-[35px] position:relative">
          <h1 className="text-[#364459] text-2xl font-bold font-['Montserrat']">
            {name}
          </h1>

          <div className="mt-[35px]">
            <h2 className=" text-sm font-bold font-['Montserrat']">Trudność uprawy: {difficulty}</h2>
          </div>
          <div className="mt-[35px]">
            <h2 className="text-sm font-bold font-['Montserrat']">Gleba: {soilType}</h2>
          </div>
          <div className="mt-[35px]">
            <h2 className="text-sm font-bold font-['Montserrat']">Nasłonecznienie: {lightExposure}</h2>
          </div>

          <div className="mt-[34px]">
            <h2 className="text-sm font-bold font-['Montserrat']">Opis</h2>
            <p className="mt-[14px] text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
              {description}
            </p>
          </div>
          <div className="mt-[34px]" />
          <h2 className="font-bold">Kalendarz Podlewania</h2>
          <Calendar wateringInterval={wateringInterval} name={name} />
          <div className="pt-[100px]" />
        </div>
      </div>
    </div>
  );
}
