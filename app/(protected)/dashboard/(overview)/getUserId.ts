import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";

export const getUserId = async (): Promise<number> => {
    const session = await getServerSession(authOptions);

    if (!session || !session?.user?.id) {
        throw new Error('Musisz być zalogowany żeby przeglądać tę stronę');
    }

    return Number(session.user.id);
}