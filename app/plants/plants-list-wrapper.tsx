"use client";
import { useEffect, useMemo, useState } from "react";
import Search from "../dashboard/search/search";
import { PlantBasicInfoModel } from "./plants-basic-info-model";
import PlantsList from "./plants-list";
import { useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

interface PlantsForLetter {
    letter: string;
    plants: PlantBasicInfoModel[];
}

interface Props {
    allPlants: PlantBasicInfoModel[];
    filteredPlants: PlantBasicInfoModel[];
    plantNameFilter: string;
}

export const PlantsListWrapper = ({ allPlants, filteredPlants, plantNameFilter }: Props) => {
    const [plantName, setPlantName] = useState(plantNameFilter);
    const [filteredPlantsList, setFilteredPlantsList] = useState(filteredPlants);

    const handleChange = (value: string) => {
        setPlantName(value);
    }

    useEffect(() => {
        setFilteredPlantsList(allPlants.filter(plant => plant.name.toLocaleUpperCase().includes(plantName.toLocaleUpperCase())));
    }, [plantName, allPlants]);

    const plantsForLetter = useMemo(() => {
        const result: PlantsForLetter[] = [];
        const sortedPlants = filteredPlantsList.sort((a, b) => a.name.localeCompare(b.name));
        let currentLetter = '';
        let currentPlantsList: PlantBasicInfoModel[] = [];
        const firstPlant = sortedPlants[0];
        if (!firstPlant) {
            return [];
        }
        currentLetter = firstPlant.name.charAt(0).toUpperCase();
        for(let i = 0; i < sortedPlants.length; i++) {
            const plant = sortedPlants[i];
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

        
    }, [plantName, filteredPlantsList]);

    console.log("plantsForLetter", plantsForLetter);

    return (
        <>
            <Search value={plantName} onChange={handleChange} />
            <div className="mt-6 pt-3" />

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
