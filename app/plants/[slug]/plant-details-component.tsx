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

interface Props {
  handleAddPlant?: () => Promise<void>;
  onImageUpload?: ((image: File) => Promise<void>) | undefined;
  imageBytes?: Uint8Array<ArrayBufferLike> | null;
  plant: PlantDetailsModel;
  handleAddComment?: (comment: string) => Promise<void>;
  comments?: Comment[];
  handleExchangePlant?: (phone: string) => Promise<void>;
  isOfferedForExchange?: boolean;
  phone?: string;
  handleRemovePlant?: () => Promise<void>;
}

export const PlantDetailsComponent = (props: Props) => {
  const { handleAddPlant, plant, onImageUpload, imageBytes, isOfferedForExchange = false, phone, handleRemovePlant } = props;
  const { name, description, imageSrc, difficulty, soilType, lightExposure, wateringInterval } = plant;

  return (
    // scrollable container
    <div className="w-full relative overflow-y-auto  bg-[#e4f0fa]" style={{ height: "100vh" }}>
      {/* Image section */}
      <div className="w-full h-[500px] max-h-[40vh] relative">
        <ByteOrUrlImage url={imageSrc} imageBytes={imageBytes} className="w-full h-[500px] max-h-[40vh] object-cover" alt={name} />
        <RemovePlantButton handleRemovePlant={handleRemovePlant} />
        <div className="absolute left-0 bottom-0 m-4">
          <AddPlant handleAddPlant={handleAddPlant} />
          <ExchangePlantButton handleExchangePlant={props.handleExchangePlant} isOfferedForExchange={isOfferedForExchange} />
        </div>
        <EditImage onUpload={onImageUpload} />
      </div>

      {/* Content section */}
      <div className="w-full flex justify-center items-center">
        <div className="w-full max-w-[1000px]">

          {/* Plant description */}
          <div className="px-[30px] pt-[35px] position:relative">
            <div className="flex items-start justify-between">
              <h1 className="text-[#364459] text-2xl font-bold font-['Montserrat']">
                {name}
              </h1>
              <CallButton phoneNumber={phone} />
            </div>

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
            <DisplayComments handleAddComment={props.handleAddComment} comments={props.comments} />
            <div className="pt-[100px]" />
          </div>
        </div>
      </div>
    </div>
  );
}