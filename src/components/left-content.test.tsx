import React from 'react';
import { act, fireEvent, render, screen, within,renderHook, waitFor } from '@testing-library/react';
import { LeftContent, LeftContentProps } from './left-content';

import * as fetch from 'jest-fetch-mock';

beforeEach(() => {
    global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve([{"country": "Andorra", "geonameid": 3040051, "name": "les Escaldes", "subcountry": "Escaldes-Engordany"}, {"country": "test2", "geonameid": 1234, "name": "Test country", "subcountry": "test country"}]),
    }),
  ) as jest.Mock;
  })

test('renders load more button', async () => {
    await act(async () => {
        render(<LeftContent amount={1}/>);
    });

    expect(screen.getByText('Load More')).toBeInTheDocument();
});


test('test load more button works', async () => {

    await act(async () => {
        render(<LeftContent amount={1}/>);
    });

    expect(document.querySelectorAll('tbody tr').length).toBe(1);

    fireEvent.click(screen.getByText(/Load More/i));

    expect(document.querySelectorAll('tbody tr').length).toBe(2);


});