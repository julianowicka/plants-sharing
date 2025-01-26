"use client";

import { Divider, IconButton, Typography } from "@mui/material";
import { PlantDetailsModel } from "../../ui/plant-details-model";
import Collection from "../../ui/dashboard/collection";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { useRouter } from "next/navigation";


const calculateDayNumberInYear = (date: Date): number => {
    const start = new Date(date.getFullYear(), 0, 0);
    const diff = date.getTime() - start.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
}

const shouldWaterToday = (today: Date, wateringInterval: number): boolean => {
    const dayOfYearNumber = calculateDayNumberInYear(today);
    return (dayOfYearNumber - 1) % wateringInterval === 0;
}

interface Props {
    myCollection: PlantDetailsModel[];
    currentDate: Date;
}

export default function CalendarPageBody(props: Props) {
    const { myCollection, currentDate } = props;

    const router = useRouter();

    const plantsToWater = myCollection.filter(plant => shouldWaterToday(currentDate, plant.wateringInterval));
    const dateFormatted = currentDate.toLocaleDateString().padStart(10, "0");

    const handleNextDay = () => {
        const nextDay = new Date(currentDate);
        nextDay.setDate(nextDay.getDate() + 1);

        router.push(`/calendar?date=${nextDay.toISOString()}`);
        router.refresh();
    };

    const handlePreviousDay = () => {
        const nextDay = new Date(currentDate);
        nextDay.setDate(nextDay.getDate() - 1);

        router.push(`/calendar?date=${nextDay.toISOString()}`);
        router.refresh();
    };

    return (
        <div className="m-6 p-6">
            <div className="flex items-center gap-4">
                <IconButton sx={{ border: "1px solid" }} onClick={handlePreviousDay} aria-label="Poprzedni dzień">
                    <KeyboardArrowLeft fontSize="large" />
                </IconButton>
                <Typography sx={{ width: "100vw", maxWidth: 1000, textAlign: "center" }} variant="h1">{dateFormatted}</Typography>
                <IconButton sx={{ border: "1px solid" }} onClick={handleNextDay} aria-label="Następny dzień">
                    <KeyboardArrowRight fontSize="large" />
                </IconButton>
            </div>
            <Divider />
            <br /><br />
            <Typography variant="h3">Dzisiaj podlej:</Typography>
            <div className="pt-14">
                <Collection plants={plantsToWater} title="" />
            </div>
        </div>
    );
}