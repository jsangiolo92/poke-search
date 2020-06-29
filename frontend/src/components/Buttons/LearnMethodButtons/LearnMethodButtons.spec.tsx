import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import LearnMethodButtons from "./LearnMethodButtons";
import { learnMethodButtonData } from "../../../data/learn-method-data";

const props = {
  selectLearnMethod: jest.fn(),
};

it("renders the learn method buttons", () => {
  const { getByText, queryByText } = render(<LearnMethodButtons {...props} />);
  learnMethodButtonData.forEach((data) => {
    getByText(data.displayText);
  });
  expect(queryByText("breeding")).not.toBeInTheDocument();
});
