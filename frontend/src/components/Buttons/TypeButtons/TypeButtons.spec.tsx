import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import TypeButtons from "./TypeButtons";
import typeButtonData from "../../../data/type-data";

const props = {
  selectType: jest.fn(),
};

it("renders buttons for the types", () => {
  const { getByText, queryByText } = render(<TypeButtons {...props} />);
  typeButtonData.forEach((data) => {
    getByText(data.displayText);
  });
  expect(queryByText("Firee")).not.toBeInTheDocument();
});
