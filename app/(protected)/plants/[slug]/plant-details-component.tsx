"use client";

import { PlantDetailsModel } from "@/app/ui/plant-details-model";
import AddPlant from "./add-plant";
import Calendar from "./calendar";
import { EditImage } from "./edit-image-component";
import { ByteOrUrlImage } from "./byte-or-url-image";
import { DisplayComments } from "./display-comments";
import { Comment } from "./comment-model";
import { ExchangePlantButton } from "./exchange-plant-button";
import CallButton from "./call-button";
import { RemovePlantButton } from "./remove-plant-button";

const translate = (key: string): string => {
  switch (key) {
    case "ACID":
      return "Kwaśna";
    case "UNIVERSAL":
      return "Uniwersalna";
    case "MUCH_LIGHT":
      return "Duże nasłonecznienie";
    case "LOW_LIGHT":
      return "Małe nasłonecznienie";
    case "MEDIUM_LIGHT":
      return "Średnie nasłonecznienie";
    case "SUCCULENT":
      return "Sukulentowa";
    case "ORCHID":
      return "Orchidowa";
    default:
      return key;
  }
};

interface Props {
  handleAddPlant?: () => Promise<void>;
  onImageUpload?: ((image: File) => Promise<void>) | undefined;
  imageBytes?: Uint8Array | null;
  plant: PlantDetailsModel;
  handleAddComment?: (comment: string) => Promise<void>;
  comments?: Comment[];
  handleExchangePlant?: (phone: string) => Promise<void>;
  isOfferedForExchange?: boolean;
  phone?: string;
  handleRemovePlant?: () => Promise<void>;
  isMyPlant?: boolean;
}

export const PlantDetailsComponent = (props: Props) => {
  const {
    handleAddPlant,
    plant,
    onImageUpload,
    imageBytes,
    isOfferedForExchange = false,
    phone,
    handleRemovePlant,
    isMyPlant = true,
  } = props;

  const { name, description, imageSrc, difficulty, soilType, lightExposure, wateringInterval } = plant;

  return (
    <div className="w-full relative overflow-y-auto  bg-[#e4f0fa]" style={{ height: "100vh" }}>
      <div className="w-full h-[500px] max-h-[40vh] relative">
        <ByteOrUrlImage url={imageSrc} imageBytes={imageBytes} className="w-full h-[500px] max-h-[40vh] object-cover" alt={name} />
        <RemovePlantButton handleRemovePlant={handleRemovePlant} isMyPlant={isMyPlant} />
        <div className="absolute left-0 bottom-0 m-4">
          <AddPlant handleAddPlant={handleAddPlant} />
          <ExchangePlantButton handleExchangePlant={props.handleExchangePlant} isOfferedForExchange={isOfferedForExchange} />
        </div>
        <EditImage onUpload={onImageUpload} isMyPlant={isMyPlant} />
      </div>

      <div className="w-full flex justify-center items-center">
        <div className="w-full max-w-[1000px]">

          <div className="px-[30px] pt-[35px] position:relative">
            <div className="flex items-start justify-between">
              <h1 className="text-[#364459] text-2xl font-bold font-['Montserrat']">
                {name}
              </h1>
              <CallButton phoneNumber={phone} />
            </div>

            <div className="mt-[35px]">
              <h2 className=" text-sm font-bold font-['Montserrat']">Trudność uprawy: {difficulty}/10</h2>
            </div>
            <div className="mt-[35px]">
              <h2 className="text-sm font-bold font-['Montserrat']">Gleba: {translate(soilType)}</h2>
            </div>
            <div className="mt-[35px]">
              <h2 className="text-sm font-bold font-['Montserrat']">Nasłonecznienie: {translate(lightExposure)}</h2>
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
            <DisplayComments handleAddComment={props.handleAddComment} comments={props.comments} />
            <div className="pt-[100px]" />
          </div>
        </div>
      </div>
    </div>
  );
}