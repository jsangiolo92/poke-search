import React from "react";
import { render } from "@testing-library/react";
import DetailsHeader from "./DetailsHeader";

const props = {
  id: 1,
  name: "bulbasaur",
  types: ["grass", "poison"],
  formatName: jest.fn(),
};

it("renders the data from props", () => {
  const { getByText } = render(<DetailsHeader {...props} />);
  getByText("Number 1");
});

it("calls the format name prop with the name prop", () => {
  expect(props.formatName).toBeCalledTimes(1);
  expect(props.formatName).toBeCalledWith(props.name);
});
