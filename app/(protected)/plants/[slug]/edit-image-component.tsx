"use client";

import React, { useState, ChangeEvent } from "react";
import Image from "next/image";
// Import the Material UI Camera icon
import { CameraAlt } from "@mui/icons-material";

interface EditImageProps {
    onUpload: ((file: File) => Promise<void>) | undefined;
    isMyPlant?: boolean;
}

export function EditImage({ onUpload, isMyPlant }: EditImageProps) {

    const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.[0]) {
            return;
        }

        const file = e.target.files[0];
        await onUpload?.(file);
    };

    if (!onUpload || !isMyPlant) {
        return null;
    }

    return (
        <div className="absolute bottom-4 left-4">
            <label
                htmlFor="edit-bg-image"
                className="inline-flex items-center cursor-pointer px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-100 transition"
            >
                {/* Material UI Camera icon */}
                <CameraAlt className="mr-2" />
                Edytuj zdjęcie
            </label>

            {/* Hidden file input */}
            <input
                type="file"
                id="edit-bg-image"
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
            />
        </div>
    );
}
