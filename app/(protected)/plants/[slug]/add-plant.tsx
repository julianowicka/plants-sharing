"use client";

import { Card } from "@/app/ui/dashboard/cards";
import { useState } from "react";
import MySnackbar from "./my-snackbar";

interface Props {
    handleAddPlant: (() => Promise<void>) | undefined;
}

export default function AddPlant(props: Props) {
    const { handleAddPlant } = props;

    const [open, setOpen] = useState(false);

    if (!handleAddPlant) {
        return null;
    }

    const handleClick = async () => {
        await handleAddPlant();
        setOpen(true);
    };

    return (
        <>
            <Card title="Dodaj" type="add" onClick={handleClick} />
            <MySnackbar open={open} setOpen={setOpen} title="Sukces!" description="Zapisano roślinę do kolekcji" />
        </>
    );
}