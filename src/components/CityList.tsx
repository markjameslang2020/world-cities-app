import { City } from "../models/city";
import { CityListItem } from "./CityListItem";


class CityListProps {
    cities: City[] = [];
}

export function CityList(props: CityListProps) {
    let cities: City[] = props.cities;

    let cityItemsHTML: JSX.Element[] = cities.map((city: City) => {
        return (
            <CityListItem key={city.geonameid} city={city} />
        )
    })

    return (
        <>
        {cities.length > 0 ? 
        <table className='table table-striped table-bordered'>
            <thead className='thead-dark'>
                <tr>
                    <th>Country</th>
                    <th>Geoname ID</th>
                    <th>Name</th>
                    <th>Subcountry</th>
                </tr>
            </thead>
            <tbody>
                {cityItemsHTML}
            </tbody>
        </table>
        : <p>No results could be found</p>}
        </>
    );
}