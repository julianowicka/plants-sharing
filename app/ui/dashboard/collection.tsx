'use client';

import { montserrat } from "../fonts";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

interface CollectionCardProps {
  userImage?: string;
  defaultImage: string;
  plantName: string;
}

function CollectionCard({ userImage, defaultImage, plantName }: CollectionCardProps) {
  const imageToShow = userImage || defaultImage;

  return (
    <div className="w-[213px] h-[250px] relative overflow-hidden">
      {/* Container  gradient background */}
      <div className="w-[213px] h-[232.21px] left-0 top-[17.79px] absolute 
        bg-gradient-to-br from-[#dde4ef] to-[#dde4ef] rounded-xl 
        shadow-[4px_4px_10px_0px_rgba(221,228,239,1.00),-4px_-6px_10px_0px_rgba(255,255,255,1.00),inset_1px_1px_5px_0px_rgba(255,255,255,0.50),inset_-2px_-2px_3px_0px_rgba(221,228,239,0.50)]" 
      />

      {/* Inner container with image */}
      <div className="w-[190.80px] h-[207.76px] left-[11.10px] top-[25.62px] absolute 
        bg-[#f4faff] rounded-xl 
        shadow-[4px_4px_10px_0px_rgba(221,228,239,1.00),-4px_-6px_10px_0px_rgba(255,255,255,1.00),inset_1px_1px_5px_0px_rgba(255,255,255,0.50),inset_-2px_-2px_3px_0px_rgba(221,228,239,0.50)]"
      >
        <img 
          src={imageToShow}
          alt={`Roślina: ${plantName}`}
          className="w-full h-full object-cover rounded-xl"
        />
      </div>

      {/* Bg decorative element */}
      <div className="w-[213px] h-[231.30px] left-[-12.49px] top-0 absolute rounded-lg" />
    </div>
  );
}

export default function Collection() {
  const plants = [
    {
      plantName: "Monstera",
      defaultImage: "/collection-assets/fikus.png",
      userImage: undefined
    },
    {
      plantName: "Fikus",
      defaultImage: "/collection-assets/2.png",
      userImage: undefined
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <h2 className={`${montserrat.className} text-[#364459] text-[17px] font-bold`}>
        Twoja kolekcja
      </h2>
      
      <Swiper
        modules={[Navigation]}
        spaceBetween={24}
        navigation
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 20
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 20
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 24
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 24
          }
        }}
        className="w-full"
      >
        {plants.map((plant, index) => (
          <SwiperSlide key={index}>
            <CollectionCard
              userImage={plant.userImage}
              defaultImage={plant.defaultImage}
              plantName={plant.plantName}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}