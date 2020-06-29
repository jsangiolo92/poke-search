import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import FilterButton from "./FilterButton";

const props = {
  displayText: "button text",
  value: "button-value",
  clickHandler: jest.fn(),
};

it("renders the text from props", () => {
  const { getByText } = render(<FilterButton {...props} />);
  getByText("button text");
});

it("calls the clickHandler function w/ the displayText and value when clicked", () => {
  const { getByText } = render(<FilterButton {...props} />);
  const button = getByText("button text");

  fireEvent.click(button, { button: 1 });
  expect(props.clickHandler).toBeCalledTimes(1);
  expect(props.clickHandler).toBeCalledWith(props.value, props.displayText);
});
