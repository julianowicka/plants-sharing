"use client";

import { useEffect, useState } from "react";

interface Props {
    imageBytes?: Uint8Array | null;
    url: string;
    className?: string;
    alt: string;
}

export const ByteOrUrlImage = (props: Props) => {
    const { imageBytes, url, className, alt } = props;

    const [blobUrl, setBlobUrl] = useState<null | string>(null);

    useEffect(() => {
        if (imageBytes) {
            const blob = new Blob([imageBytes], { type: "image/png" });
            const url = URL.createObjectURL(blob);
            setBlobUrl(url);
            return () => URL.revokeObjectURL(url);
        }
    }, [imageBytes]);

    return (
        <img className={className} src={blobUrl ?? url} alt={alt} />
    );
}