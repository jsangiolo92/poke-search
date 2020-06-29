import React from "react";
import { render } from "@testing-library/react";
import MoveLabel from "./MoveLabel";

const props = {
  moveName: "pound",
  formatName: jest.fn(),
};

it("calls formatName with the move name from props", () => {
  render(<MoveLabel {...props} />);
  expect(props.formatName).toBeCalledTimes(1);
  expect(props.formatName).toBeCalledWith(props.moveName);
});
