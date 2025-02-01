import { Button } from "@mui/material";

interface Props {
    handleRemovePlant?: (() => Promise<void>) | undefined;
    isMyPlant?: boolean;
}

export const RemovePlantButton = (props: Props) => {
    const { handleRemovePlant, isMyPlant } = props;

    console.log("isMyPlant", isMyPlant)

    if (!handleRemovePlant || !isMyPlant) {
        return null;
    }

    return (
        <div className="absolute right-0 top-0 m-4">
            <Button onClick={handleRemovePlant} variant="contained" color="secondary">
                Usuń roślinę
            </Button>
        </div>
    );
}