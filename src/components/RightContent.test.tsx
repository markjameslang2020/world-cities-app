import React from 'react';
import { render, screen } from '@testing-library/react';
import { RightContent } from './RightContent';

test('test right content has text', () => {
  render(<RightContent />);

  expect(screen.getByText('On the left side you will see a list of all the country data')).toBeTruthy();
  expect(screen.getByText('This is some other dummy content which could be changed')).toBeTruthy();
});