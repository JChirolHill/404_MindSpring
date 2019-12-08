import React from "react";
import ErrorMsg from "./ErrorMsg";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

it('renders empty error by default', () => {
  const { container } = render(
    <ErrorMsg/>
  );

  expect(container.querySelector('small')).toBeEmpty();
});

it('renders specified error message', () => {
  const { container, getByText } = render(
    <ErrorMsg error={'My custom error.'}/>
  );

  expect(container.querySelector('small')).not.toBeEmpty();
  expect(getByText('My custom error.')).toBeTruthy();
});
