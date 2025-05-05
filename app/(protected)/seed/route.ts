import { db } from "@/app/db";
import { NextResponse } from "next/server";


// Tablica z danymi roślin
const plants = [
  {
    name: "Monstera Deliciosa (Monstera Dziurawa)",
    slug: "monstera",
    difficulty: 3,
    imageSrc: "http://localhost:3000/rosliny/monstera.png",
    lightExposure: "MEDIUM_LIGHT",
    soilType: "UNIVERSAL",
    description: "Popularna roślina pnąca o charakterystycznych, dużych, dziurawych liściach. Efektowna ozdoba wnętrz.",
    wateringInterval: 7
  },
  {
    name: "Zamioculcas Zamiifolia (Zamiokulkas Zamiolistny)",
    slug: "zamiokulkas",
    difficulty: 1,
    imageSrc: "http://localhost:3000/rosliny/zamiokulkas.png",
    lightExposure: "LOW_LIGHT",
    soilType: "SUCCULENT",
    description: "Bardzo odporna roślina o grubych, błyszczących, ciemnozielonych liściach. Idealna dla zapominalskich.",
    wateringInterval: 14
  },
  {
    name: "Sansevieria Trifasciata (Sansewieria Gwinejska / Wężownica)",
    slug: "wezownica",
    difficulty: 1,
    imageSrc: "http://localhost:3000/rosliny/wezownica.png",
    lightExposure: "LOW_LIGHT",
    soilType: "SUCCULENT",
    description: "Wytrzymała roślina o sztywnych, mieczowatych liściach, często z wzorami. Oczyszcza powietrze.",
    wateringInterval: 14
  },
  {
    name: "Epipremnum Aureum (Epipremnum Złociste)",
    slug: "epipremnum-aureum",
    difficulty: 2,
    imageSrc: "http://localhost:3000/rosliny/epipremnum-aureum.png",
    lightExposure: "MEDIUM_LIGHT",
    soilType: "UNIVERSAL",
    description: "Szybko rosnące pnącze o sercowatych liściach, często z żółtymi lub białymi przebarwieniami. Łatwe w rozmnażaniu.",
    wateringInterval: 7
  },
  {
    name: "Spathiphyllum (Skrzydłokwiat)",
    slug: "skrzydlokwiat",
    difficulty: 3,
    imageSrc: "http://localhost:3000/rosliny/skrzydlokwiat.png",
    lightExposure: "LOW_LIGHT",
    soilType: "UNIVERSAL",
    description: "Elegancka roślina o ciemnozielonych liściach i białych kwiatostanach przypominających skrzydła. Oczyszcza powietrze.",
    wateringInterval: 5
  },
  {
    name: "Ficus Lyrata (Figowiec Dębolistny)",
    slug: "figowiec-debolistny",
    difficulty: 6,
    imageSrc: "http://localhost:3000/rosliny/figowiec-debolistny.png",
    lightExposure: "MUCH_LIGHT",
    soilType: "UNIVERSAL",
    description: "Modne drzewko o dużych, lirowatych, skórzastych liściach. Wymaga stabilnych warunków.",
    wateringInterval: 7
  },
  {
    name: "Ficus Elastica (Figowiec Sprężysty)",
    slug: "figowiec-sprezysty",
    difficulty: 4,
    imageSrc: "http://localhost:3000/rosliny/figowiec-sprezysty.png",
    lightExposure: "MEDIUM_LIGHT",
    soilType: "UNIVERSAL",
    description: "Klasyczna roślina o dużych, grubych, błyszczących liściach, często w odcieniach zieleni, bordo lub z wariegacją.",
    wateringInterval: 7
  },
  {
    name: "Chlorophytum Comosum (Zielistka Sternberga)",
    slug: "zielistka-sternberga",
    difficulty: 1,
    imageSrc: "http://localhost:3000/rosliny/zielistka-sternberga.png",
    lightExposure: "MEDIUM_LIGHT",
    soilType: "UNIVERSAL",
    description: "Łatwa w uprawie roślina tworząca kępy trawiastych liści (często z białym paskiem) i wypuszczająca długie pędy z małymi roślinkami (rozmnóżkami).",
    wateringInterval: 7
  },
  {
    name: "Dracaena Marginata (Dracena Obrzeżona)",
    slug: "dracena-obrzezona",
    difficulty: 3,
    imageSrc: "http://localhost:3000/rosliny/dracena-obrzezona.png",
    lightExposure: "MEDIUM_LIGHT",
    soilType: "PALM",
    description: "Roślina przypominająca palmę z cienkim pniem i pióropuszem wąskich, długich liści, często z czerwonym obrzeżeniem.",
    wateringInterval: 7
  },
  {
    name: "Phalaenopsis (Storczyk Ćmówka)",
    slug: "storczyk-cmowka",
    difficulty: 5,
    imageSrc: "http://localhost:3000/rosliny/storczyk-cmowka.png",
    lightExposure: "MEDIUM_LIGHT",
    soilType: "ORCHID",
    description: "Najpopularniejszy storczyk doniczkowy, ceniony za długo kwitnące, efektowne kwiaty w wielu kolorach.",
    wateringInterval: 7
  },
  {
    name: "Aloe Vera (Aloes Zwyczajny)",
    slug: "aloes",
    difficulty: 2,
    imageSrc: "http://localhost:3000/rosliny/aloes.png",
    lightExposure: "MUCH_LIGHT",
    soilType: "SUCCULENT",
    description: "Sukulenta o grubych, mięsistych liściach z ząbkowanymi brzegami, zawierających leczniczy żel.",
    wateringInterval: 14
  },
  {
    name: "Crassula Ovata (Grubosz Jajowaty / Drzewko Szczęścia)",
    slug: "grubosz",
    difficulty: 2,
    imageSrc: "http://localhost:3000/rosliny/grubosz.png",
    lightExposure: "MUCH_LIGHT",
    soilType: "SUCCULENT",
    description: "Sukulenta przypominająca małe drzewko z grubym pniem i mięsistymi, owalnymi liśćmi.",
    wateringInterval: 14
  },
  {
    name: "Hedera Helix (Bluszcz Pospolity)",
    slug: "bluszcz-pospolity",
    difficulty: 3,
    imageSrc: "http://localhost:3000/rosliny/bluszcz-pospolity.png",
    lightExposure: "MEDIUM_LIGHT",
    soilType: "UNIVERSAL",
    description: "Wszechstronne pnącze o charakterystycznych, klapowanych liściach. Może rosnąć jako roślina zwisająca lub pnąca.",
    wateringInterval: 7
  },
  {
    name: "Calathea (np. Makoyana, Orbifolia, Lancifolia)",
    slug: "calathea",
    difficulty: 7,
    imageSrc: "http://localhost:3000/rosliny/calathea.png",
    lightExposure: "MEDIUM_LIGHT",
    soilType: "UNIVERSAL",
    description: "Rośliny cenione za niezwykle dekoracyjne, wzorzyste liście, które często 'modlą się' (unoszą na noc). Wymagają wysokiej wilgotności powietrza.",
    wateringInterval: 5
  },
  {
    name: "Maranta Leuconeura (Maranta)",
    slug: "maranta",
    difficulty: 6,
    imageSrc: "http://localhost:3000/rosliny/maranta.png",
    lightExposure: "MEDIUM_LIGHT",
    soilType: "UNIVERSAL",
    description: "Podobna do Calathei, znana jako 'roślina modląca się' ze względu na ruch liści. Posiada piękne, wzorzyste liście.",
    wateringInterval: 5
  },
  {
    name: "Strelitzia Nicolai/Reginae (Strelicja Biała/Królewska)",
    slug: "sterlicja",
    difficulty: 5,
    imageSrc: "http://localhost:3000/rosliny/sterlicja.png",
    lightExposure: "MUCH_LIGHT",
    soilType: "UNIVERSAL",
    description: "Duża, efektowna roślina o liściach przypominających liście bananowca. Reginae kwitnie na pomarańczowo ('Rajski Ptak'), Nicolai ma białe kwiaty (rzadziej kwitnie w domu).",
    wateringInterval: 7
  },
  {
    name: "Pilea Peperomioides (Pilea Peperomiowata / Pieniążek)",
    slug: "pieniazek",
    difficulty: 3,
    imageSrc: "http://localhost:3000/rosliny/pieniazek.png",
    lightExposure: "MEDIUM_LIGHT",
    soilType: "UNIVERSAL",
    description: "Charakterystyczna roślina z okrągłymi liśćmi na długich ogonkach, przypominającymi monety. Łatwo tworzy odrosty.",
    wateringInterval: 7
  },
  {
    name: "Aspidistra Elatior (Aspidistra Wyniosła / Żelazny Liść)",
    slug: "aspidistra-wyniosła",
    difficulty: 2,
    imageSrc: "http://localhost:3000/rosliny/aspidistra-wyniosła.png",
    lightExposure: "LOW_LIGHT",
    soilType: "UNIVERSAL",
    description: "Niezwykle wytrzymała roślina o dużych, ciemnozielonych, lancetowatych liściach wyrastających prosto z ziemi. Odporna na zaniedbania.",
    wateringInterval: 10
  },
  {
    name: "Schefflera Arboricola (Szeflera Drzewkowata)",
    slug: "szeflera-drzewkowata",
    difficulty: 4,
    imageSrc: "http://localhost:3000/rosliny/szeflera-drzewkowata.png",
    lightExposure: "MEDIUM_LIGHT",
    soilType: "UNIVERSAL",
    description: "Krzew lub małe drzewko o dłoniasto złożonych liściach, przypominających parasolki. Dostępne odmiany o zielonych lub wariegowanych liściach.",
    wateringInterval: 7
  },
  {
    name: "Anthurium Andraeanum (Anturium Andrego)",
    slug: "anturium-andrego",
    difficulty: 5,
    imageSrc: "http://localhost:3000/rosliny/anturium-andrego.png",
    lightExposure: "MEDIUM_LIGHT",
    soilType: "ORCHID",
    description: "Roślina o sercowatych liściach i charakterystycznych, błyszczących 'kwiatach' (pochwach kwiatostanowych) w kolorach czerwonym, różowym, białym.",
    wateringInterval: 7
  },
  {
    name: "Begonia Maculata (Begonia Koralowa)",
    slug: "begonia-koralowa",
    difficulty: 6,
    imageSrc: "http://localhost:3000/rosliny/begonia-koralowa.png",
    lightExposure: "MEDIUM_LIGHT",
    soilType: "UNIVERSAL",
    description: "Efektowna begonia o podłużnych, oliwkowych liściach z srebrnymi kropkami i czerwonym spodem. Kwitnie na biało lub różowo.",
    wateringInterval: 7
  },
  {
    name: "Syngonium Podophyllum (Zroślicha Stopowcowa)",
    slug: "zroslicha-stopowcowa",
    difficulty: 3,
    imageSrc: "http://localhost:3000/rosliny/zroslicha-stopowcowa.png",
    lightExposure: "MEDIUM_LIGHT",
    soilType: "UNIVERSAL",
    description: "Pnącze o strzałkowatych liściach, które z wiekiem mogą zmieniać kształt. Wiele odmian barwnych (zielone, różowe, białe).",
    wateringInterval: 7
  },
  {
    name: "Philodendron Scandens (Filodendron Pnący)",
    slug: "filodendron-pnacy",
    difficulty: 2,
    imageSrc: "http://localhost:3000/rosliny/filodendron-pnacy.png",
    lightExposure: "MEDIUM_LIGHT",
    soilType: "UNIVERSAL",
    description: "Bardzo popularne, łatwe w uprawie pnącze o sercowatych, zielonych liściach. Szybko rośnie.",
    wateringInterval: 7
  },
  {
    name: "Alocasia (np. Polly, Zebrina, Black Velvet)",
    slug: "alokazja-zebrina",
    difficulty: 7,
    imageSrc: "http://localhost:3000/rosliny/alokazja-zebrina.png",
    lightExposure: "MEDIUM_LIGHT",
    soilType: "UNIVERSAL",
    description: "Rośliny o strzałkowatych lub sercowatych, często spektakularnych liściach z wyraźnym unerwieniem lub ciekawą fakturą. Wymagają wysokiej wilgotności.",
    wateringInterval: 7
  },
  {
    name: "Dieffenbachia",
    slug: "dieffenbachia",
    difficulty: 4,
    imageSrc: "http://localhost:3000/rosliny/dieffenbachia.png",
    lightExposure: "MEDIUM_LIGHT",
    soilType: "UNIVERSAL",
    description: "Roślina o dużych, owalnych liściach, często z kremowymi lub żółtymi wzorami. Uwaga: sok jest trujący.",
    wateringInterval: 7
  },
  {
    name: "Aglaonema",
    slug: "aglaonema",
    difficulty: 3,
    imageSrc: "http://localhost:3000/rosliny/aglaonema.png",
    lightExposure: "LOW_LIGHT",
    soilType: "UNIVERSAL",
    description: "Roślina ceniona za dekoracyjne, często wielobarwne liście (zielone, srebrne, różowe, czerwone). Tolerancyjna na słabsze oświetlenie.",
    wateringInterval: 7
  },
  {
    name: "Howea Forsteriana (Kencja)",
    slug: "howea-forsteriana",
    difficulty: 5,
    imageSrc: "http://localhost:3000/rosliny/howea-forsteriana.png",
    lightExposure: "MEDIUM_LIGHT",
    soilType: "PALM",
    description: "Elegancka, wolno rosnąca palma o pierzastych liściach. Dość odporna na warunki domowe.",
    wateringInterval: 7
  },
  {
    name: "Chamaedorea Elegans (Chamedora Wytworna / Palma Koralowa)",
    slug: "chamedora-wytworna",
    difficulty: 4,
    imageSrc: "http://localhost:3000/rosliny/chamedora-wytworna.png",
    lightExposure: "MEDIUM_LIGHT",
    soilType: "PALM",
    description: "Niewielka, gęsta palma o delikatnych, pierzastych liściach. Popularna do mniejszych wnętrz.",
    wateringInterval: 7
  },
  {
    name: "Dypsis Lutescens (Areka Żółtawa)",
    slug: "areka-zoltawa",
    difficulty: 5,
    imageSrc: "http://localhost:3000/rosliny/areka-zoltawa.png",
    lightExposure: "MEDIUM_LIGHT",
    soilType: "PALM",
    description: "Popularna palma o gęstych, pierzastych liściach na żółtawych łodygach. Skutecznie nawilża i oczyszcza powietrze.",
    wateringInterval: 5
  },
  {
    name: "Yucca Elephantipes (Juka Gwatemalska)",
    slug: "juka-gwatemalska",
    difficulty: 3,
    imageSrc: "http://localhost:3000/rosliny/juka-gwatemalska.png",
    lightExposure: "MUCH_LIGHT",
    soilType: "PALM",
    description: "Roślina o grubym, zdrewniałym pniu (lub kilku pniach) i pióropuszu sztywnych, mieczowatych liści.",
    wateringInterval: 10
  },
  {
    name: "Beaucarnea Recurvata (Nolina Wygięta / Stopa Słonia)",
    slug: "nolina-wygieta",
    difficulty: 2,
    imageSrc: "http://localhost:3000/rosliny/nolina-wygieta.png",
    lightExposure: "MUCH_LIGHT",
    soilType: "SUCCULENT",
    description: "Charakterystyczna roślina z grubą, bulwiastą podstawą pnia (magazynującą wodę) i długimi, wąskimi, opadającymi liśćmi.",
    wateringInterval: 14
  },
  {
    name: "Ceropegia Woodii (Lampion Chiński)",
    slug: "lampion-chinski",
    difficulty: 4,
    imageSrc: "http://localhost:3000/rosliny/lampion-chinski.png",
    lightExposure: "MEDIUM_LIGHT",
    soilType: "SUCCULENT",
    description: "Delikatne pnącze o długich, zwisających pędach i małych, sercowatych liściach z marmurkowym wzorem. Tworzy małe bulwy na pędach.",
    wateringInterval: 10
  },
  {
    name: "Senecio Rowleyanus (Starzec Rowleya / Sznur Pereł)",
    slug: "starzec-rowleya",
    difficulty: 5,
    imageSrc: "http://localhost:3000/rosliny/starzec-rowleya.png",
    lightExposure: "MEDIUM_LIGHT",
    soilType: "SUCCULENT",
    description: "Oryginalna roślina zwisająca o pędach pokrytych kulistymi liśćmi przypominającymi zielone perły.",
    wateringInterval: 10
  },
  {
    name: "Peperomia (np. Obtusifolia, Argyreia 'Watermelon')",
    slug: "peperomia",
    difficulty: 4,
    imageSrc: "http://localhost:3000/rosliny/peperomia.png",
    lightExposure: "MEDIUM_LIGHT",
    soilType: "SUCCULENT",
    description: "Duża grupa roślin o zróżnicowanych, często mięsistych liściach (okrągłe, sercowate, wzorzyste). Zwykle kompaktowe rozmiary.",
    wateringInterval: 7
  },
  {
    name: "Hoya Carnosa/Kerrii (Hoja Różowa/Sercolistna)",
    slug: "hoya",
    difficulty: 4,
    imageSrc: "http://localhost:3000/rosliny/hoya.png",
    lightExposure: "MEDIUM_LIGHT",
    soilType: "ORCHID",
    description: "Pnącza o grubych, woskowych liściach (Carnosa - owalne, Kerrii - sercowate) i pachnących, gwiazdkowatych kwiatostanach.",
    wateringInterval: 10
  },
  {
    name: "Tradescantia Zebrina (Trzykrotka Pasiasta)",
    slug: "trzykrotka-pasiasta",
    difficulty: 2,
    imageSrc: "http://localhost:3000/rosliny/trzykrotka-pasiasta.png",
    lightExposure: "MEDIUM_LIGHT",
    soilType: "UNIVERSAL",
    description: "Szybko rosnąca roślina zwisająca o atrakcyjnych, pasiastych liściach (zielono-srebrno-fioletowych). Łatwa w rozmnażaniu.",
    wateringInterval: 7
  },
  {
    name: "Fittonia Verschaffeltii (Fitonia)",
    slug: "fitonia",
    difficulty: 6,
    imageSrc: "http://localhost:3000/rosliny/fitonia.png",
    lightExposure: "LOW_LIGHT",
    soilType: "UNIVERSAL",
    description: "Niewielka roślina o dekoracyjnych liściach z wyraźnie zaznaczonym, kontrastowym unerwieniem (białym, różowym, czerwonym). Wymaga wysokiej wilgotności.",
    wateringInterval: 3
  },
  {
    name: "Nephrolepis Exaltata (Nefrolepis Wyniosły / Paproć Bostońska)",
    slug: "nefrolepis-wyniosly",
    difficulty: 5,
    imageSrc: "http://localhost:3000/rosliny/nefrolepis-wyniosly.png",
    lightExposure: "MEDIUM_LIGHT",
    soilType: "UNIVERSAL",
    description: "Klasyczna paproć o bujnych, pierzastych liściach. Wymaga wysokiej wilgotności powietrza.",
    wateringInterval: 3
  },
  {
    name: "Asplenium Nidus (Zanokcica Gniazdowa)",
    slug: "zanokcica-gniazdowa",
    difficulty: 5,
    imageSrc: "http://localhost:3000/rosliny/zanokcica-gniazdowa.png",
    lightExposure: "MEDIUM_LIGHT",
    soilType: "UNIVERSAL",
    description: "Paproć tworząca rozetę dużych, całobrzegich, jasnozielonych, błyszczących liści przypominających liście sałaty.",
    wateringInterval: 5
  },
  {
    name: "Saintpaulia (Sępolia Fiołkowa / Fiołek Afrykański)",
    slug: "sepolia-fiolkowa",
    difficulty: 5,
    imageSrc: "http://localhost:3000/rosliny/sepolia-fiolkowa.png",
    lightExposure: "MEDIUM_LIGHT",
    soilType: "UNIVERSAL",
    description: "Niewielka roślina o omszonych liściach i licznych kwiatach w odcieniach fioletu, różu, bieli. Kwitnie przez większą część roku.",
    wateringInterval: 7
  },
  {
    name: "Kalanchoe Blossfeldiana (Kalanchoe Blossfelda)",
    slug: "kalanchoe-blossfeldiana",
    difficulty: 3,
    imageSrc: "http://localhost:3000/rosliny/kalanchoe-blossfeldiana.png",
    lightExposure: "MUCH_LIGHT",
    soilType: "SUCCULENT",
    description: "Sukulenta ceniona za długotrwałe, obfite kwitnienie (kwiaty w wielu kolorach: czerwonym, różowym, żółtym, pomarańczowym, białym).",
    wateringInterval: 10
  },
  {
    name: "Schlumbergera (Grudnik / Kaktus Bożego Narodzenia)",
    slug: "szlumbergera",
    difficulty: 4,
    imageSrc: "http://localhost:3000/rosliny/szlumbergera.png",
    lightExposure: "MEDIUM_LIGHT",
    soilType: "SUCCULENT",
    description: "Kaktus epifityczny o spłaszczonych, członowatych pędach. Kwitnie zimą (okolice Bożego Narodzenia) na różowo, czerwono, biało.",
    wateringInterval: 7
  },
  {
    name: "Euphorbia Trigona (Wilczomlecz Trójżebrowy)",
    slug: "wilczomlecz-trojzebrowy",
    difficulty: 3,
    imageSrc: "http://localhost:3000/rosliny/wilczomlecz-trojzebrowy.png",
    lightExposure: "MUCH_LIGHT",
    soilType: "SUCCULENT",
    description: "Sukulenta przypominająca kaktusa o kanciastych, zielonych (czasem czerwonych) pędach i małych liściach. Uwaga: sok jest drażniący.",
    wateringInterval: 14
  },
  {
    name: "Opuntia (Opuncja)",
    slug: "opuncja",
    difficulty: 2,
    imageSrc: "http://localhost:3000/rosliny/opuncja.png",
    lightExposure: "MUCH_LIGHT",
    soilType: "CACTUS",
    description: "Kaktus o charakterystycznych, płaskich członach (często nazywanych 'uszami Myszki Miki'). Posiada ciernie i glochidy (małe, haczykowate włoski).",
    wateringInterval: 14
  },
  {
    name: "Mammillaria (Mammilaria)",
    slug: "mammillaria",
    difficulty: 3,
    imageSrc: "http://localhost:3000/rosliny/mammillaria.png",
    lightExposure: "MUCH_LIGHT",
    soilType: "CACTUS",
    description: "Grupa popularnych, kulistych lub cylindrycznych kaktusów, często kwitnących małymi kwiatami tworzącymi wianuszek wokół wierzchołka.",
    wateringInterval: 14
  },
  {
    name: "Haworthia (Haworsja)",
    slug: "haworsja",
    difficulty: 2,
    imageSrc: "http://localhost:3000/rosliny/haworsja.png",
    lightExposure: "MEDIUM_LIGHT",
    soilType: "SUCCULENT",
    description: "Małe sukulenty tworzące rozety z mięsistych liści, często z ciekawymi wzorami, paskami lub 'okienkami'.",
    wateringInterval: 14
  },
  {
    name: "Echeveria (Eszeweria)",
    slug: "eszeweria",
    difficulty: 3,
    imageSrc: "http://localhost:3000/rosliny/eszeweria.png",
    lightExposure: "MUCH_LIGHT",
    soilType: "SUCCULENT",
    description: "Popularne sukulenty tworzące piękne, symetryczne rozety z mięsistych liści w różnych kolorach i kształtach.",
    wateringInterval: 14
  },
  {
    name: "Sedum Morganianum (Rozchodnik Morgana / Ogon Osła)",
    slug: "rozchodnik-morgana",
    difficulty: 4,
    imageSrc: "http://localhost:3000/rosliny/rozchodnik-morgana.png",
    lightExposure: "MEDIUM_LIGHT",
    soilType: "SUCCULENT",
    description: "Sukulenta o długich, zwisających pędach gęsto pokrytych grubymi, mięsistymi liśćmi. Liście łatwo odpadają.",
    wateringInterval: 10
  },
  {
    name: "Adiantum (Adiantum / Włosy Wenus)",
    slug: "adiantum",
    difficulty: 8,
    imageSrc: "http://localhost:3000/rosliny/adiantum.png",
    lightExposure: "MEDIUM_LIGHT",
    soilType: "UNIVERSAL",
    description: "Delikatna paproć o cienkich, czarnych łodyżkach i drobnych, wachlarzowatych listkach. Bardzo wrażliwa na suche powietrze i przesuszenie.",
    wateringInterval: 2
  }
];

async function addPlantsToDatabase() {
  for (const plant of plants) {
    await db.plant.create({
      data: plant
    });
    console.log(`Dodano roślinę: ${plant.name}`);
  }
  
  console.log("Wszystkie rośliny zostały dodane do bazy danych!");
}


async function cascadeDeleteData() {
  try {
    console.log("Rozpoczęcie usuwania danych...");
    
    // Najpierw usuwamy tabele zależne, aby uniknąć problemów z ograniczeniami integralności
    
    // 1. Usuwanie ExchangeOffer
    await db.exchangeOffer.deleteMany({});
    console.log("Usunięto dane z tabeli ExchangeOffer");
    
    // 2. Usuwanie Comment
    await db.comment.deleteMany({});
    console.log("Usunięto dane z tabeli Comment");
    
    // 3. Usuwanie UserPlant (które są powiązane z User i Plant)
    await db.userPlant.deleteMany({});
    console.log("Usunięto dane z tabeli UserPlant");
    
    // 4. Usuwanie User
    await db.user.deleteMany({});
    console.log("Usunięto dane z tabeli User");
    
    // 5. Usuwanie Plant
    await db.plant.deleteMany({});
    console.log("Usunięto dane z tabeli Plant");
    
    console.log("Pomyślnie usunięto wszystkie dane z bazy");
  } catch (error) {
    console.error("Wystąpił błąd podczas usuwania danych:", error);
    throw error;
  }
}

export async function GET() {
  try {
    await cascadeDeleteData();
    addPlantsToDatabase()
      .catch(error => {
        console.error("Wystąpił błąd podczas dodawania roślin:", error);
      });
    
    await db.user.create({
      data: {
        email: "julia.nowickaa@gmail.com",
        name: "Julia Nowicka",
        password: "$2b$10$ziUEEpA28VJlTEybGo1s0OKOYySuTbHHlxM.UTFjoWTR9DXRFo7ae",
      },
    });

    await db.user.create({
      data: {
        email: "test@example.com",
        name: "Test Example",
        password: "$2b$10$ziUEEpA28VJlTEybGo1s0OKOYySuTbHHlxM.UTFjoWTR9DXRFo7ae",
      },
    });

    await db.user.create({
      data: {
        email: "test@test.com",
        name: "Test Test",
        password: "$2b$10$ziUEEpA28VJlTEybGo1s0OKOYySuTbHHlxM.UTFjoWTR9DXRFo7ae",
      },
    });

    await db.user.create({
      data: {
        email: "admin",
        name: "Admin",
        password: "$2b$10$RDyYm4ASe.D7pBCmpX7k3Ov03v2IZ.6x0N1J4abcnrYQvmMkiAWE6",
      },
    });

    return NextResponse.json({
      message: 'Database seeded successfully',
    });
  } catch (error) {
  
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
  
}
