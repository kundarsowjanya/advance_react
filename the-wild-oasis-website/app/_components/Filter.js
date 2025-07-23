"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

function Filter() {

    const searchParams=  useSearchParams();
    const router=useRouter()
    const pathname=usePathname()

    function handleFilter(filter){debugger
       const params = new URLSearchParams(searchParams)
       params.set("capacity",filter)
       router.replace(`${pathname}?${params.toString()}`,{scroll: false});

    }
    return (
        <div className="border border-primary-800 flex">
             <button className="px-5 py-2 hover:bg-primary-700" onClick={()=>handleFilter("all")}>All Cabins</button>
              <button className="px-5 py-2 hover:bg-primary-700" onClick={()=>handleFilter("small")}>1&mdash;3guests</button>
               <button className="px-5 py-2 hover:bg-primary-700" onClick={()=>handleFilter("medium")}>4&mdash;7guests</button>
                <button className="px-5 py-2 hover:bg-primary-700" onClick={()=>handleFilter("large")}>8&mdash;12guests</button>
        </div>
    )
}

export default Filter
