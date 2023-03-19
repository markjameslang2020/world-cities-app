import { useState, useEffect } from "react";
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

    function loadCityResults() {
        setIsLoading(true);
        fetch(dataUrl, {redirect: "follow"})
        .then((response) => response.json())
        .then((response: any) => {
            setCities(response as City[]);
            setIsLoading(false);
        })
    }

    function getResultsByPage(results:City[], page: number=1, amount: number=10): City[] {
        return results.slice(((page - 1) * amount), ((page) * amount));
    }

    function loadPage(page:number=1): void {
        setIsLoading(true);
        let paginatedResults: City[] = getResultsByPage(cities, page, amount);
        setPaginatedCities(prevState => [...prevState, ...paginatedResults]);
        setIsLoading(false);

        //set load more visible to false it exceed max pages
        if(page === getMaxPages()) {
            setIsLoadMoreVisible(false);
        } 
    }

    function handleLoadMore(): void {
        setPage(prevState => prevState + 1);
        loadPage(page);
    }

    function getMaxPages(): number {
        return Math.ceil(cities.length / amount);
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