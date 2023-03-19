
import React from 'react';
import { act, fireEvent, render, screen, within,renderHook, waitFor } from '@testing-library/react';
import { CityList } from './city-list';


test('test headers are present', async() => {
    let testData = [{"country": "Andorra", "geonameid": 3040051, "name": "les Escaldes", "subcountry": "Escaldes-Engordany"}, {"country": "test2", "geonameid": 1234, "name": "Test country", "subcountry": "test country"}];

    render(<CityList cities={testData} />);

    let headerRow: HTMLElement = screen.getAllByRole('row')[0];

    let headersList: string[] = [];
    for (var i = 0; i < headerRow.children.length; i++) {
        let headerColumn: Element = headerRow.children[i];
        headersList.push(headerColumn.innerHTML);
    }

    expect(headersList).toStrictEqual(['Country', 'Geoname ID', 'Name', 'Subcountry']);

})

test('test correct amount of rows are present', async () => {
    let testData = [{"country": "Andorra", "geonameid": 3040051, "name": "les Escaldes", "subcountry": "Escaldes-Engordany"}, {"country": "test2", "geonameid": 1234, "name": "Test country", "subcountry": "test country"}];

    render(<CityList cities={testData} />);

    expect(document.querySelectorAll('tbody tr').length).toBe(2);
});