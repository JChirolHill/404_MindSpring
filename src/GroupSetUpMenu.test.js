import React from "react";
import GroupSetUpMenu from "./GroupSetUpMenu";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

it('shows error messages when try to submit empty group code', () => {
  const { getByTestId, getByText } = render(
    <GroupSetUpMenu/>
  );

  fireEvent.click(getByTestId('btn-join'));

  expect(getByText('Should be a 4 digit number')).toBeTruthy();
});

it('shows error when not numeric group code', () => {
  const { getByTestId, getByText } = render(
    <GroupSetUpMenu/>
  );

  const input = getByTestId('input-group-code');
  fireEvent.change(input, {
    target: {
      value: 'abc'
    }
  });

  fireEvent.keyUp(input, {
    keyCode: 13
  });
  fireEvent.click(getByTestId('btn-join'));

  expect(getByText('Should be a 4 digit number')).toBeTruthy();
});

it('removes error message when put invalid then valid group code', () => {
  const { getByTestId, getByText, queryByText } = render(
    <GroupSetUpMenu/>
  );

  const input = getByTestId('input-group-code');
  fireEvent.change(input, {
    target: {
      value: 'abc'
    }
  });

  fireEvent.keyUp(input, {
    keyCode: 13
  });
  fireEvent.click(getByTestId('btn-join'));

  expect(getByText('Should be a 4 digit number')).toBeTruthy();

  fireEvent.change(input, {
    target: {
      value: '1234'
    }
  });

  fireEvent.keyUp(input, {
    keyCode: 13
  });
  fireEvent.click(getByTestId('btn-join'));

  expect(queryByText('Should be a 4 digit number')).toBeFalsy();
});

it('shows error messages when try to submit empty username', () => {
  const { getByTestId, getByText } = render(
    <GroupSetUpMenu/>
  );

  fireEvent.click(getByTestId('btn-join'));

  expect(getByText('Only alphanumeric characters, max length 24')).toBeTruthy();
});

it('shows error when not alphanumeric username', () => {
  const { getByTestId, getByText } = render(
    <GroupSetUpMenu/>
  );

  const input = getByTestId('input-username');
  fireEvent.change(input, {
    target: {
      value: 'abc123*&*()'
    }
  });

  fireEvent.keyUp(input, {
    keyCode: 13
  });
  fireEvent.click(getByTestId('btn-join'));

  expect(getByText('Only alphanumeric characters, max length 24')).toBeTruthy();
});

it('removes error message when put invalid then valid username', () => {
  const { getByTestId, getByText, queryByText } = render(
    <GroupSetUpMenu/>
  );

  const input = getByTestId('input-username');
  fireEvent.change(input, {
    target: {
      value: 'abc123*&*()'
    }
  });

  fireEvent.keyUp(input, {
    keyCode: 13
  });
  fireEvent.click(getByTestId('btn-join'));

  expect(getByText('Only alphanumeric characters, max length 24')).toBeTruthy();

  fireEvent.change(input, {
    target: {
      value: 'abc'
    }
  });

  fireEvent.keyUp(input, {
    keyCode: 13
  });
  fireEvent.click(getByTestId('btn-join'));

  expect(queryByText('Only alphanumeric characters, max length 24')).toBeFalsy();
});
