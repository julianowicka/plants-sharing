import { db } from "@/app/db";
import Calendar from "./calendar";

export default async function PlantPage({ params }: { params: { slug: string } }) {
  const { slug } = params;

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
  } = flower;

  return (
    <div className="w-full relative">
      {/* Image section */}
      <div className="w-full h-[802.75px] relative">
        <img src={imageSrc} alt={name} className="w-full h-[580.46px] object-cover" />
      </div>

      {/* Content section */}
      <div className="absolute w-full top-[392px] bg-[#e4f0fa]">

        {/* Plant description */}
        <div className="px-[30px] pt-[35px]">
          <h1 className="text-[#364459] text-2xl font-bold font-['Montserrat']">{name}</h1>
          
          <div className="mt-[35px]">
            <h2 className="text-[#495566] text-sm font-bold font-['Montserrat']">Trudność uprawy: {difficulty}</h2>
          </div>
          <div className="mt-[35px]">
            <h2 className="text-[#495566] text-sm font-bold font-['Montserrat']">Gleba: {soilType}</h2>
          </div>
          <div className="mt-[35px]">
            <h2 className="text-[#495566] text-sm font-bold font-['Montserrat']">Nasłonecznienie: {lightExposure}</h2>
          </div>

          <div className="mt-[34px]">
            <h2 className="text-[#495566] text-sm font-bold font-['Montserrat']">Opis</h2>
            <p className="mt-[14px] text-[#696e7c] text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
              {description}
            </p>
          </div>
          <div className="mt-[34px]"/>
          <h2>Kalendarz Podlewania</h2>
          <Calendar wateringInterval={wateringInterval} name={name} />
        </div>
      </div>
    </div>
  );
}
