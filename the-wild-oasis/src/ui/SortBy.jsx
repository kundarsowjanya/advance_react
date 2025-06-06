import { useSearchParams } from "react-router-dom";
import Select from "./Select"

function SortBy({options}) {

    const [searchParams, setSearchParams] = useSearchParams()
    const sortBy = searchParams.get("sortBy") || "name-asc";

    function handleChange(event) {
        const value = event.target.value;
        searchParams.set("sortBy", value);
        setSearchParams(searchParams);
    }

    return (
        <div>
            <Select options={options} type="white" onChange={handleChange} value={sortBy}/>
        </div>
    )
}

export default SortBy
