import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import VersionButtons from "./VersionButtons";
import { verionButtonData } from "../../../data/version-data";

const props = {
  selectVersion: jest.fn(),
};

it("renders buttons for the versions", () => {
  const { getByText, queryByText } = render(<VersionButtons {...props} />);
  verionButtonData.forEach((data) => {
    getByText(data.displayText);
  });
  expect(queryByText("Leaf Red")).not.toBeInTheDocument();
});
