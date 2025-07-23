
import { Suspense } from "react";
import { getBookedDatesByCabinId, getSettings } from "../_lib/data-service";
import DateSelector from "./DateSelector";
import ReservationForm from "./ReservationForm";
import Spinner from "./Spinner";

async function Reservations({ cabin }) {
  const [settings, bookedDates] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(cabin.id),
  ]);


  return (
    <div className="grid grid-cols-2 border border-primary-800 min-h-[400px]">
      <DateSelector
        settings={settings}
        bookedDates={bookedDates}
        cabin={cabin}
      />
        <Suspense fallback={<Spinner />}>
             <ReservationForm cabin={cabin}  />
        </Suspense>
       
      
    </div>
  );
}

export default Reservations;
