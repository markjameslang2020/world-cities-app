
import React from 'react';
import { act, fireEvent, render, screen, within,renderHook, waitFor } from '@testing-library/react';
import { CityListItem } from './city-list-item';
import { City } from '../models/city';


test('test rows are present within output for city list item', async() => {
    let testData: City = {"country": "Andorra", "geonameid": 3040051, "name": "les Escaldes", "subcountry": "Escaldes-Engordany"};

    // add table and tobody to wrap item trs
    render(<table><tbody><CityListItem city={testData} /></tbody></table>);

    let columnElements: HTMLCollection = document.getElementsByTagName('td');

    let columnsData: string[] = [];
    for (var i = 0; i < columnElements.length; i++) {
        let columnElement: Element = columnElements[i];
        columnsData.push(columnElement.innerHTML);
    }

    expect(columnsData).toStrictEqual([testData.country, String(testData.geonameid), testData.name, testData.subcountry]);

})