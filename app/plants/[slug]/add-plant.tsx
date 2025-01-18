"use client";
import { Card } from "@/app/ui/dashboard/cards";
import { Alert, Snackbar } from "@mui/material";
import { useState } from "react";

interface Props {
    handleAddPlant: () => Promise<void>;
}

export default function AddPlant(props: Props) {
    const { handleAddPlant } = props;

    const [open, setOpen] = useState(false);

    const handleClick = async () => {
        await handleAddPlant();
        setOpen(true);
    };

    const handleClose = (event: React.SyntheticEvent<any> | Event, reason: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <>
            <Card title="Dodaj" type="add" onClick={handleClick} />
            <Snackbar
                open={open}
                autoHideDuration={5000}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            >
                <Alert severity="success" sx={{ width: '300px', height: '100px' }} className="mb-14 ml-10">
                    <h2 className="font-bold">Sukces!</h2>
                    <br />
                    <p>Zapisano roślinę do kolekcji</p>
                </Alert>
            </Snackbar>
        </>
    );
}