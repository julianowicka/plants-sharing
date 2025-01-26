"use client";
import { Alert, Snackbar } from "@mui/material";

interface Props {
    open: boolean;
    setOpen: (value: boolean) => void;
    title: string;
    description: string;
}

export default function MySnackbar(props: Props) {
    const { open, setOpen, title, description } = props;

    const handleClose = (event: React.SyntheticEvent<any> | Event, reason: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <>
            <Snackbar
                open={open}
                autoHideDuration={5000}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            >
                <Alert severity="success" sx={{ width: '300px', height: '100px' }} className="mb-14 ml-10">
                    <h2 className="font-bold">{title}</h2>
                    <br />
                    <p>{description}</p>
                </Alert>
            </Snackbar>
        </>
    );
}