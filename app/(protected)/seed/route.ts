import { db } from "@/app/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await db.plant.create({
      data: {
        name: 'Pieniążek',
        slug: 'pieniazek',
        difficulty: 4,
        imageSrc: 'https://images.unsplash.com/photo-1593691509543-c55fb32e8a82',
        lightExposure: 'MEDIUM_LIGHT',
        soilType: 'UNIVERSAL',
        description:
          'Roślina doniczkowa znana z okrągłych liści przypominających monety. Łatwa w uprawie.',
        wateringInterval: 7,
      },
    });

    await db.plant.create({
      data: {
        name: 'Aaronia',
        slug: 'aaronia',
        difficulty: 6,
        imageSrc:
          'https://haft-wzory.pl/wp-content/uploads/2018/10/kwiatek.jpg',
        lightExposure: 'MUCH_LIGHT',
        soilType: 'ACID',
        description:
          'Dolorem ipsum, quia dolor sit, amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt, ut labore et dolore magnam aliquam quaerat voluptatem.',
        wateringInterval: 1,
      },
    });

    await db.plant.create({
      data: {
        name: 'Aloes',
        slug: 'aloes',
        difficulty: 3,
        imageSrc:
          'https://images.unsplash.com/photo-1596547609652-9cf5d8c10b80',
        lightExposure: 'MUCH_LIGHT',
        soilType: 'SUCCULENT',
        description:
          'Roślina sukulent o właściwościach leczniczych. Wymaga małej ilości wody.',
        wateringInterval: 14,
      },
    });

    await db.plant.create({
      data: {
        name: 'Pilea',
        slug: 'pilea',
        difficulty: 2,
        imageSrc:
          'https://images.unsplash.com/photo-1606058733902-ca9c19057aa1',
        lightExposure: 'MEDIUM_LIGHT',
        soilType: 'UNIVERSAL',
        description:
          'Popularna roślina doniczkowa o okrągłych liściach. Idealna dla początkujących.',
        wateringInterval: 7,
      },
    });

    await db.plant.create({
      data: {
        name: 'Monstera',
        slug: 'monstera',
        difficulty: 4,
        imageSrc:
          'https://images.unsplash.com/photo-1614594975525-e45190c55d0b',
        lightExposure: 'MEDIUM_LIGHT',
        soilType: 'UNIVERSAL',
        description:
          'Popularna roślina o charakterystycznych dziurawych liściach. Może osiągać duże rozmiary.',
        wateringInterval: 7,
      },
    });

    await db.plant.create({
      data: {
        name: 'Fikus',
        slug: 'fikus',
        difficulty: 5,
        imageSrc:
          'https://images.unsplash.com/photo-1615213612138-4d1195b1c0e8',
        lightExposure: 'MUCH_LIGHT',
        soilType: 'UNIVERSAL',
        description:
          'Drzewo doniczkowe o błyszczących liściach. Wymaga regularnej pielęgnacji.',
        wateringInterval: 5,
      },
    });

    await db.plant.create({
      data: {
        name: 'Paproć',
        slug: 'paproc',
        difficulty: 3,
        imageSrc:
          'https://images.unsplash.com/photo-1596438459194-f275f413d6ff',
        lightExposure: 'LOW_LIGHT',
        soilType: 'UNIVERSAL',
        description:
          'Roślina ceniąca zacienione miejsca. Wymaga wysokiej wilgotności powietrza.',
        wateringInterval: 3,
      },
    });

    await db.plant.create({
      data: {
        name: 'Bluszcz',
        slug: 'bluszcz',
        difficulty: 2,
        imageSrc:
          'https://images.unsplash.com/photo-1509423350716-97f9360b4e09',
        lightExposure: 'LOW_LIGHT',
        soilType: 'UNIVERSAL',
        description:
          'Pnącze o dekoracyjnych liściach. Może być uprawiane jako roślina zwisająca.',
        wateringInterval: 5,
      },
    });

    await db.plant.create({
      data: {
        name: 'Storczyk',
        slug: 'storczyk',
        difficulty: 7,
        imageSrc:
          'https://images.unsplash.com/photo-1524598961171-371f5ed62bd3',
        lightExposure: 'MEDIUM_LIGHT',
        soilType: 'ORCHID',
        description:
          'Elegancka roślina o przepięknych kwiatach. Wymaga specjalnej pielęgnacji i odpowiedniego podłoża dla storczyków.',
        wateringInterval: 7,
      },
    });

    await db.plant.create({
      data: {
        name: 'Zamiokulkas',
        slug: 'zamiokulkas',
        difficulty: 1,
        imageSrc:
          'https://images.unsplash.com/photo-1632207691143-0d50b9d84fed',
        lightExposure: 'LOW_LIGHT',
        soilType: 'UNIVERSAL',
        description:
          'Wyjątkowo wytrzymała roślina o błyszczących, ciemnozielonych liściach. Idealna dla zapominalskich, znosi długie okresy suszy.',
        wateringInterval: 14,
      },
    });

    await db.plant.create({
      data: {
        name: 'Skrzydłokwiat',
        slug: 'skrzydlokwiat',
        difficulty: 3,
        imageSrc:
          'https://images.unsplash.com/photo-1597305526414-f2476901083d',
        lightExposure: 'LOW_LIGHT',
        soilType: 'UNIVERSAL',
        description:
          'Popularna roślina o charakterystycznych białych kwiatach. Świetnie oczyszcza powietrze, lubi zraszanie.',
        wateringInterval: 4,
      },
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
