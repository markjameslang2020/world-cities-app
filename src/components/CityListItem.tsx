import { City } from "../models/city";


export class CityListItemProps {
    city: City = new City();
}

export function CityListItem(props: CityListItemProps) {
    let city: City = props.city;
    return (
    <tr key={city.geonameid}>
        <td>{ city.country }</td>
        <td>{ city.geonameid }</td>
        <td>{ city.name }</td>
        <td>{ city.subcountry }</td>
    </tr>
    )
}