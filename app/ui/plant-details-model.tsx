export interface PlantDetailsModel {
    id: number;
    name: string;
    description: string;
    imageSrc: string;
    difficulty: number;
    soilType: string;
    lightExposure: string;
    wateringInterval: number;
    image?: Uint8Array<ArrayBufferLike> | null;
}