import { db } from "@/app/db";
import { PlantDetailsComponent } from "@/app/(protected)/plants/[slug]/plant-details-component";
import { redirect } from "next/navigation";
import { getUserId } from "../../dashboard/(overview)/getUserId";

export default async function PlantPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const plantId = Number(slug)
    const userId = await getUserId();

    const userPlant = await db.userPlant.findUnique({
        where: { id: plantId },
        include: {
            plant: true,
            comments: {
                include: {
                    user: {
                        select: {
                            name: true,
                        },
                    },
                }
            },
            exchangeOffers: true,
        },
    });

    if (!userPlant) {
        return <div>Plant not found</div>;
    }

    const handleImageUpload = async (image: File) => {
        "use server";
        const arrayBuffer = await image.arrayBuffer();
        const buffer = new Uint8Array(arrayBuffer);
        await db.userPlant.update({
            where: { id: plantId },
            data: {
                image: buffer,
            },
        });
        redirect(`/my-plants/${plantId}`);
    }

    const handleAddComment = async (comment: string) => {
        "use server";
        await db.comment.create({
            data: {
                userId,
                userPlantId: userPlant.id,
                text: comment,
            },
        });
    }

    const isOfferedForExchange = userPlant.exchangeOffers.length > 0;
    const exchangeOffer = userPlant.exchangeOffers[0] ?? {};
    const exchangePhone = exchangeOffer.phone;
    const isMyPlant = userPlant.userId === userId;

    const handleExchangePlant = async (phone: string) => {
        "use server";
        if (isOfferedForExchange) {
            throw new Error("Ta roślina jest już wystawiona do wymiany");
        }

        await db.exchangeOffer.create({
            data: {
                userPlantId: plantId,
                phone,
            },
        });
    }

    const handleRemoveUserPlant = async () => {
        "use server";
        await db.userPlant.delete({
            where: { id: plantId },
        });
        redirect("/dashboard");
    }

    if (!isMyPlant && !isOfferedForExchange) {
        return <div>Brak dostępu</div>
    }

    return (
        <PlantDetailsComponent
            plant={userPlant.plant}
            onImageUpload={handleImageUpload}
            imageBytes={userPlant.image}
            comments={userPlant.comments}
            handleAddComment={handleAddComment}
            handleExchangePlant={handleExchangePlant}
            isOfferedForExchange={isOfferedForExchange}
            phone={exchangePhone}
            handleRemovePlant={handleRemoveUserPlant}
            isMyPlant={isMyPlant}
        />
    );
}