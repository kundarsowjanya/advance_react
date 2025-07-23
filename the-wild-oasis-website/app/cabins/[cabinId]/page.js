import Cabin from "@/app/_components/Cabin";
import Reservations from "@/app/_components/Reservations";
import { getCabin, getCabins } from "@/app/_lib/data-service";

// export const metadata = {
//   title: "Cabin",
// };

export async function generateMetadata({ params }) {
  const { name } = await getCabin(params.cabinId);
  return { title: `Cabin ${name}` };
}

export async function generateStaticParams() {
  const cabins = await getCabins();

  const ids = cabins.map((cabin) => ({ cabinId: String(cabin.id) }));

  return ids;
}

export default async function Page({ params }) {
  const cabin = await getCabin(params.cabinId);



  return (
    <div className="max-w-6xl mx-auto mt-8">
      <Cabin cabin={cabin}/>

      <div>
        <h2 className="text-5xl font-semibold text-center">
          Reserve today. Pay on arrival.
        </h2>
      <Reservations cabin={cabin}/>
      </div>
    </div>
  );
}
