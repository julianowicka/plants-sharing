
  
  export default function PlantPage({ params }: { params: { slug: string } }) {


    const rating  = 4.5;
    const nazwa = params.slug;
    const opis = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed";
    const image = "https://kurowski.pl//images/katalog/1100_900/374_big.jpg";

    return (
      <div>
        <h1>Roślina: {nazwa}</h1>
        <img src={image} alt={nazwa} className="w-full h-48 object-cover" />
        <div className="flex items-center">Rating: {rating}</div>
        <p>{opis}</p>
      </div>
    )
  }
  

