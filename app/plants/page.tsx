'use client';
import { useState } from "react";
import Search from "../dashboard/search/search";

interface PlantBasicInfoModel {
    name: string;
    slug: string;
}

const plants: PlantBasicInfoModel[] = [
    {
        name: "Pieniążek",
        slug: "pieniazek",
    },
    {
        name: "Pilea",
        slug: "pilea",
    },
    {
        name: "Monstera",
        slug: "monstera",
    },
    {
        name: "Fikus",
        slug: "fikus",
    },
    {
        name: "Paproć",
        slug: "paproc",
    },
    {
        name: "Bluszcz",
        slug: "bluszcz",
    }
]



export default function PlantsPage() {
    const [plantName, setPlantName] = useState('');

    const handleChange = (value: string) => {
        setPlantName(value);
        console.log("value", value);
        console.log("plantName", plantName);
    }
    return (
        <>
            <Search value={plantName} onChange={handleChange} />

            {
                plants.map((plant: PlantBasicInfoModel) => (
                    <div key={plant.slug} className="w-full h-[50px] relative">
                        <p>{plant.name}</p>
                    </div>
                ))
            }
        </>
    );
}
