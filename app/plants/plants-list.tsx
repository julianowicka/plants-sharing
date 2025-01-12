"use client";

import Link from "next/link";
import { PlantBasicInfoModel } from "./plants-basic-info-model";

interface Props {
    plants: PlantBasicInfoModel[];
}
export default function PlantsList( { plants }: Props ) {

    return (
        <div className="flex flex-col">
            {plants.map((plant) => (
                <Link href={`/plants/${plant.slug}`} key={plant.slug} className="w-1/4 p-1">
                    <div className="bg-white rounded-lg shadow-lg p-1">
                        <div className="mt-4">
                            <h3 className="text-lg font-bold">{plant.name}</h3>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}