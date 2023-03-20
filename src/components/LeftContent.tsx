import { useState, useEffect, useMemo } from "react";
import { City } from "../models/city";
import { CityList } from "./CityList";

export class LeftContentProps {
    amount: number = 10;
}
export function LeftContent(props: LeftContentProps) {
    const dataUrl: string = 'https://datahub.io/core/world-cities/r/world-cities.json';

    const [cities, setCities] = useState<City[]>([]);
    const [paginatedCities, setPaginatedCities] = useState<City[]>([]);
    const [nextPage, setNextPage] = useState<number>(1);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    let amount: number = props.amount;

    // load inital cities results
    useEffect(() => {
        loadCityResults()
    }, []);

    const maxPages = useMemo(() => {
        return Math.ceil(cities.length / amount);
      }, [cities, amount]);
    

    function loadCityResults(): void {
        setIsLoading(true);
        fetch(dataUrl, {redirect: "follow"})
        .catch((e) => {
            alert('Error data could not be loaded');
        })
        .then((response: any) => response.json())
        .then((response: any) => {
            setCities(response as City[]);
            // load the inital first page
            setNextPage(1);
            loadNextPage(response as City[], nextPage, amount);
            setNextPage(prevState => prevState + 1);
            setIsLoading(false);
        })
    }

    function handleLoadMore(): void {
        loadNextPage(cities, nextPage, amount);
        setNextPage(prevState => prevState + 1);
    }

    function loadNextPage(results: City[], nextPage:number=1, amount: number=10): void {
        setIsLoading(true);
        let paginatedResults: City[] = getResultsByPage(results, nextPage, amount);
        setPaginatedCities(prevState => [...prevState, ...paginatedResults]);
        setIsLoading(false);
    }


    function getResultsByPage(results:City[], page: number=1, amount: number=10): City[] {
        let startOffset: number = (page - 1) * amount;
        let endOffset: number = page * amount;
        return results.slice(startOffset, endOffset);
    }

    return (
        <>
        <CityList cities={paginatedCities}></CityList>
        {(nextPage - 1) !== maxPages && <button className='btn btn-primary' disabled={isLoading} onClick={handleLoadMore}>
            Load More
        </button>}
        </>
    )
} 