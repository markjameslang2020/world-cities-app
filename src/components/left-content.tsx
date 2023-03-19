import { useState, useEffect, useMemo } from "react";
import { City } from "../models/city";
import { CityList } from "./city-list";

export class LeftContentProps {
    amount: number = 10;
}
export function LeftContent(props: LeftContentProps) {
    const dataUrl: string = 'https://datahub.io/core/world-cities/r/world-cities.json';

    const [cities, setCities] = useState<City[]>([]);
    const [paginatedCities, setPaginatedCities] = useState<City[]>([]);
    const [page, setPage] = useState<number>(1);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isLoadMoreVisible, setIsLoadMoreVisible] = useState<boolean>(true);

    let amount: number = props.amount;
    let maxPages: number = 0;

    // load inital cities results
    useEffect(() => {
        loadCityResults();
    }, [])

    // set back to first page when cities is updated
    useEffect(() => {
        setPage(1);
        loadPage(page);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cities]) 


    //cache total pages
    useMemo(() => {
        maxPages =  Math.ceil(cities.length / amount);
    }, [cities]);

    function loadCityResults(): void {
        setIsLoading(true);
        fetch(dataUrl, {redirect: "follow"})
        .catch((e) => {
            alert('Error data could not be loaded');
        })
        .then((response: any) => response.json())
        .then((response: any) => {
            setCities(response as City[]);
            setIsLoading(false);
        })
    }

    function getResultsByPage(results:City[], page: number=1, amount: number=10): City[] {
        let startOffset: number = (page - 1) * amount;
        let endOffset: number = page * amount;
        return results.slice(startOffset, endOffset);
    }

    function loadPage(page:number=1): void {
        setIsLoading(true);
        let paginatedResults: City[] = getResultsByPage(cities, page, amount);
        setPaginatedCities(prevState => [...prevState, ...paginatedResults]);
        setIsLoading(false);

        //set load more visible to false it exceeds max pages
        if(page === maxPages) {
            setIsLoadMoreVisible(false);
        }
    }

    function handleLoadMore(): void {
        setPage(prevState => prevState + 1);
        loadPage(page);
    }

    return (
        <>
        <CityList cities={paginatedCities}></CityList>
        {isLoadMoreVisible && <button className='btn btn-primary' disabled={isLoading} onClick={handleLoadMore}>
            Load More
        </button>}
        </>
    )
}