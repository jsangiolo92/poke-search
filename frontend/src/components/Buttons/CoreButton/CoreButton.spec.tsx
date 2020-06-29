import React from "react";
import CoreButton from "./CoreButton";
import { render, fireEvent } from "@testing-library/react";

const props = {
  handleClick: jest.fn(),
  text: "Button Text",
  disabled: false,
  color: "primary",
  variant: "contained",
  styles: {},
};

afterEach(() => {
  jest.resetAllMocks();
});

it("renders a button with text from props", () => {
  const { getByText } = render(<CoreButton {...props} />);
  getByText("Button Text");
});

it("runs the handleClick method when clicked", () => {
  const { getByText } = render(<CoreButton {...props} />);
  expect(props.handleClick).toBeCalledTimes(0);

  const button = getByText("Button Text");

  fireEvent.click(button, { button: 1 });
  expect(props.handleClick).toBeCalledTimes(1);
});

it("only registers a click when the button is enabled", () => {
  const p = { ...props, disabled: true };
  const { getByText } = render(<CoreButton {...p} />);
  const button = getByText("Button Text");

  fireEvent.click(button, { button: 1 });
  expect(props.handleClick).toBeCalledTimes(0);
});
