"use client";
import { useMemo, useState } from "react";
import Search from "../dashboard/search/search";
import { PlantBasicInfoModel } from "./plants-basic-info-model";
import PlantsList from "./plants-list";

interface PlantsForLetter {
    letter: string;
    plants: PlantBasicInfoModel[];
}

interface Props {
    plants: PlantBasicInfoModel[]
}

export const PlantsListWrapper = ({ plants }: Props) => {
    const [plantName, setPlantName] = useState('');

    const handleChange = (value: string) => {
        setPlantName(value);
        console.log("value", value);
        console.log("plantName", plantName);
    }

    const plantsForLetter = useMemo(() => {
        const result: PlantsForLetter[] = [];
        const sortedPlants = plants.sort((a, b) => a.name.localeCompare(b.name));
        let currentLetter = '';
        let currentPlantsList: PlantBasicInfoModel[] = [];
        const firstPlant = sortedPlants[0];
        if (!firstPlant) {
            return [];
        }
        currentLetter = firstPlant.name.charAt(0).toUpperCase();
        for(let i = 0; i < sortedPlants.length; i++) {
            const plant = sortedPlants[i];
            if (!plant.name.toLocaleUpperCase().includes(plantName.toLocaleUpperCase())) {
                continue;
            }
            if (plant.name.charAt(0).toUpperCase() === currentLetter) {
                currentPlantsList.push(plant);
            } else {
                result.push({
                    letter: currentLetter,
                    plants: currentPlantsList
                });
                currentLetter = plant.name.charAt(0).toUpperCase();
                currentPlantsList = [plant];
            }
        }
        if(currentPlantsList.length !== 0) {

        result.push({
            letter: currentLetter,
            plants: currentPlantsList
        });
    }
        return result;

        
    }, [plantName])

    console.log("plantsForLetter", plantsForLetter);

    return (
        <>
            <Search value={plantName} onChange={handleChange} />

            {
                plantsForLetter.map((plantsForLetter: PlantsForLetter) => (
                    <div key={plantsForLetter.letter} className="w-full">
                        <p className="pt-2">{plantsForLetter.letter}</p>
                        <PlantsList plants={plantsForLetter.plants} />
                    </div>
                ))
            }
        </>
    );
}
