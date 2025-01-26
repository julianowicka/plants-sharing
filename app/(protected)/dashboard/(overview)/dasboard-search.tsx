"use client";
import { useState } from "react";
import Search from "../search/search";
import { useDebouncedCallback } from 'use-debounce';
import { useRouter } from "next/navigation";


export const DashboardSearch = () => {
    const router = useRouter();
    const [plantName, setPlantName] = useState('');

    const rediectToPlants = (plantNameValue: string) => {
        router.push(`/plants?plantName=${plantNameValue}`);
    }

    const debouncedRedirect = useDebouncedCallback(rediectToPlants, 600);

    const handleChange = (value: string) => {
        setPlantName(value);
        debouncedRedirect(value)
    }

    return (
        <div>
            <Search value={plantName} onChange={handleChange} />
        </div>
    );
}