import { City } from "../models/city";

import { v4 as uuidv4 } from 'uuid';

export class CityListItemProps {
    city: City = new City();
}

export function CityListItem(props: CityListItemProps) {
    let city: City = props.city;
    return (
    <tr key={uuidv4()}>
        <td>{ city.country }</td>
        <td>{ city.geonameid }</td>
        <td>{ city.name }</td>
        <td>{ city.subcountry }</td>
    </tr>
    )
}