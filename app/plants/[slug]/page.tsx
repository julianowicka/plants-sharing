export default function PlantPage({ params }: { params: { slug: string } }) {
  const nazwa = params.slug;
  const opis = "Pieniążek lubi umiarkowane podlewanie, dobrze reaguje na delikatne zraszanie liści. Ziemia w doniczce powinna być delikatnie wilgotna. Nie należy dopuszczać do przelewania - wtedy korzenie rośliny mogą niestety zgnić a listki czernieją i odpadają. Zimą podlewanie nieco ograniczamy.";
  const image = "https://kurowski.pl//images/katalog/1100_900/374_big.jpg";

  return (
    <div className="w-full h-screen relative bg-[#f4faff] overflow-hidden">
      {/* Image section */}
      <div className="w-full h-[802.75px] relative">
        <img src={image} alt={nazwa} className="w-full h-[580.46px] object-cover" />
      </div>

      {/* Content section */}
      <div className="absolute w-full top-[392px] bg-[#e4f0fa]">
        {/* Category badge */}
        <div className="px-[27px] pt-[13px] flex items-center gap-[17.83px]">
          <div className="text-[#40ceb9] text-base font-medium font-['Lato'] leading-relaxed">01</div>
          <div className="bg-[#e8f3fb] px-[13px] py-[6px] rounded-[20px] shadow-lg">
            <div className="text-[#96a2b0] text-xs font-normal font-['Montserrat']">PAPROTNIKI</div>
          </div>
        </div>

        {/* Plant description */}
        <div className="px-[30px] pt-[35px]">
          <h1 className="text-[#364459] text-2xl font-bold font-['Montserrat']">{nazwa}</h1>
          
          <div className="mt-[35px]">
            <h2 className="text-[#495566] text-sm font-bold font-['Montserrat']">Trudność uprawy</h2>
          </div>

          <div className="mt-[14px] flex gap-[41px]">
            <span className="text-[#696e7c] text-sm font-normal font-['Montserrat']">Królestwo</span>
            <span className="text-[#696e7c] text-sm font-normal font-['Montserrat']">Pilea</span>
          </div>

          <div className="mt-[34px]">
            <h2 className="text-[#495566] text-sm font-bold font-['Montserrat']">Opis</h2>
            <p className="mt-[14px] text-[#696e7c] text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
              {opis}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
