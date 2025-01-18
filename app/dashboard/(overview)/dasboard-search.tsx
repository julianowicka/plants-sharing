"use client";
import { useState } from "react";
import Search from "../search/search";

export const DashboardSearch = () => {

    const [plantName, setPlantName] = useState('');

    const handleChange = (value: string) => {
        setPlantName(value);
    }

    return (
        <div>
            <Search value={plantName} onChange={handleChange} />
        </div>
    );
}