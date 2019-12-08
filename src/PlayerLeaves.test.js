import React, { useState } from 'react';
import PlayerLeaves from './PlayerLeaves';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

it('renders 4 leaves by default', () => {
  const { container } = render(
    <PlayerLeaves/>
  );

  expect(container.querySelectorAll('svg').length).toBe(4);
});

it('renders a specified number of leaves', () => {
  const { container } = render(
    <PlayerLeaves leafCount={2}/>
  );

  expect(container.querySelectorAll('svg').length).toBe(2);
});

it('renders empty leaves with color grey by default', () => {
  const { getAllByTestId } = render(
    <PlayerLeaves value={2}/>
  );

  const leaves = getAllByTestId('leaf-is-filled-0');
  for(var i=0; i<leaves.length; ++i) {
    expect(leaves[i]).toHaveAttribute('color', '#bbb');
  }
});

it('renders empty leaves with specified color', () => {
  const { getAllByTestId } = render(
    <PlayerLeaves value={2} emptyColor={'black'}/>
  );

  const leaves = getAllByTestId('leaf-is-filled-0');
  for(var i=0; i<leaves.length; ++i) {
    expect(leaves[i]).toHaveAttribute('color', 'black');
  }
});

it('renders filled leaves with color green by default', () => {
  const { getAllByTestId } = render(
    <PlayerLeaves value={2}/>
  );

  const leaves = getAllByTestId('leaf-is-filled-1');
  for(var i=0; i<leaves.length; ++i) {
    expect(leaves[i]).toHaveAttribute('color', 'green');
  }
});

it('renders filled leaves with specified color', () => {
  const { getAllByTestId } = render(
    <PlayerLeaves value={2} filledColor={'orange'}/>
  );

  const leaves = getAllByTestId('leaf-is-filled-1');
  for(var i=0; i<leaves.length; ++i) {
    expect(leaves[i]).toHaveAttribute('color', 'orange');
  }
});

it('renders a leaf using the 1x size by default', () => {
  const { container } = render(
    <PlayerLeaves/>
  );

  const leaves = container.querySelectorAll('svg');
  for(var i=0; i<leaves.length; i++) {
    expect(leaves[i]).toHaveClass('fa-1x');
  }
});

it('renders a leaf using the 1x size value', () => {
  const { container } = render(
    <PlayerLeaves size="3x"/>
  );

  const leaves = container.querySelectorAll('svg');
  for(var i=0; i<leaves.length; i++) {
    expect(leaves[i]).toHaveClass('fa-3x');
  }
});

it('renders 0 filled leaves with value is 0', () => {
  const { getAllByTestId, queryByTestId } = render(
    <PlayerLeaves value={0} leafCount={3}/>
  );

  expect(getAllByTestId('leaf-is-filled-0').length).toBe(3);
  expect(queryByTestId('leaf-is-filled-1')).toBeFalsy();
});

it('renders filled leaves equal to value specified', () => {
  const { getAllByTestId } = render(
    <PlayerLeaves value={2} leafCount={3}/>
  );

  expect(getAllByTestId('leaf-is-filled-0').length).toBe(1);
  expect(getAllByTestId('leaf-is-filled-1').length).toBe(2);
});

it('updates when clicking on an empty leaf', () => {
  const onClickHandler = jest.fn();

  const { getByTestId } = render(
    <PlayerLeaves value={2} onClick={onClickHandler}/>
  );

  fireEvent.click(getByTestId('leaf-3'));

  expect(onClickHandler).toHaveBeenCalledTimes(1);
  expect(onClickHandler).toHaveBeenCalledWith(3);
});

it('does not update when clicking is disabled', () => {
  const onClickHandler = jest.fn();

  const { getByTestId } = render(
    <PlayerLeaves value={2} clickable={false} onClick={onClickHandler}/>
  );

  fireEvent.click(getByTestId('leaf-3'));

  expect(onClickHandler).toHaveBeenCalledTimes(0);
});
