"use client";

import { useState } from "react";
import {
    TextField,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Alert,
} from "@mui/material";
import MySnackbar from "./my-snackbar";
import { useRouter } from "next/navigation";

interface Props {
    handleExchangePlant?: ((phone: string) => Promise<void>) | undefined;
    isOfferedForExchange: boolean;
}

export const ExchangePlantButton = ({ handleExchangePlant, isOfferedForExchange }: Props) => {
    const [phone, setPhone] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [openModal, setOpenModal] = useState(false);
    const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
    const router = useRouter();


    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setError(null);
        setOpenModal(false);
        setPhone("");
    };

    const handleExchange = async () => {
        if (!handleExchangePlant) return;

        if (!phone || !/^\d{9}$/.test(phone)) {
            setError("Telefon musi mieć dokładnie 9 cyfr. Podaj poprawny numer telefonu");
            return;
        }

        try {
            await handleExchangePlant(phone);
            handleCloseModal();
            setPhone("");
            setOpenSuccessSnackbar(true);
            setTimeout(() => {
                router.refresh();
            }, 1000);
        } catch (error: any) {
            if (error instanceof Error) {
                setError(error.message);
            }
        }
    };

    const handleSetPhone = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
        setPhone(e.target.value);
    }

    if (!handleExchangePlant) {
        return null;
    }

    if (isOfferedForExchange) {
        return <div className="mb-14 inline-flex items-center gap-2 px-2 py-1 border border-green-500 rounded-full bg-white">
            <span className="text-green-500 text-sm font-semibold">
                Roślina wystawiona do wymiany
            </span>
        </div>;
    }

    return (
        <div className="pb-14">
            <Button variant="contained" color="primary" onClick={handleOpenModal}>
                Wystaw roślinę do wymiany
            </Button>
            <MySnackbar open={openSuccessSnackbar} setOpen={setOpenSuccessSnackbar} title="Sukces!" description="Wystawiono roślinę do wymiany" />

            <Dialog open={openModal} onClose={handleCloseModal} fullWidth maxWidth="sm">
                <DialogTitle>Wystaw roślinę do wymiany</DialogTitle>
                <DialogContent>
                    <Alert severity="info">
                        Wprowadź swój numer telefonu, aby inni użytkownicy mogli się z Tobą skontaktować.
                        <br /><br />
                        Twój numer telefonu, roślina oraz komentarze będą widoczne publicznie.
                    </Alert>
                    <br />
                    <TextField
                        label="Numer telefonu"
                        placeholder="Wpisz swój numer telefonu"
                        value={phone}
                        onChange={handleSetPhone}
                        fullWidth
                        margin="normal"
                    />

                    {error && <div style={{ color: "red" }}>{error}</div>}
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleCloseModal} color="inherit">
                        Anuluj
                    </Button>
                    <Button onClick={handleExchange} variant="contained" color="primary">
                        Wystaw do wymiany
                    </Button>
                </DialogActions>
            </Dialog>
        </ div>
    );
};
