import { City } from "../models/city";
import { CityListItem } from "./city-list-item";

import { v4 as uuidv4 } from 'uuid';


class CityListProps {
    cities: City[] = [];
}

export function CityList(props: CityListProps) {
    let cities: City[] = props.cities;

    let cityItemsHTML: JSX.Element[] = cities.map((city: City) => {
        return (
            <CityListItem key={uuidv4()} city={city}></CityListItem>
        )
    })

    return (
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
    );
}