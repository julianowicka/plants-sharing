"use client";

import Link from "next/link";
import { PlantBasicInfoModel } from "./plants-basic-info-model";

interface Props {
    plants: PlantBasicInfoModel[];
    isMyPlant: boolean;
}

export default function PlantsList({ plants, isMyPlant }: Props) {

    return (
        <div className="flex flex-col">
            {plants.map((plant) => {
                const redirectUrl = isMyPlant ? `/my-plants/${plant.id}` : `/plants/${plant.slug}`
                const key = isMyPlant ? plant.id : plant.slug;

                return (
                    <Link href={redirectUrl} key={key} className="w-1/4 p-1">
                        <div className="bg-white rounded-lg shadow-lg p-1">
                            <div className="mt-4">
                                <h3 className="text-lg font-bold">{plant.name}</h3>
                            </div>
                        </div>
                    </Link>
                )
            })}
        </div>
    );
}
