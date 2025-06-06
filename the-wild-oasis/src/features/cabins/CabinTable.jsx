

import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";

function CabinTable() {
  const { isLoading, cabins } = useCabins();
  const [searchParams]=useSearchParams()

  if (isLoading) return <Spinner />;

  const filterValue=searchParams.get('discount') || 'all'

  let filterCabins
  //1. Filter cabins based on the discount value
  if (filterValue==='all'){
      filterCabins=cabins
  }
  if (filterValue==='no-discount'){
      filterCabins=cabins.filter(cabin=>cabin.discount===0)
  }
  if (filterValue==='with-discount'){ 
     filterCabins=cabins.filter(cabin=>cabin.discount>0)
  }

  //2.SortBy
  const sortBy=searchParams.get('sortBy') || 'name-asc'
  if (sortBy === "name-asc") {
    filterCabins = filterCabins.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === "name-desc") {
    filterCabins = filterCabins.sort((a, b) => b.name.localeCompare(a.name));
  } else if (sortBy === "regularPrice-asc") {
    filterCabins = filterCabins.sort((a, b) => a.regularPrice - b.regularPrice);
  } else if (sortBy === "regularPrice-desc") {
    filterCabins = filterCabins.sort((a, b) => b.regularPrice - a.regularPrice);
  } else if (sortBy === "maxCapacity-asc") {
    filterCabins = filterCabins.sort((a, b) => a.maxCapacity - b.maxCapacity);
  } else if (sortBy === "maxCapacity-desc") {
    filterCabins = filterCabins.sort((a, b) => b.maxCapacity - a.maxCapacity);
  }
  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={filterCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
