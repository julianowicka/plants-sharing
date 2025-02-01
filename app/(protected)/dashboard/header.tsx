import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export default async function Header() {

  const session = await getServerSession(authOptions);
   
  return (
    <div className="flex flex-col gap-3 pl-1">
      <h1 className="text-[#364459] text-3xl font-bold font-['Montserrat']">
        Cześć {session?.user?.name},
      </h1>
      <h2 className="text-[#495566] text-base font-bold font-['Montserrat'] opacity-80 pb-1">
        Odkrywaj nieznane rośliny
      </h2>
    </div>
  );
}