'use client';

import { montserrat } from "../fonts";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import { PlantDetailsModel } from "../plant-details-model";
import Link from "next/link";

interface CollectionCardProps {
  userImage?: string;
  defaultImage: string;
  plantName: string;
}

function CollectionCard({
  userImage,
  defaultImage,
  plantName,
}: CollectionCardProps) {
  const imageToShow = userImage || defaultImage;

  return (
    <div
      className="
        w-[300px]
        rounded-md
        border border-gray-300
        bg-white     
        overflow-hidden
        shadow-sm    
      "
    >
      {/* Top section with the image */}
      <div className="w-[300px] h-[300px] bg-gray-50 flex items-center justify-center overflow-hidden">
        <img
          src={imageToShow}
          alt={plantName}
          className="object-cover"
        />
      </div>

      {/* Plant name area */}
      <div className="p-2 text-center text-gray-700 font-medium">
        {plantName}
      </div>
    </div>
  );
}

interface Props {
  plants: PlantDetailsModel[] | null;
}

export default function Collection({ plants }: Props) {

  if (!plants) {
    return null;
  }

  return (
    <div className="flex flex-col gap-6">
      <h2 className={`${montserrat.className} text-[#364459] text-[17px] font-bold`}>
        Twoja kolekcja
      </h2>

      <Swiper
        modules={[Navigation]}
        spaceBetween={20}
        slidesPerView="auto"
        navigation
        className="w-[100%]"
      >
        {plants.map((plant, index) => (
          <SwiperSlide key={index} style={{ width: '300px' }}>
            <Link href={`/my-plants/${plant.id}`}>
              <CollectionCard
                userImage={plant.imageSrc}
                defaultImage={plant.imageSrc}
                plantName={plant.name}
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}